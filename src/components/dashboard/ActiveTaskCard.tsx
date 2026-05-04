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
      <div className="rounded-[1.75rem] border border-white/[0.07] bg-white/[0.035] p-7 shadow-sm shadow-black/10 backdrop-blur-xl">
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
    <div className="rounded-[1.75rem] border border-[#0166A4]/18 bg-[#0A1A28]/72 p-7 shadow-lg shadow-black/12 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
            Attività in corso
          </p>
          <h2 className="mt-2 text-[1.7rem] font-black leading-tight">{task.title}</h2>
        </div>
        <StatusBadge label={task.status} variant="progress" />
      </div>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-white/54">{task.description}</p>

      {/* Info strip — no boxes, just label+value pairs */}
      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/[0.06] pt-5">
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
        <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-[#97B822]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Secondary info: assignees, code, sectors */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
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
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-2xl border border-amber-300/25 bg-amber-300/12 px-5 py-2.5 text-sm font-bold text-amber-100 transition hover:bg-amber-300/18"
          onClick={() => onStandby(task.code)}
        >
          Metti in stand-by
        </button>

        <button
          type="button"
          className="rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-[#061521] shadow-sm transition hover:bg-white/90"
          onClick={() => onComplete(task.code)}
        >
          Termina attività
        </button>

        <button
          type="button"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-white/64 transition hover:bg-white/[0.07] hover:text-white/84"
          onClick={() => onOpenDetails(task.code)}
        >
          Apri dettagli
        </button>
      </div>
    </div>
  );
}
