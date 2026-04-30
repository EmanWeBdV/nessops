export default function AiCard() {
  return (
    <div className="rounded-[2rem] border border-white/8 bg-white/[0.04] p-5 shadow-lg shadow-black/8 backdrop-blur-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
        Assistente operativo
      </p>
      <h2 className="mt-2 text-lg font-black">AI Assistant</h2>
      <p className="mt-2 text-sm leading-6 text-white/45">
        Cerca casi simili, genera checklist e supporta le attività operative del
        piano giornaliero.
      </p>

      <button
        type="button"
        className="mt-5 rounded-2xl border border-[#0166A4]/35 bg-[#0166A4]/[0.12] px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-[#0166A4]/25 hover:text-white/90"
      >
        Apri assistente
      </button>
    </div>
  );
}
