type HeaderHeroProps = {
  isDayClosed: boolean;
  onEndDay: () => void;
};

export default function HeaderHero({ isDayClosed, onEndDay }: HeaderHeroProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.11] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-[#97B822]/20 blur-3xl" />
      <div className="absolute bottom-[-100px] left-[45%] h-72 w-72 rounded-full bg-[#0166A4]/30 blur-3xl" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/75">
            Portale operativo interno
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Buongiorno, Marco.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68 md:text-base">
            Hai attività operative da gestire, una pratica in stand-by e il
            riepilogo della giornata precedente pronto per essere consultato.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/20">
            Notifiche
          </button>

          <button
            className="rounded-2xl bg-gradient-to-r from-[#97B822] to-[#C6E94B] px-5 py-3 text-sm font-black text-[#061521] shadow-xl shadow-[#97B822]/25 transition hover:scale-[1.02]"
            onClick={onEndDay}
          >
            {isDayClosed ? "Giornata chiusa" : "Fine giornata"}
          </button>
        </div>
      </div>
    </header>
  );
}
