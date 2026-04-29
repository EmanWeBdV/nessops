const menuItems = [
  "Home",
  "Le mie attività",
  "Operations",
  "HR",
  "Documenti",
  "AI Assistant",
];

export default function Sidebar() {
  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 rounded-[2rem] border border-white/15 bg-white/[0.10] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:block">
      <div className="flex items-center gap-4">
<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border border-white/25 bg-white/95 p-1 shadow-xl shadow-black/20">
  <img
    src="/assets/logos/logo-ness.png"
    alt="Logo Ness"
    className="h-full w-full scale-[1.65] object-contain"
  />
</div>

        <div>
          <p className="text-xl font-black leading-tight tracking-tight">
            NessOps
          </p>
          <p className="text-xs text-white/55">Ness Operations System</p>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={item}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              index === 0
                ? "bg-white text-[#061521] shadow-xl shadow-black/20"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-white/15 bg-white/[0.08] p-4 shadow-xl shadow-black/10">
        <div className="inline-flex rounded-full bg-[#97B822]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#D9F07C]">
          AI
        </div>

        <p className="mt-4 text-base font-bold">NessOps Assistant</p>
        <p className="mt-2 text-sm leading-6 text-white/62">
          Cerca casi simili, genera checklist e supporta le attività operative.
        </p>

        <button className="mt-5 rounded-2xl bg-[#97B822] px-4 py-2.5 text-sm font-black text-[#061521] shadow-lg shadow-[#97B822]/20 transition hover:scale-[1.02]">
          Apri AI
        </button>
      </div>
    </aside>
  );
}