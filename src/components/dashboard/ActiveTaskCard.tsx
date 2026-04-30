import type { ActivityMessage, Task } from "../../types/task";
import ActivityChat from "./ActivityChat";
import StatusBadge from "./StatusBadge";

type ActiveTaskCardProps = {
  messages: ActivityMessage[];
  task?: Task;
  onComplete: (taskCode: string) => void;
  onSendMessage: (taskCode: string, body: string) => void;
  onStandby: (taskCode: string) => void;
};

export default function ActiveTaskCard({
  messages,
  task,
  onComplete,
  onSendMessage,
  onStandby,
}: ActiveTaskCardProps) {
  if (!task) {
    return (
      <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <p className="text-sm text-white/50">Attività attiva</p>
        <h2 className="mt-2 text-2xl font-black">Nessuna attività in corso</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
          Avvia un&apos;attività dalla lista per renderla attiva nella giornata.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm text-white/50">Attività attiva</p>
          <h2 className="mt-2 text-2xl font-black">{task.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
            {task.description}
          </p>
        </div>

        <StatusBadge label={task.status} variant="progress" />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
          <p className="text-xs text-white/45">Tempo lavoro</p>
          <p className="mt-1 text-xl font-black">{task.workTime}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
          <p className="text-xs text-white/45">Priorità</p>
          <p className="mt-1 text-xl font-black">{task.priority}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
          <p className="text-xs text-white/45">Codice</p>
          <p className="mt-1 text-xl font-black">{task.code}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black text-[#061521] shadow-lg shadow-amber-300/20 transition hover:scale-[1.02]"
          onClick={() => onStandby(task.code)}
        >
          Metti in stand-by
        </button>

        <button
          className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#061521] shadow-lg transition hover:scale-[1.02]"
          onClick={() => onComplete(task.code)}
        >
          Termina attività
        </button>

        <button className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/20">
          Apri dettagli
        </button>
      </div>

      <ActivityChat
        messages={messages}
        task={task}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}
