import { useState } from "react";
import type { DepartmentSummary, OperationalRequest } from "../../types/operations";
import type { Task } from "../../types/task";
import type { MockUser } from "../../types/user";
import DueDateBadge from "./DueDateBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import UserAvatar from "./UserAvatar";

type DepartmentOverviewProps = {
  summary: DepartmentSummary;
  tasks: Task[];
  requests: OperationalRequest[];
  users: MockUser[];
};

type OperationsSegment = "Reparto" | "Richieste" | "Bloccate" | "Stand-by";

const segments: OperationsSegment[] = [
  "Reparto",
  "Richieste",
  "Bloccate",
  "Stand-by",
];

function getStatusVariant(status: Task["status"]) {
  if (status === "In corso") return "progress" as const;
  if (status === "In stand-by") return "standby" as const;
  if (status === "Completata") return "completed" as const;
  if (status === "Bloccata") return "blocked" as const;
  if (status === "Annullata") return "cancelled" as const;
  return "todo" as const;
}

function getRequestTone(status: OperationalRequest["status"]) {
  if (status === "nuova") {
    return "border-[#0166A4]/24 bg-[#0166A4]/10 text-blue-100";
  }

  if (status === "assegnata") {
    return "border-[#97B822]/24 bg-[#97B822]/10 text-[#E6F6A8]";
  }

  if (status === "chiusa") {
    return "border-white/[0.08] bg-white/[0.035] text-white/52";
  }

  return "border-amber-300/18 bg-amber-300/[0.06] text-amber-100/82";
}

