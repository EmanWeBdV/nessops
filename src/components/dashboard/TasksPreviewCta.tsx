type TasksPreviewCtaProps = {
  openCount: number;
  standbyCount: number;
  onOpenTasks: () => void;
};

export default function TasksPreviewCta({
  openCount,
  standbyCount,
  onOpenTasks,
}: TasksPreviewCtaProps) {
  return (
    <section className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] p-5 shadow-sm shadow-black/10 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/36">
            Le mie attività
          </p>
          <h2 className="mt-2 text-xl font-black">
            Hai altre {openCount} attività da gestire
          </h2>
          <p className="mt-1 text-sm leading-6 text-white/50">
            {standbyCount > 0
              ? `${standbyCount} sono in stand-by e richiedono verifica.`
              : "Apri la scheda dedicata per vedere lista completa, filtri e stati."}
          </p>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-[#0166A4]/25 bg-[#0166A4]/14 px-5 py-3 text-sm font-bold text-white/78 transition hover:bg-[#0166A4]/22 hover:text-white"
          onClick={onOpenTasks}
        >
          Vai alle attività
        </button>
      </div>
    </section>
  );
}
