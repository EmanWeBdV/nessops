import { useMemo, useState } from "react";
import type { Task, TaskAssignee, TaskSector, TaskStatus } from "../../types/task";
import DueDateBadge from "./DueDateBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import UserAvatar from "./UserAvatar";

type TasksListProps = {
  tasks: Task[];
  onOpenTaskDetails: (taskCode: string) => void;
  onTaskAction: (taskCode: string) => void;
};

function getStatusVariant(status: TaskStatus) {
  if (status === "In corso") {
    return "progress";
  }

  if (status === "In stand-by") {
    return "standby";
  }

  if (status === "Completata") {
    return "completed";
  }

  if (status === "Bloccata") {
    return "blocked";
  }

  if (status === "Annullata") {
    return "cancelled";
  }

  return "todo";
}

function getAccentClass(status: TaskStatus): string {
  if (status === "In corso") return "bg-[#0166A4]";
  if (status === "In stand-by") return "bg-amber-400";
  if (status === "Bloccata") return "bg-red-400";
  if (status === "Completata") return "bg-[#97B822]";
  if (status === "Annullata") return "bg-white/20";
  return "bg-[#97B822]";
}

function getTaskLabel(status: TaskStatus): string {
  if (status === "Da fare") return "Inizia";
  if (status === "In corso") return "Termina";
  if (status === "In stand-by") return "Riprendi";
  if (status === "Completata") return "Completata";
  return "Non disponibile";
}

