export default function SummaryCards() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-5 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <p className="text-sm text-white/50">Riepilogo ieri</p>
        <h2 className="mt-3 text-3xl font-black">5 completate</h2>
        <p className="mt-2 text-sm leading-6 text-white/62">
          2 attività rimaste aperte, 1 ancora in stand-by.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-5 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <p className="text-sm text-white/50">Stato oggi</p>
        <h2 className="mt-3 text-3xl font-black">3 assegnate</h2>
        <p className="mt-2 text-sm leading-6 text-white/62">
          1 attività in corso e 1 attività in attesa cliente.
        </p>
      </div>

      <div className="rounded-[2rem] border border-[#97B822]/25 bg-[#97B822]/15 p-5 shadow-xl shadow-[#97B822]/10 backdrop-blur-2xl">
        <p className="text-sm text-[#E6F6A8]/80">Tempo operativo</p>
        <h2 className="mt-3 text-3xl font-black">2h 35m</h2>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Tempo effettivo registrato nella giornata corrente.
        </p>
      </div>
    </section>
  );
}