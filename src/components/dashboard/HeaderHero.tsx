type HeaderHeroProps = {
  isDayClosed: boolean;
  userName: string;
  onEndDay: () => void;
};

export default function HeaderHero({ isDayClosed, userName, onEndDay }: HeaderHeroProps) {
  return (
    <header className="rounded-[2rem] border border-white/12 bg-white/[0.09] p-6 shadow-xl shadow-black/15 backdrop-blur-2xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Portale operativo
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            Buongiorno, {userName.split(" ")[0]}.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/58">
            Riprendi il contesto della giornata e gestisci le attività del tuo piano operativo.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/12 hover:text-white/90">
            Notifiche
          </button>

          <button
            type="button"
            className="rounded-2xl bg-[#97B822] px-5 py-3 text-sm font-black text-[#061521] shadow-lg shadow-[#97B822]/20 transition hover:bg-[#a8cc27] hover:scale-[1.01]"
            onClick={onEndDay}
          >
            {isDayClosed ? "Giornata chiusa" : "Chiudi la giornata"}
          </button>
        </div>
      </div>
    </header>
  );
}
