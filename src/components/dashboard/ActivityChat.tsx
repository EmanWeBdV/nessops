import { useState } from "react";
import type { ActivityMessage, Task, TaskAssignee } from "../../types/task";
import UserAvatar from "./UserAvatar";

type ActivityChatProps = {
  className?: string;
  mentionableUsers: TaskAssignee[];
  messages: ActivityMessage[];
  task: Task;
  onSendMessage: (
    taskCode: string,
    body: string,
    mentions: TaskAssignee[],
  ) => void;
};

export default function ActivityChat({
  className = "mt-6",
  mentionableUsers,
  messages,
  task,
  onSendMessage,
}: ActivityChatProps) {
  const [draft, setDraft] = useState("");
  const [selectedMentions, setSelectedMentions] = useState<TaskAssignee[]>([]);
  const [activeMention, setActiveMention] = useState<{
    messageId: string;
    user: TaskAssignee;
  } | null>(null);
  const mentionMatch = draft.match(/(^|\s)@([\p{L}\p{N}._-]*)$/u);
  const mentionQuery = mentionMatch?.[2].toLowerCase() ?? "";
  const displayMessages = messages.filter(
    (message) => !message.body.startsWith("Notifica speciale inviata"),
  );
  const mentionSuggestions = mentionMatch
    ? mentionableUsers
        .filter((user) => !selectedMentions.some((item) => item.id === user.id))
        .filter((user) => user.name.toLowerCase().includes(mentionQuery))
        .slice(0, 5)
    : [];

  function handleSubmit() {
    const body = draft.trim();

    if (!body) {
      return;
    }

    onSendMessage(task.code, body, selectedMentions);
    setDraft("");
    setSelectedMentions([]);
  }

  function handleMentionSelect(user: TaskAssignee) {
    const nextDraft = draft.replace(
      /(^|\s)@([\p{L}\p{N}._-]*)$/u,
      (match, prefix: string) => `${prefix}@${user.name} `,
    );

    setDraft(nextDraft);
    setSelectedMentions((currentMentions) => [...currentMentions, user]);
  }

  function getMessageAuthor(message: ActivityMessage) {
    return mentionableUsers.find((user) => user.id === message.authorId);
  }

  function renderMessageBody(message: ActivityMessage) {
    if (!message.mentions || message.mentions.length === 0) {
      return message.body;
    }

    const mentionNames = message.mentions
      .map((mention) => mention.name)
      .sort((first, second) => second.length - first.length)
      .map(escapeRegExp);
    const mentionPattern = new RegExp(`@(${mentionNames.join("|")})`, "g");
    const parts = message.body.split(mentionPattern);

    return parts.map((part, index) => {
      const user = message.mentions?.find((mention) => mention.name === part);

      if (!user) {
        return <span key={`${message.id}-${index}`}>{part}</span>;
      }

      return (
        <button
          key={`${message.id}-${user.id}-${index}`}
          className="inline-flex items-center gap-1 align-baseline font-black text-[#E6F6A8] underline decoration-[#97B822]/45 underline-offset-4 transition hover:text-white"
          onClick={() => setActiveMention({ messageId: message.id, user })}
          type="button"
        >
          <UserAvatar user={user} />
          @{user.name}
        </button>
      );
    });
  }

  return (
    <section
      className={`${className} flex min-h-0 flex-col rounded-3xl border border-white/10 bg-white/[0.07] p-4`}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-white/50">Conversazione attività</p>
          <h3 className="mt-1 text-lg font-black">{task.code}</h3>
        </div>
        <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/65">
          {displayMessages.length} messaggi
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {displayMessages.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-white/55">
            Nessun messaggio operativo per questa attività.
          </p>
        ) : (
          displayMessages.map((message) => (
            <article
              key={message.id}
              className={`rounded-2xl border p-4 ${
                message.kind === "event"
                  ? "border-[#97B822]/25 bg-[#97B822]/10"
                  : "border-white/10 bg-white/[0.08]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    size="md"
                    user={
                      getMessageAuthor(message) ?? {
                        name: message.author,
                        avatarColor:
                          message.kind === "event" ? "#97B822" : "#0166A4",
                      }
                    }
                  />
                  <div>
                    <p className="text-sm font-black">{message.author}</p>
                    <p className="text-xs text-white/45">{message.role}</p>
                  </div>
                </div>
                <time className="text-xs font-semibold text-white/45">
                  {message.createdAt}
                </time>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/72">
                {renderMessageBody(message)}
              </p>
              {activeMention?.messageId === message.id ? (
                <div className="mt-3 rounded-2xl border border-[#97B822]/25 bg-[#97B822]/10 p-3">
                  <div className="flex items-start gap-3">
                    <UserAvatar size="md" user={activeMention.user} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-white">
                        {activeMention.user.name}
                      </p>
                      <p className="mt-0.5 text-xs text-white/50">
                        {activeMention.user.role}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#061521] transition hover:scale-[1.02]"
                          type="button"
                        >
                          Chat privata
                        </button>
                        <button
                          className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white/75 transition hover:bg-white/20"
                          type="button"
                        >
                          Apri profilo
                        </button>
                      </div>
                    </div>
                    <button
                      className="rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-bold text-white/55 transition hover:bg-white/20"
                      onClick={() => setActiveMention(null)}
                      type="button"
                    >
                      Chiudi
                    </button>
                  </div>
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>

      {selectedMentions.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedMentions.map((mention) => (
            <span
              key={mention.id}
              className="inline-flex items-center gap-2 rounded-full border border-[#97B822]/30 bg-[#97B822]/15 px-3 py-1 text-xs font-bold text-[#E6F6A8]"
            >
              <UserAvatar user={mention} />
              Notifica a @{mention.name}
            </span>
          ))}
        </div>
      ) : null}

      <div className="relative mt-4 flex flex-col gap-3">
        {mentionSuggestions.length > 0 ? (
          <div className="absolute bottom-[calc(100%+0.5rem)] left-0 z-10 w-full max-w-md rounded-2xl border border-white/15 bg-[#0B2233] p-2 shadow-2xl shadow-black/30">
            {mentionSuggestions.map((user) => (
              <button
                key={user.id}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/10"
                onClick={() => handleMentionSelect(user)}
              >
                <span className="flex items-center gap-2 font-bold text-white">
                  <UserAvatar user={user} />
                  @{user.name}
                </span>
                <span className="text-xs text-white/45">{user.role}</span>
              </button>
            ))}
          </div>
        ) : null}

        <input
          className="min-h-12 flex-1 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          placeholder="Scrivi un aggiornamento operativo o cita con @..."
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
