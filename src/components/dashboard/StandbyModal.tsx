import { useState } from "react";
import type { StandbyReason, Task } from "../../types/task";

const standbyReasons: StandbyReason[] = [
  "attesa cliente",
  "attesa amministrazione",
  "attesa collega",
  "attesa documenti",
  "attesa materiale",
  "problema tecnico",
  "attività dipendente da un'altra attività",
  "altro",
];

type StandbyModalProps = {
  task: Task;
  tasks: Task[];
  onClose: () => void;
  onConfirm: (standbyInfo: {
    reason: StandbyReason;
    note?: string;
    blockingTaskCode?: string;
  }) => void;
};

export default function StandbyModal({
  task,
  tasks,
  onClose,
  onConfirm,
}: StandbyModalProps) {
  const [reason, setReason] = useState<StandbyReason>("attesa cliente");
  const [note, setNote] = useState("");
  const [blockingTaskCode, setBlockingTaskCode] = useState("");

  function handleSubmit() {
    onConfirm({
      reason,
      note: note.trim() || undefined,
      blockingTaskCode: blockingTaskCode || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07131E]/82 p-4 backdrop-blur-xl">
      <div className="w-full max-w-2xl rounded-[1.75rem] border border-white/[0.08] bg-[#0A1A28]/95 p-6 shadow-xl shadow-black/28">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/38">
              Stand-by attività
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight">{task.title}</h2>
            <p className="mt-2 font-mono text-xs text-white/38">{task.code}</p>
          </div>

          <button
            type="button"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/62 transition hover:bg-white/[0.07] hover:text-white/84"
            onClick={onClose}
          >
            Chiudi
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-white/68">Motivo</span>
            <select
              className="rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3 text-sm text-white/78 outline-none transition focus:border-[#0166A4]/35"
              value={reason}
              onChange={(event) => setReason(event.target.value as StandbyReason)}
            >
              {standbyReasons.map((item) => (
                <option key={item} className="bg-[#0B2233]" value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-white/68">
              Nota opzionale
            </span>
            <textarea
              className="min-h-28 resize-none rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3 text-sm leading-6 text-white/82 outline-none placeholder:text-white/32 transition focus:border-[#0166A4]/35"
              placeholder="Aggiungi il contesto operativo utile per riprendere l'attività."
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-white/68">
              Attività bloccante opzionale
            </span>
            <select
              className="rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3 text-sm text-white/78 outline-none transition focus:border-[#0166A4]/35"
              value={blockingTaskCode}
              onChange={(event) => setBlockingTaskCode(event.target.value)}
            >
              <option className="bg-[#0B2233]" value="">
                Nessuna
              </option>
              {tasks
                .filter((item) => item.code !== task.code)
                .map((item) => (
                  <option
                    key={item.code}
                    className="bg-[#0B2233]"
                    value={item.code}
                  >
                    {item.code} - {item.title}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white/62 transition hover:bg-white/[0.07] hover:text-white/84"
            onClick={onClose}
          >
            Annulla
          </button>
          <button
            type="button"
            className="rounded-2xl border border-amber-300/25 bg-amber-300/14 px-5 py-3 text-sm font-bold text-amber-100 transition hover:bg-amber-300/20"
            onClick={handleSubmit}
          >
            Conferma stand-by
          </button>
        </div>
      </div>
    </div>
  );
}
