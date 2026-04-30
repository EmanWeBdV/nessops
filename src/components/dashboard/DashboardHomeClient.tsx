"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  ActivityMessage,
  StandbyInfo,
  Task,
  TaskAssignee,
  TaskStatus,
} from "../../types/task";
import {
  activityMessages as mockActivityMessages,
  mockCurrentUser,
  mockYesterdaySummary,
  tasks as mockTasks,
} from "../../data/mockDashboard";
import ActiveTaskCard from "./ActiveTaskCard";
import AiCard from "./AiCard";
import EndDayModal from "./EndDayModal";
import HeaderHero from "./HeaderHero";
import Sidebar from "./Sidebar";
import StandbyModal from "./StandbyModal";
import SummaryCards from "./SummaryCards";
import TaskDetailsModal from "./TaskDetailsModal";
import TasksList from "./TasksList";
import TopBar from "./TopBar";

function parseDuration(value = "0h 00m") {
  const hours = value.match(/(\d+)h/)?.[1] ?? "0";
  const minutes = value.match(/(\d+)m/)?.[1] ?? "0";

  return Number(hours) * 60 + Number(minutes);
}

function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

function buildSummary(tasks: Task[]) {
  const inProgress = tasks.filter((task) => task.status === "In corso").length;
  const standby = tasks.filter((task) => task.status === "In stand-by").length;
  const completed = tasks.filter((task) => task.status === "Completata").length;
  const open = tasks.filter(
    (task) => task.status === "Da fare" || task.status === "Bloccata",
  ).length;
  const workMinutes = tasks.reduce(
    (total, task) => total + parseDuration(task.workTime),
    0,
  );
  const standbyMinutes = tasks.reduce(
    (total, task) => total + parseDuration(task.standbyTime),
    0,
  );
  const blockedMinutes = tasks.reduce(
    (total, task) => total + parseDuration(task.blockedTime),
    0,
  );

  return {
    assigned: tasks.length,
    inProgress,
    standby,
    completed,
    open,
    workTime: formatDuration(workMinutes),
    standbyTime: formatDuration(standbyMinutes),
    blockedTime: formatDuration(blockedMinutes),
  };
}

function createActivityEvent(taskCode: string, body: string): ActivityMessage {
  return {
    id: `MSG-${Date.now()}`,
    taskCode,
    author: "NessOps",
    role: "Sistema",
    body,
    createdAt: new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()),
    kind: "event",
  };
}

function getMentionableUsers(tasks: Task[]) {
  const users = new Map<string, TaskAssignee>();

  tasks.forEach((task) => {
    task.assignees.forEach((assignee) => users.set(assignee.id, assignee));
    task.checklist.forEach((item) => {
      item.assignees.forEach((assignee) => users.set(assignee.id, assignee));
    });
  });

  return Array.from(users.values()).sort((first, second) =>
    first.name.localeCompare(second.name),
  );
}

