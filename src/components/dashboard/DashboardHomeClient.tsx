"use client";

import { useMemo, useState } from "react";
import type { StandbyInfo, Task, TaskStatus } from "../../types/task";
import { tasks as mockTasks } from "../../data/mockDashboard";
import ActiveTaskCard from "./ActiveTaskCard";
import AiCard from "./AiCard";
import EndDayModal from "./EndDayModal";
import HeaderHero from "./HeaderHero";
import Sidebar from "./Sidebar";
import StandbyModal from "./StandbyModal";
import SummaryCards from "./SummaryCards";
import TasksList from "./TasksList";
import TopBar from "./TopBar";

function getTaskAction(status: TaskStatus) {
  if (status === "Da fare") {
    return "Inizia";
  }

  if (status === "In stand-by") {
    return "Riprendi";
  }

  if (status === "In corso") {
    return "Termina";
  }

  if (status === "Completata") {
    return "Completata";
  }

  return "Non disponibile";
}

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

export default function DashboardHomeClient() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [standbyTask, setStandbyTask] = useState<Task | null>(null);
  const [isEndDayOpen, setIsEndDayOpen] = useState(false);
  const [endDayNote, setEndDayNote] = useState("");
  const [isDayClosed, setIsDayClosed] = useState(false);

  const summary = useMemo(() => buildSummary(tasks), [tasks]);
  const activeTask = tasks.find((task) => task.status === "In corso");

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
            action: getTaskAction(nextStatus),
            standbyInfo:
              nextStatus === "In stand-by" ? standbyInfo : undefined,
          };
        }

        if (nextStatus === "In corso" && task.status === "In corso") {
          return {
            ...task,
            status: "Da fare",
            action: getTaskAction("Da fare"),
          };
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
      updateTaskStatus(taskCode, "In corso");
      return;
    }

    if (selectedTask.status === "In corso") {
      updateTaskStatus(taskCode, "Completata");
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
    setStandbyTask(null);
  }

  function handleResumeTomorrow(taskCode: string) {
    updateTaskStatus(taskCode, "Da fare");
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061521] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(1,102,164,0.42),_transparent_32%),radial-gradient(circle_at_85%_20%,_rgba(151,184,34,0.22),_transparent_28%),radial-gradient(circle_at_50%_100%,_rgba(1,102,164,0.22),_transparent_35%)]" />
      <div className="absolute left-[-160px] top-[-120px] h-[430px] w-[430px] rounded-full bg-[#0166A4]/30 blur-3xl" />
      <div className="absolute right-[-160px] top-[120px] h-[360px] w-[360px] rounded-full bg-[#97B822]/20 blur-3xl" />
      <div className="absolute bottom-[-220px] left-[35%] h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] gap-6 p-6">
        <Sidebar />

        <section className="flex-1 space-y-6">
          <TopBar />
          <HeaderHero
            isDayClosed={isDayClosed}
            onEndDay={() => setIsEndDayOpen(true)}
          />
          <SummaryCards summary={summary} />

          <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <ActiveTaskCard
              task={activeTask}
              onComplete={handleTaskAction}
              onStandby={handleStandbyRequest}
            />
            <AiCard />
          </section>

          <TasksList tasks={tasks} onTaskAction={handleTaskAction} />
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
    </main>
  );
}
