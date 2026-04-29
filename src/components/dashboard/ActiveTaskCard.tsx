export default function ActiveTaskCard() {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm text-white/50">Attività attiva</p>
          <h2 className="mt-2 text-2xl font-black">
            Preparare relazione impianto FV 1MW
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
            Bozza relazione tecnica con strutture fisse, vincoli e note operative
            collegate alla pratica.
          </p>
        </div>

        <div className="rounded-2xl border border-[#0166A4]/30 bg-[#0166A4]/25 px-4 py-2 text-sm font-bold text-blue-100">
          In corso
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
          <p className="text-xs text-white/45">Tempo lavoro</p>
          <p className="mt-1 text-xl font-black">1h 20m</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
          <p className="text-xs text-white/45">Priorità</p>
          <p className="mt-1 text-xl font-black">Media</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
          <p className="text-xs text-white/45">Codice</p>
          <p className="mt-1 text-xl font-black">OPS-1025</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black text-[#061521] shadow-lg shadow-amber-300/20 transition hover:scale-[1.02]">
          Metti in stand-by
        </button>

        <button className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#061521] shadow-lg transition hover:scale-[1.02]">
          Termina attività
        </button>

        <button className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/20">
          Apri dettagli
        </button>
      </div>
    </div>
  );
}