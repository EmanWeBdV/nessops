type YesterdaySummary = {
  completed: number;
  openCarriedOver: number;
  standby: number;
};

type SummaryCardsProps = {
  summary: {
    assigned: number;
    inProgress: number;
    standby: number;
    workTime: string;
  };
  yesterday: YesterdaySummary;
};

export default function SummaryCards({ summary, yesterday }: SummaryCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.035] p-4 shadow-sm shadow-black/10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Riepilogo ieri</p>
        <h2 className="mt-2 text-xl font-black">{yesterday.completed} completate</h2>
        <p className="mt-1.5 text-xs leading-5 text-white/50">
          {yesterday.openCarriedOver} rimaste aperte, {yesterday.standby} in stand-by.
        </p>
      </div>

      <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-sm shadow-black/10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Attività del giorno</p>
        <h2 className="mt-2 text-xl font-black">{summary.assigned} attività</h2>
        <p className="mt-1.5 text-xs leading-5 text-white/50">
          {summary.inProgress} in corso
          {summary.standby > 0 ? `, ${summary.standby} da verificare` : ""}.
        </p>
      </div>

      <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-sm shadow-black/10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Tempo operativo</p>
        <h2 className="mt-2 text-xl font-black tabular-nums">{summary.workTime}</h2>
        <p className="mt-1.5 text-xs leading-5 text-white/50">
          Registrato oggi.
        </p>
      </div>
    </section>
  );
}
