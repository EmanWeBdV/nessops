type HeaderHeroProps = {
  isDayClosed: boolean;
  userName: string;
  onEndDay: () => void;
};

export default function HeaderHero({ isDayClosed, userName, onEndDay }: HeaderHeroProps) {
  return (
    <header className="rounded-[1.75rem] border border-white/[0.07] bg-white/[0.045] p-6 shadow-sm shadow-black/10 backdrop-blur-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Portale operativo
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-[2.45rem]">
            Buongiorno, {userName.split(" ")[0]}.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/56">
            Riprendi il contesto della giornata e gestisci le attività del tuo piano operativo.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white/62 transition hover:bg-white/[0.07] hover:text-white/86">
            Notifiche
          </button>

          <button
            type="button"
            className="rounded-2xl bg-[#97B822] px-5 py-3 text-sm font-black text-[#061521] shadow-sm shadow-[#97B822]/10 transition hover:bg-[#a8cc27]"
            onClick={onEndDay}
          >
            {isDayClosed ? "Giornata chiusa" : "Chiudi la giornata"}
          </button>
        </div>
      </div>
    </header>
  );
}
