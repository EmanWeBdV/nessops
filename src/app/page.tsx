"use client";

import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import HeaderHero from "../components/dashboard/HeaderHero";
import SummaryCards from "../components/dashboard/SummaryCards";
import ActiveTaskCard from "../components/dashboard/ActiveTaskCard";
import AiCard from "../components/dashboard/AiCard";
import TasksList from "../components/dashboard/TasksList";
import TopBar from "../components/dashboard/TopBar";
import { tasks as mockTasks } from "../data/mockDashboard";
import type { Task, TaskStatus } from "../types/task";

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

  return "Completata";
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const activeTask = tasks.find((task) => task.status === "In corso");

  function updateTaskStatus(taskCode: string, nextStatus: TaskStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.code === taskCode) {
          return {
            ...task,
            status: nextStatus,
            action: getTaskAction(nextStatus),
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

    if (!selectedTask || selectedTask.status === "Completata") {
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
          <HeaderHero />
          <SummaryCards />

          <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <ActiveTaskCard task={activeTask} onComplete={handleTaskAction} />
            <AiCard />
          </section>

          <TasksList tasks={tasks} onTaskAction={handleTaskAction} />
        </section>
      </div>
    </main>
  );
}
