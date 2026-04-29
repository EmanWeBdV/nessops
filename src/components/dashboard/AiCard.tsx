export default function AiCard() {
  const actions = ["Cerca casi simili", "Crea checklist", "Scrivi nota stand-by"];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="absolute right-[-80px] top-[-70px] h-52 w-52 rounded-full bg-[#97B822]/20 blur-3xl" />

      <div className="relative">
        <p className="text-sm text-white/50">NessOps AI</p>
        <h2 className="mt-2 text-2xl font-black">Case Memory</h2>
        <p className="mt-3 text-sm leading-6 text-white/62">
          Cerca casi simili già gestiti in azienda e usa la memoria operativa per
          supportare nuove pratiche.
        </p>

        <div className="mt-5 space-y-2">
          {actions.map((item) => (
            <button
              key={item}
              className="w-full rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 text-left text-sm font-semibold text-white/82 transition hover:border-[#97B822]/40 hover:bg-[#97B822]/15"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}