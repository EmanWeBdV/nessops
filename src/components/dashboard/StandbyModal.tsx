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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061521]/80 p-4 backdrop-blur-xl">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/15 bg-[#0B2233]/95 p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-white/50">Stand-by attività</p>
            <h2 className="mt-2 text-2xl font-black">{task.title}</h2>
            <p className="mt-2 text-sm text-white/60">{task.code}</p>
          </div>

          <button
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/82 transition hover:bg-white/20"
            onClick={onClose}
          >
            Chiudi
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-white/75">Motivo</span>
            <select
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none"
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
            <span className="text-sm font-semibold text-white/75">
              Nota opzionale
            </span>
            <textarea
              className="min-h-28 resize-none rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35"
              placeholder="Aggiungi il contesto operativo utile per riprendere l'attività."
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-white/75">
              Attività bloccante opzionale
            </span>
            <select
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none"
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
            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/20"
            onClick={onClose}
          >
            Annulla
          </button>
          <button
            className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black text-[#061521] shadow-lg shadow-amber-300/20 transition hover:scale-[1.02]"
            onClick={handleSubmit}
          >
            Conferma stand-by
          </button>
        </div>
      </div>
    </div>
  );
}
