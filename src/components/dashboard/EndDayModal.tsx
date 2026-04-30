import type { Task, TaskStatus } from "../../types/task";
import StatusBadge from "./StatusBadge";

function getStatusVariant(status: TaskStatus) {
  if (status === "In corso") return "progress" as const;
  if (status === "In stand-by") return "standby" as const;
  if (status === "Completata") return "completed" as const;
  if (status === "Bloccata") return "blocked" as const;
  if (status === "Annullata") return "cancelled" as const;
  return "todo" as const;
}

type DaySummary = {
  completed: number;
  open: number;
  standby: number;
  workTime: string;
  standbyTime: string;
  blockedTime: string;
};

type EndDayModalProps = {
  activeTask?: Task;
  endDayNote: string;
  summary: DaySummary;
  tasks: Task[];
  onClose: () => void;
  onCompleteTask: (taskCode: string) => void;
  onConfirmCloseDay: () => void;
  onNoteChange: (value: string) => void;
  onResumeTomorrow: (taskCode: string) => void;
  onStandbyTask: (taskCode: string) => void;
};

export default function EndDayModal({
  activeTask,
  endDayNote,
  summary,
  tasks,
  onClose,
  onCompleteTask,
  onConfirmCloseDay,
  onNoteChange,
  onResumeTomorrow,
  onStandbyTask,
}: EndDayModalProps) {
  const completedTasks = tasks.filter((task) => task.status === "Completata");
  const openTasks = tasks.filter(
    (task) => task.status === "Da fare" || task.status === "Bloccata",
  );
  const standbyTasks = tasks.filter((task) => task.status === "In stand-by");
  const canCloseDay = !activeTask;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061521]/80 p-4 backdrop-blur-xl">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#0B2233]/95 p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-white/50">Riepilogo operativo</p>
            <h2 className="mt-2 text-2xl font-black">Fine giornata</h2>
          </div>

          <button
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/82 transition hover:bg-white/20"
            onClick={onClose}
          >
            Chiudi
          </button>
        </div>

        {activeTask ? (
          <div className="mt-6 rounded-3xl border border-amber-300/35 bg-amber-300/15 p-4">
            <p className="text-sm font-bold text-amber-100">
              C&apos;è ancora un&apos;attività in corso
            </p>
            <h3 className="mt-2 text-lg font-black">{activeTask.title}</h3>
            <p className="mt-1 text-sm text-white/65">
              Prima di chiudere la giornata scegli come gestirla.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-[#061521] shadow-lg transition hover:scale-[1.02]"
                onClick={() => onCompleteTask(activeTask.code)}
              >
                Termina
              </button>
              <button
                type="button"
                className="rounded-2xl bg-amber-300 px-4 py-2.5 text-sm font-black text-[#061521] shadow-lg shadow-amber-300/20 transition hover:scale-[1.02]"
                onClick={() => onStandbyTask(activeTask.code)}
              >
                Stand-by
              </button>
              <button
                type="button"
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/82 transition hover:bg-white/20"
                onClick={() => onResumeTomorrow(activeTask.code)}
              >
                Riprendi domani
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
            <p className="text-xs text-white/45">Tempo effettivo</p>
            <p className="mt-1 text-xl font-black">{summary.workTime}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
            <p className="text-xs text-white/45">Tempo stand-by</p>
            <p className="mt-1 text-xl font-black">{summary.standbyTime}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
            <p className="text-xs text-white/45">Tempo bloccato</p>
            <p className="mt-1 text-xl font-black">{summary.blockedTime}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <TaskGroup
            emptyText="Nessuna attività completata."
            tasks={completedTasks}
            title={`Completate (${summary.completed})`}
          />
          <TaskGroup
            emptyText="Nessuna attività aperta."
            tasks={openTasks}
            title={`Aperte (${summary.open})`}
          />
          <TaskGroup
            emptyText="Nessuna attività in stand-by."
            tasks={standbyTasks}
            title={`Stand-by (${summary.standby})`}
          />
        </div>

        <label className="mt-6 grid gap-2">
          <span className="text-sm font-semibold text-white/75">
            Note finali
          </span>
          <textarea
            className="min-h-28 resize-none rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35"
            placeholder="Aggiungi eventuali note per riprendere il contesto domani."
            value={endDayNote}
            onChange={(event) => onNoteChange(event.target.value)}
          />
        </label>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/20"
            onClick={onClose}
          >
            Annulla
          </button>
          <button
            type="button"
            className="rounded-2xl bg-gradient-to-r from-[#97B822] to-[#C6E94B] px-5 py-3 text-sm font-black text-[#061521] shadow-xl shadow-[#97B822]/25 transition enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!canCloseDay}
            onClick={onConfirmCloseDay}
          >
            Conferma chiusura
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskGroup({
  emptyText,
  tasks,
  title,
}: {
  emptyText: string;
  tasks: Task[];
  title: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
      <h3 className="font-black">{title}</h3>
      <div className="mt-3 space-y-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-white/50">{emptyText}</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.code}
              className="rounded-2xl border border-white/10 bg-white/[0.07] p-3"
            >
              <p className="text-sm font-bold">{task.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/50">
                  {task.code}
                </span>
                <StatusBadge label={task.status} variant={getStatusVariant(task.status)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
