import type { Task } from "../../types/task";
import DueDateBadge from "./DueDateBadge";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import UserAvatar from "./UserAvatar";

type ActiveTaskCardProps = {
  task?: Task;
  liveWorkTime?: string;
  onComplete: (taskCode: string) => void;
  onOpenDetails: (taskCode: string) => void;
  onStandby: (taskCode: string) => void;
};

export default function ActiveTaskCard({
  task,
  liveWorkTime,
  onComplete,
  onOpenDetails,
  onStandby,
}: ActiveTaskCardProps) {
  if (!task) {
    return (
      <div className="rounded-[2rem] border border-white/8 bg-white/[0.05] p-6 shadow-lg shadow-black/10 backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
          Attività in corso
        </p>
        <h2 className="mt-3 text-xl font-black text-white/55">
          Nessuna attività avviata
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/38">
          Avvia un&apos;attività dalla lista per iniziare a lavorarci.
        </p>
      </div>
    );
  }

  const completedItems = task.checklist.filter((item) => item.completed).length;
  const pct =
    task.checklist.length > 0
      ? Math.round((completedItems / task.checklist.length) * 100)
      : 0;

  return (
    <div className="rounded-[2rem] border border-[#0166A4]/20 bg-[#0166A4]/[0.04] p-6 shadow-xl shadow-black/10 backdrop-blur-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
            Attività in corso
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight">{task.title}</h2>
        </div>
        <StatusBadge label={task.status} variant="progress" />
      </div>

      <p className="mt-2 text-sm leading-6 text-white/50">{task.description}</p>

      {/* Info strip — no boxes, just label+value pairs */}
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.07] pt-4">
        <div>
          <p className="text-xs text-white/40">Tempo registrato</p>
          <p className="mt-0.5 text-base font-black tabular-nums">
            {liveWorkTime ?? task.workTime}
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40">Priorità</p>
          <div className="mt-1">
            <PriorityBadge priority={task.priority} />
          </div>
        </div>
        <div>
          <p className="text-xs text-white/40">Scadenza</p>
          <div className="mt-1">
            <DueDateBadge dueDate={task.dueDate} />
          </div>
        </div>
        <div>
          <p className="text-xs text-white/40">Checklist</p>
          <p className="mt-0.5 text-base font-black">
            {completedItems}/{task.checklist.length}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs text-white/40">
            {completedItems} di {task.checklist.length} sotto-task completate
          </p>
          <span className="text-xs font-black text-[#E6F6A8]">{pct}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-[#97B822]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Secondary info: assignees, code, sectors */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          {task.assignees.map((assignee) => (
            <span key={assignee.id} title={assignee.name}>
              <UserAvatar user={assignee} />
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-white/30">{task.code}</span>
        {task.sectors.slice(0, 2).map((sector) => (
          <span key={sector} className="text-xs text-white/30">
            {sector}
          </span>
        ))}
        {task.sectors.length > 2 ? (
          <span className="text-xs text-white/20">+{task.sectors.length - 2}</span>
        ) : null}
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-2.5">
        <button
          type="button"
          className="rounded-2xl bg-amber-300 px-5 py-2.5 text-sm font-black text-[#061521] shadow-lg shadow-amber-300/15 transition hover:scale-[1.02]"
          onClick={() => onStandby(task.code)}
        >
          Metti in stand-by
        </button>

        <button
          type="button"
          className="rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-[#061521] shadow-lg transition hover:scale-[1.02]"
          onClick={() => onComplete(task.code)}
        >
          Termina attività
        </button>

        <button
          type="button"
          className="rounded-2xl border border-white/12 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/[0.15]"
          onClick={() => onOpenDetails(task.code)}
        >
          Apri dettagli
        </button>
      </div>
    </div>
  );
}
