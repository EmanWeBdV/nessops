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
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 rounded-[2rem] border border-white/8 bg-white/[0.05] p-5 shadow-lg shadow-black/15 backdrop-blur-2xl lg:block">
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
                ? "border border-[#0166A4]/50 bg-[#0166A4]/25 text-white font-semibold"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold text-white/35">AI Assistant</p>
        <p className="mt-2 text-xs leading-5 text-white/40">
          Supporto operativo per checklist e casi simili.
        </p>
        <button type="button" className="mt-3 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white/50 transition hover:text-white/70">
          Apri assistente
        </button>
      </div>
    </aside>
  );
}