function formatRequestTime(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getUser(users: MockUser[], userId: string) {
  return users.find((user) => user.id === userId);
}

function getTaskOwner(task: Task, users: MockUser[]) {
  return task.assignees
    .map((assignee) => getUser(users, assignee.id))
    .find((user) => user !== undefined);
}

export default function DepartmentOverview({
  summary,
  tasks,
  requests,
  users,
}: DepartmentOverviewProps) {
  const [activeSegment, setActiveSegment] =
    useState<OperationsSegment>("Reparto");
  const departmentTasks = tasks.filter((task) =>
    task.sectors.includes(summary.department),
  );
  const inProgressTasks = departmentTasks.filter((task) => task.status === "In corso");
  const standbyTasks = departmentTasks.filter((task) => task.status === "In stand-by");
  const blockedTasks = departmentTasks.filter((task) => task.status === "Bloccata");
  const completedTasks = departmentTasks.filter((task) => task.status === "Completata");
  const highlightedTasks = [
    ...inProgressTasks,
    ...blockedTasks,
    ...standbyTasks,
    ...departmentTasks.filter((task) => task.status === "Da fare"),
  ].slice(0, 5);
  const lead = getUser(users, summary.leadUserId);

  return (
    <section className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-sm shadow-black/10 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/38">
            Vista Capo BU
          </p>
          <h2 className="mt-2 text-[1.55rem] font-black">
            Operations - {summary.department}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/52">
            Quadro mock del reparto: carico operativo, criticità e richieste in ingresso.
          </p>
        </div>

        {lead ? (
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-3 py-2">
            <UserAvatar user={lead} />
            <div>
              <p className="text-xs font-bold text-white/72">{lead.name}</p>
              <p className="text-[11px] text-white/38">{lead.role}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <MetricCard label="Attività reparto" value={departmentTasks.length} />
        <MetricCard label="In corso" value={inProgressTasks.length} tone="blue" />
        <MetricCard label="Stand-by" value={standbyTasks.length} tone="amber" />
        <MetricCard label="Bloccate" value={blockedTasks.length} tone="red" />
        <MetricCard label="Completate oggi" value={completedTasks.length} tone="green" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {segments.map((segment) => (
          <button
            key={segment}
            type="button"
            className={`rounded-2xl border px-4 py-2.5 text-sm font-bold transition ${
              activeSegment === segment
                ? "border-[#0166A4]/28 bg-[#0166A4]/14 text-white"
                : "border-white/[0.07] bg-white/[0.035] text-white/50 hover:bg-white/[0.06] hover:text-white/75"
            }`}
            onClick={() => setActiveSegment(segment)}
          >
            {segment}
          </button>
        ))}
      </div>

      {activeSegment === "Reparto" ? (
        <div className="mt-6">
          <TasksPanel
            emptyText="Nessuna attività reparto in evidenza."
            tasks={highlightedTasks}
            title="Attività reparto"
            users={users}
          />
        </div>
      ) : null}

      {activeSegment === "Richieste" ? (
        <RequestsPanel requests={requests} />
      ) : null}

      {activeSegment === "Bloccate" ? (
        <div className="mt-6">
          <TasksPanel
            emptyText="Nessuna attività bloccata nel reparto."
            tasks={blockedTasks}
            title="Attività bloccate"
            users={users}
          />
        </div>
      ) : null}

      {activeSegment === "Stand-by" ? (
        <div className="mt-6">
          <TasksPanel
            emptyText="Nessuna attività in stand-by nel reparto."
            tasks={standbyTasks}
            title="Attività in stand-by"
            users={users}
          />
        </div>
      ) : null}
    </section>
  );
}

function TasksPanel({
  emptyText,
  tasks,
  title,
  users,
}: {
  emptyText: string;
  tasks: Task[];
  title: string;
  users: MockUser[];
}) {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-black">{title}</h3>
        <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-1 text-xs font-bold text-white/48">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm text-white/48">
          {emptyText}
        </p>
      ) : (
        tasks.map((task) => {
          const owner = getTaskOwner(task, users);

          return (
            <article
              key={task.code}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.028] p-4 transition hover:border-white/12 hover:bg-white/[0.045]"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-black leading-5">{task.title}</h4>
                    <span className="rounded-full bg-white/[0.045] px-2 py-0.5 font-mono text-xs font-semibold text-white/42">
                      {task.code}
                    </span>
                    <StatusBadge label={task.status} variant={getStatusVariant(task.status)} />
                  </div>

                  {owner ? (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.035] py-0.5 pl-0.5 pr-2 text-xs font-semibold text-white/58">
                      <UserAvatar user={owner} />
                      {owner.name}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <PriorityBadge priority={task.priority} />
                  <DueDateBadge dueDate={task.dueDate} />
                </div>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}

function RequestsPanel({ requests }: { requests: OperationalRequest[] }) {
  return (
    <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-black">Richieste operative</h3>
          <span className="rounded-full border border-[#0166A4]/24 bg-[#0166A4]/10 px-3 py-1 text-xs font-black text-blue-100">
            {requests.length}
          </span>
        </div>

        {requests.map((request) => (
          <article
            key={request.id}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.028] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black leading-5">{request.title}</p>
                <p className="mt-1 text-xs text-white/42">
                  {request.requester} - {formatRequestTime(request.receivedAt)}
                </p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${getRequestTone(
                  request.status,
                )}`}
              >
                {request.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <PriorityBadge priority={request.priority} />
              {request.linkedTaskCode ? (
                <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 font-mono text-xs font-semibold text-white/44">
                  {request.linkedTaskCode}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <aside className="rounded-2xl border border-[#97B822]/18 bg-[#97B822]/[0.055] p-4 xl:self-start">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F6A8]/70">
          Assegnazione mock
        </p>
        <h3 className="mt-2 text-xl font-black">Prossimo flusso</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">
          Le richieste nuove potranno essere valutate e trasformate in attività
          locali senza backend.
        </p>
      </aside>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "blue" | "green" | "amber" | "red";
}) {
  const tones = {
    neutral: "border-white/[0.07] bg-white/[0.03] text-white",
    blue: "border-[#0166A4]/20 bg-[#0166A4]/[0.07] text-blue-50",
    green: "border-[#97B822]/20 bg-[#97B822]/[0.07] text-[#E6F6A8]",
    amber: "border-amber-300/18 bg-amber-300/[0.055] text-amber-100",
    red: "border-red-300/18 bg-red-300/[0.055] text-red-100",
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/38">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tabular-nums">{value}</p>
    </div>
  );
}