export default function DashboardHomeClient() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activityMessages, setActivityMessages] =
    useState<ActivityMessage[]>(mockActivityMessages);
  const [standbyTask, setStandbyTask] = useState<Task | null>(null);
  const [detailsTaskCode, setDetailsTaskCode] = useState<string | null>(null);
  const [isEndDayOpen, setIsEndDayOpen] = useState(false);
  const [endDayNote, setEndDayNote] = useState("");
  const [isDayClosed, setIsDayClosed] = useState(false);
  const [activeTaskStartedAt, setActiveTaskStartedAt] = useState<number | null>(null);
  const [liveElapsed, setLiveElapsed] = useState(0);
  const [toast, setToast] = useState<{ message: string; kind: "success" | "info" } | null>(null);

  const summary = useMemo(() => buildSummary(tasks), [tasks]);
  const mentionableUsers = useMemo(() => getMentionableUsers(tasks), [tasks]);
  const activeTask = tasks.find((task) => task.status === "In corso");
  const detailsTask = detailsTaskCode
    ? tasks.find((task) => task.code === detailsTaskCode)
    : undefined;
  const detailsTaskMessages = detailsTask
    ? activityMessages.filter((message) => message.taskCode === detailsTask.code)
    : [];

  const liveWorkTime = useMemo(() => {
    if (!activeTask) return undefined;
    const storedMinutes = parseDuration(activeTask.workTime ?? "0h 00m");
    return formatDuration(storedMinutes + Math.floor(liveElapsed / 60));
  }, [activeTask, liveElapsed]);

  useEffect(() => {
    if (activeTask?.code) {
      setActiveTaskStartedAt(Date.now());
      setLiveElapsed(0);
    } else {
      setActiveTaskStartedAt(null);
      setLiveElapsed(0);
    }
  }, [activeTask?.code]);

  useEffect(() => {
    if (!activeTaskStartedAt) return;
    const id = setInterval(() => {
      setLiveElapsed(Math.floor((Date.now() - activeTaskStartedAt) / 1_000));
    }, 1_000);
    return () => clearInterval(id);
  }, [activeTaskStartedAt]);

  function showToast(message: string, kind: "success" | "info" = "info") {
    setToast({ message, kind });
    setTimeout(() => setToast(null), 3_000);
  }

  function updateTaskStatus(
    taskCode: string,
    nextStatus: TaskStatus,
    standbyInfo?: StandbyInfo,
  ) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.code === taskCode) {
          return {
            ...task,
            status: nextStatus,
            standbyInfo:
              nextStatus === "In stand-by" ? standbyInfo : undefined,
          };
        }

        if (nextStatus === "In corso" && task.status === "In corso") {
          return { ...task, status: "Da fare" };
        }

        return task;
      }),
    );
  }

  function handleTaskAction(taskCode: string) {
    const selectedTask = tasks.find((task) => task.code === taskCode);

    if (
      !selectedTask ||
      selectedTask.status === "Completata" ||
      selectedTask.status === "Annullata" ||
      selectedTask.status === "Bloccata"
    ) {
      return;
    }

    if (
      selectedTask.status === "Da fare" ||
      selectedTask.status === "In stand-by"
    ) {
      const isResume = selectedTask.status === "In stand-by";
      updateTaskStatus(taskCode, "In corso");
      setActivityMessages((currentMessages) => [
        ...currentMessages,
        createActivityEvent(
          taskCode,
          isResume ? "Attività ripresa dallo stand-by." : "Attività avviata.",
        ),
      ]);
      showToast(isResume ? "Attività ripresa." : "Attività avviata.");
      return;
    }

    if (selectedTask.status === "In corso") {
      updateTaskStatus(taskCode, "Completata");
      setActivityMessages((currentMessages) => [
        ...currentMessages,
        createActivityEvent(taskCode, "Attività completata."),
      ]);
      showToast("Attività completata!", "success");
    }
  }

  function handleStandbyRequest(taskCode: string) {
    const selectedTask = tasks.find((task) => task.code === taskCode);

    if (selectedTask) {
      setStandbyTask(selectedTask);
    }
  }

  function handleStandbyConfirm(standbyInfo: StandbyInfo) {
    if (!standbyTask) {
      return;
    }

    updateTaskStatus(standbyTask.code, "In stand-by", standbyInfo);
    setActivityMessages((currentMessages) => [
      ...currentMessages,
      createActivityEvent(
        standbyTask.code,
        `Attività messa in stand-by: ${standbyInfo.reason}.`,
      ),
    ]);
    showToast("Attività in stand-by.");
    setStandbyTask(null);
  }

  function handleResumeTomorrow(taskCode: string) {
    updateTaskStatus(taskCode, "Da fare");
    setActivityMessages((currentMessages) => [
      ...currentMessages,
      createActivityEvent(taskCode, "Attività lasciata da riprendere domani."),
    ]);
  }

  function handleEndDayStandby(taskCode: string) {
    const selectedTask = tasks.find((task) => task.code === taskCode);

    if (selectedTask) {
      setIsEndDayOpen(false);
      setStandbyTask(selectedTask);
    }
  }

  function handleCloseDay() {
    setIsDayClosed(true);
    setIsEndDayOpen(false);
  }

  function handleToggleChecklistItem(taskCode: string, checklistItemId: string) {
    const selectedTask = tasks.find((task) => task.code === taskCode);
    const selectedItem = selectedTask?.checklist.find(
      (item) => item.id === checklistItemId,
    );

    if (!selectedItem) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.code !== taskCode) {
          return task;
        }

        return {
          ...task,
          checklist: task.checklist.map((item) =>
            item.id === checklistItemId
              ? { ...item, completed: !item.completed }
              : item,
          ),
        };
      }),
    );

    setActivityMessages((currentMessages) => [
      ...currentMessages,
      createActivityEvent(
        taskCode,
        selectedItem.completed
          ? `Sotto-task riaperta: ${selectedItem.title}.`
          : `Sotto-task completata: ${selectedItem.title}.`,
      ),
    ]);
  }

  function handleSendActivityMessage(
    taskCode: string,
    body: string,
    mentions: TaskAssignee[],
  ) {
    const newMessage: ActivityMessage = {
      id: `MSG-${Date.now()}`,
      taskCode,
      authorId: mockCurrentUser.id,
      author: mockCurrentUser.name,
      role: mockCurrentUser.role,
      body,
      mentions,
      createdAt: new Intl.DateTimeFormat("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
    };

    setActivityMessages((currentMessages) => [...currentMessages, newMessage]);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061521] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(1,102,164,0.22),_transparent_32%),radial-gradient(circle_at_85%_20%,_rgba(151,184,34,0.08),_transparent_28%),radial-gradient(circle_at_50%_100%,_rgba(1,102,164,0.12),_transparent_35%)]" />
      <div className="absolute left-[-160px] top-[-120px] h-[430px] w-[430px] rounded-full bg-[#0166A4]/[0.18] blur-3xl" />
      <div className="absolute bottom-[-220px] left-[35%] h-[420px] w-[420px] rounded-full bg-white/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] gap-6 p-6">
        <Sidebar />

        <section className="flex-1 space-y-8">
          <TopBar />
          <HeaderHero
            isDayClosed={isDayClosed}
            userName={mockCurrentUser.name}
            onEndDay={() => setIsEndDayOpen(true)}
          />
          <SummaryCards summary={summary} yesterday={mockYesterdaySummary} />

          <section className="grid gap-4 xl:grid-cols-[1fr_300px]">
            <ActiveTaskCard
              task={activeTask}
              liveWorkTime={liveWorkTime}
              onComplete={handleTaskAction}
              onOpenDetails={setDetailsTaskCode}
              onStandby={handleStandbyRequest}
            />
            <AiCard />
          </section>

          <TasksList
            tasks={tasks}
            onOpenTaskDetails={setDetailsTaskCode}
            onTaskAction={handleTaskAction}
          />
        </section>
      </div>

      {standbyTask ? (
        <StandbyModal
          task={standbyTask}
          tasks={tasks}
          onClose={() => setStandbyTask(null)}
          onConfirm={handleStandbyConfirm}
        />
      ) : null}

      {detailsTask ? (
        <TaskDetailsModal
          mentionableUsers={mentionableUsers}
          messages={detailsTaskMessages}
          task={detailsTask}
          onClose={() => setDetailsTaskCode(null)}
          onSendMessage={handleSendActivityMessage}
          onToggleChecklistItem={handleToggleChecklistItem}
        />
      ) : null}

      {isEndDayOpen ? (
        <EndDayModal
          activeTask={activeTask}
          endDayNote={endDayNote}
          summary={summary}
          tasks={tasks}
          onClose={() => setIsEndDayOpen(false)}
          onCompleteTask={handleTaskAction}
          onConfirmCloseDay={handleCloseDay}
          onNoteChange={setEndDayNote}
          onResumeTomorrow={handleResumeTomorrow}
          onStandbyTask={handleEndDayStandby}
        />
      ) : null}

      {toast ? (
        <div
          className={`fixed right-6 top-6 z-[60] rounded-2xl border px-5 py-3 text-sm font-bold shadow-2xl backdrop-blur-xl ${
            toast.kind === "success"
              ? "border-[#97B822]/40 bg-[#97B822]/20 text-[#E6F6A8]"
              : "border-white/20 bg-white/[0.15] text-white"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </main>
  );
}
