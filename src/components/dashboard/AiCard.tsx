export default function AiCard() {
  return (
    <div className="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.026] p-5 shadow-sm shadow-black/8 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
        Assistente operativo
      </p>
      <h2 className="mt-2 text-base font-black text-white/82">AI Assistant</h2>
      <p className="mt-2 text-sm leading-6 text-white/42">
        Cerca casi simili, genera checklist e supporta le attività operative del
        piano giornaliero.
      </p>

      <button
        type="button"
        className="mt-5 rounded-2xl border border-[#0166A4]/22 bg-[#0166A4]/[0.08] px-4 py-2.5 text-sm font-semibold text-white/62 transition hover:bg-[#0166A4]/14 hover:text-white/84"
      >
        Apri assistente
      </button>
    </div>
  );
}
