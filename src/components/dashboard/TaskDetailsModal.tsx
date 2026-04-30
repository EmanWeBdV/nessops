import type { ActivityMessage, Task, TaskAssignee, TaskStatus } from "../../types/task";
import ActivityChat from "./ActivityChat";
import DueDateBadge from "./DueDateBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import UserAvatar from "./UserAvatar";

type TaskDetailsModalProps = {
  mentionableUsers: TaskAssignee[];
  messages: ActivityMessage[];
  task: Task;
  onClose: () => void;
  onSendMessage: (
    taskCode: string,
    body: string,
    mentions: TaskAssignee[],
  ) => void;
  onToggleChecklistItem: (taskCode: string, checklistItemId: string) => void;
};

function getStatusVariant(status: TaskStatus) {
  if (status === "In corso") return "progress" as const;
  if (status === "In stand-by") return "standby" as const;
  if (status === "Completata") return "completed" as const;
  if (status === "Bloccata") return "blocked" as const;
  if (status === "Annullata") return "cancelled" as const;
  return "todo" as const;
}

export default function TaskDetailsModal({
  mentionableUsers,
  messages,
  task,
  onClose,
  onSendMessage,
  onToggleChecklistItem,
}: TaskDetailsModalProps) {
  const completedItems = task.checklist.filter((item) => item.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061521]/80 p-4 backdrop-blur-xl">
      <div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-[#0B2233]/95 p-6 text-white shadow-2xl shadow-black/40">
        <div className="shrink-0 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-white/50">Dettaglio attività</p>
            <h2 className="mt-2 text-2xl font-black">{task.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">
              {task.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge label={task.status} variant={getStatusVariant(task.status)} />
            <button
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/82 transition hover:bg-white/20"
              onClick={onClose}
            >
              Chiudi
            </button>
          </div>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 gap-5 overflow-y-auto pr-1 lg:grid-cols-[minmax(0,1fr)_390px] lg:overflow-hidden lg:pr-0">
          <div className="min-h-0 space-y-4 lg:overflow-y-auto lg:pr-1">
            <div className="grid gap-3 md:grid-cols-3">
              <InfoTile label="Codice" value={task.code} />
              <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                <p className="text-xs text-white/45">Priorità</p>
                <div className="mt-2">
                  <PriorityBadge priority={task.priority} size="lg" />
                </div>
              </div>
              <InfoTile label="Tempo lavoro" value={task.workTime ?? "0h 00m"} />
              <InfoTile label="Assegnata" value={formatDate(task.assignedAt)} />
              <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                <p className="text-xs text-white/45">Scadenza</p>
                <div className="mt-2">
                  <DueDateBadge dueDate={task.dueDate} size="lg" />
                </div>
              </div>
              <InfoTile
                label="Checklist"
                value={`${completedItems}/${task.checklist.length} completate`}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <section className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                <p className="text-sm text-white/50">Assegnatari</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {task.assignees.map((assignee) => (
                    <span
                      key={assignee.id}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] py-1 pl-1 pr-3 text-xs font-bold text-white/70"
                    >
                      <UserAvatar user={assignee} />
                      {assignee.name}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                <p className="text-sm text-white/50">Settori</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {task.sectors.map((sector) => (
                    <span
                      key={sector}
                      className="rounded-full border border-[#0166A4]/30 bg-[#0166A4]/15 px-3 py-1 text-xs font-bold text-blue-100"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <section className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-white/50">Elenco di controllo</p>
                  <h3 className="mt-1 text-lg font-black">
                    {completedItems}/{task.checklist.length} completate
                  </h3>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {task.checklist.map((item) => (
                  <button
                    key={item.id}
                    className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-left transition hover:border-[#97B822]/30 hover:bg-[#97B822]/10 md:flex-row md:items-center md:justify-between"
                    onClick={() => onToggleChecklistItem(task.code, item.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                          item.completed
                            ? "border-[#97B822]/40 bg-[#97B822]/25 text-[#E6F6A8]"
                            : "border-white/20 bg-white/10 text-white/45"
                        }`}
                      >
                        {item.completed ? "✓" : ""}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{item.title}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.assignees.map((assignee) => (
                            <span
                              key={assignee.id}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] py-1 pl-1 pr-3 text-xs font-semibold text-white/55"
                            >
                              <UserAvatar user={assignee} />
                              {assignee.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="min-h-[520px] lg:h-full lg:min-h-0">
            <ActivityChat
              className="h-full"
              mentionableUsers={mentionableUsers}
              messages={messages}
              task={task}
              onSendMessage={onSendMessage}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 text-xl font-black">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}
