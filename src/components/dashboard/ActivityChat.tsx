import { useState } from "react";
import type { ActivityMessage, Task } from "../../types/task";

type ActivityChatProps = {
  messages: ActivityMessage[];
  task: Task;
  onSendMessage: (taskCode: string, body: string) => void;
};

export default function ActivityChat({
  messages,
  task,
  onSendMessage,
}: ActivityChatProps) {
  const [draft, setDraft] = useState("");

  function handleSubmit() {
    const body = draft.trim();

    if (!body) {
      return;
    }

    onSendMessage(task.code, body);
    setDraft("");
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.07] p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-white/50">Conversazione attività</p>
          <h3 className="mt-1 text-lg font-black">{task.code}</h3>
        </div>
        <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/65">
          {messages.length} messaggi
        </div>
      </div>

      <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-white/55">
            Nessun messaggio operativo per questa attività.
          </p>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className={`rounded-2xl border p-4 ${
                message.kind === "event"
                  ? "border-[#97B822]/25 bg-[#97B822]/10"
                  : "border-white/10 bg-white/[0.08]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-black">{message.author}</p>
                  <p className="text-xs text-white/45">{message.role}</p>
                </div>
                <time className="text-xs font-semibold text-white/45">
                  {message.createdAt}
                </time>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/72">
                {message.body}
              </p>
            </article>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <input
          className="min-h-12 flex-1 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          placeholder="Scrivi un aggiornamento operativo..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <button
          className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#061521] shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white/40"
          disabled={!draft.trim()}
          onClick={handleSubmit}
        >
          Invia
        </button>
      </div>
    </section>
  );
}