function isTaskActionDisabled(status: TaskStatus) {
  return (
    status === "Completata" || status === "Annullata" || status === "Bloccata"
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getFilterAssignees(tasks: Task[]) {
  const assignees = new Map<string, TaskAssignee>();

  tasks.forEach((task) => {
    task.assignees.forEach((assignee) => assignees.set(assignee.id, assignee));
    task.checklist.forEach((item) => {
      item.assignees.forEach((assignee) => assignees.set(assignee.id, assignee));
    });
  });

  return Array.from(assignees.values()).sort((first, second) =>
    first.name.localeCompare(second.name),
  );
}

function getFilterSectors(tasks: Task[]) {
  return Array.from(
    new Set(tasks.flatMap((task) => task.sectors)),
  ).sort((first, second) => first.localeCompare(second));
}

function getChecklistProgress(task: Task) {
  const completed = task.checklist.filter((item) => item.completed).length;
  const total = task.checklist.length;

  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export default function TasksList({
  tasks,
  onOpenTaskDetails,
  onTaskAction,
}: TasksListProps) {
  const [selectedSector, setSelectedSector] = useState<TaskSector | "all">(
    "all",
  );
  const [selectedAssigneeId, setSelectedAssigneeId] = useState("all");
  const sectors = useMemo(() => getFilterSectors(tasks), [tasks]);
  const assignees = useMemo(() => getFilterAssignees(tasks), [tasks]);
  const filteredTasks = tasks.filter((task) => {
    const matchesSector =
      selectedSector === "all" || task.sectors.includes(selectedSector);
    const matchesAssignee =
      selectedAssigneeId === "all" ||
      task.assignees.some((assignee) => assignee.id === selectedAssigneeId) ||
      task.checklist.some((item) =>
        item.assignees.some((assignee) => assignee.id === selectedAssigneeId),
      );

    return matchesSector && matchesAssignee;
  });

  const openTasks = filteredTasks.filter((task) => task.status !== "Completata");
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completata",
  );

  return (
    <section className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black">Le mie attività di oggi</h2>
          <p className="mt-1 text-sm text-white/55">
            Una vista pulita delle attività assegnate alla tua giornata.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            aria-label="Filtra per settore"
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/82 outline-none"
            value={selectedSector}
            onChange={(event) =>
              setSelectedSector(event.target.value as TaskSector | "all")
            }
          >
            <option className="bg-[#0B2233]" value="all">
              Tutti i settori
            </option>
            {sectors.map((sector) => (
              <option key={sector} className="bg-[#0B2233]" value={sector}>
                {sector}
              </option>
            ))}
          </select>

          <select
            aria-label="Filtra per assegnatario"
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/82 outline-none"
            value={selectedAssigneeId}
            onChange={(event) => setSelectedAssigneeId(event.target.value)}
          >
            <option className="bg-[#0B2233]" value="all">
              Tutti gli assegnatari
            </option>
            {assignees.map((assignee) => (
              <option
                key={assignee.id}
                className="bg-[#0B2233]"
                value={assignee.id}
              >
                {assignee.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-sm text-white/55">
              Nessuna attività corrisponde ai filtri selezionati.
            </div>
          ) : null}

          {openTasks.length === 0 && filteredTasks.length > 0 ? (
            <div className="rounded-3xl border border-[#97B822]/25 bg-[#97B822]/10 p-5 text-sm text-[#E6F6A8]">
              Tutte le attività filtrate risultano completate.
            </div>
          ) : null}

          {openTasks.map((task) => (
            <TaskRow
              key={task.code}
              task={task}
              onOpenTaskDetails={onOpenTaskDetails}
              onTaskAction={onTaskAction}
            />
          ))}
        </div>

        <CompletedTasksPanel
          tasks={completedTasks}
          onOpenTaskDetails={onOpenTaskDetails}
        />
      </div>
    </section>
  );
}

function TaskRow({
  task,
  onOpenTaskDetails,
  onTaskAction,
}: {
  task: Task;
  onOpenTaskDetails: (taskCode: string) => void;
  onTaskAction: (taskCode: string) => void;
}) {
  const checklist = getChecklistProgress(task);
  const visibleSectors = task.sectors.slice(0, 2);
  const hiddenSectors = task.sectors.length - visibleSectors.length;
  const isInProgress = task.status === "In corso";
  const isStandby = task.status === "In stand-by";

  const cardClasses = isInProgress
    ? "border-[#0166A4]/40 bg-[#0166A4]/[0.05] shadow-[0_0_28px_rgba(1,102,164,0.10)]"
    : isStandby
    ? "border-amber-400/25 bg-amber-400/[0.03]"
    : "border-white/10 bg-white/[0.07]";

  return (
    <div
      className={`group overflow-hidden rounded-3xl border transition hover:-translate-y-px ${cardClasses}`}
    >
      <div className="flex min-h-0">
        <div className={`w-1.5 shrink-0 ${getAccentClass(task.status)}`} />

        <div className="grid min-w-0 flex-1 lg:grid-cols-[1fr_210px]">
          {/* Left: main content */}
          <div className="min-w-0 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-black leading-snug text-white">
                {task.title}
              </h3>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/50">
                {task.code}
              </span>
              <StatusBadge
                label={task.status}
                variant={getStatusVariant(task.status)}
              />
            </div>

            <p className="mt-2 text-sm leading-6 text-white/55">
              {task.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {visibleSectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-xs font-semibold text-white/55"
                >
                  {sector}
                </span>
              ))}
              {hiddenSectors > 0 ? (
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-xs font-semibold text-white/38">
                  +{hiddenSectors}
                </span>
              ) : null}
            </div>

            <div className="mt-4 max-w-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-white/40">
                <span>Checklist</span>
                <span>
                  {checklist.completed}/{checklist.total} · {checklist.percent}%
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#97B822] transition-all"
                  style={{ width: `${checklist.percent}%` }}
                />
              </div>
            </div>

            {isStandby && task.standbyInfo ? (
              <div className="mt-3 inline-flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.08] px-3 py-2 text-xs text-amber-100/80">
                <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full border border-amber-300/50 bg-amber-300/20" />
                <span>
                  <span className="font-black">Stand-by:</span>{" "}
                  {task.standbyInfo.reason}
                  {task.standbyInfo.note ? ` — ${task.standbyInfo.note}` : ""}
                </span>
              </div>
            ) : null}
          </div>

          {/* Right: meta + actions */}
          <div className="flex flex-col gap-4 border-t border-white/[0.08] bg-white/[0.03] p-4 lg:border-l lg:border-t-0">
            <div>
              <p className="mb-2 text-xs font-semibold text-white/38">Assegnatari</p>
              <div className="flex flex-wrap gap-1.5">
                {task.assignees.map((assignee) => (
                  <span
                    key={assignee.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] py-0.5 pl-0.5 pr-2 text-xs font-semibold text-white/62"
                  >
                    <UserAvatar user={assignee} />
                    {assignee.name.split(" ")[0]}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-white/30">{formatDate(task.assignedAt)}</p>
            </div>

            <div className="flex flex-col gap-2">
              <PriorityBadge priority={task.priority} />
              <DueDateBadge dueDate={task.dueDate} />
            </div>

            <div className="mt-auto flex flex-col gap-2">
              <button
                type="button"
                className="rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-xs font-bold text-white/65 transition hover:bg-white/[0.15]"
                onClick={() => onOpenTaskDetails(task.code)}
              >
                Dettagli
              </button>
              <button
                type="button"
                className="rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-[#061521] shadow-lg transition enabled:group-hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white/35"
                disabled={isTaskActionDisabled(task.status)}
                onClick={() => onTaskAction(task.code)}
              >
                {getTaskLabel(task.status)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompletedTasksPanel({
  tasks,
  onOpenTaskDetails,
}: {
  tasks: Task[];
  onOpenTaskDetails: (taskCode: string) => void;
}) {
  return (
    <aside className="rounded-3xl border border-[#97B822]/25 bg-[#97B822]/10 p-4 xl:sticky xl:top-6 xl:self-start">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#E6F6A8]/75">Archivio giornata</p>
          <h3 className="mt-1 text-xl font-black">Completate</h3>
        </div>
        <span className="rounded-full border border-[#97B822]/30 bg-[#97B822]/15 px-3 py-1 text-xs font-black text-[#E6F6A8]">
          {tasks.length}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-white/55">
            Nessuna attività completata nei filtri attuali.
          </p>
        ) : (
          tasks.map((task) => {
            const checklist = getChecklistProgress(task);

            return (
              <div
                key={task.code}
                className="rounded-2xl border border-[#97B822]/25 bg-[#061521]/25 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black leading-5">{task.title}</p>
                    <p className="mt-1 text-xs text-white/45">{task.code}</p>
                  </div>
                  <StatusBadge label="Completata" variant="completed" />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {task.assignees.slice(0, 3).map((assignee) => (
                    <UserAvatar key={assignee.id} user={assignee} />
                  ))}
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold text-white/50">
                    <span>Checklist</span>
                    <span>
                      {checklist.completed}/{checklist.total}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#97B822]"
                      style={{ width: `${checklist.percent}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white/78 transition hover:bg-white/20"
                  onClick={() => onOpenTaskDetails(task.code)}
                >
                  Apri dettagli
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
