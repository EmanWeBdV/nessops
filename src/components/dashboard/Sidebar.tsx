import Image from "next/image";

const menuItems = [
  "Home",
  "Le mie attività",
  "Operations",
  "HR",
  "Documenti",
  "AI Assistant",
];

type SidebarProps = {
  activeItem: string;
  onNavigate: (item: string) => void;
};

function isEnabledItem(item: string) {
  return item === "Home" || item === "Le mie attività" || item === "Operations";
}

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <aside className="sticky top-8 hidden h-[calc(100vh-4rem)] w-60 shrink-0 rounded-[1.5rem] border border-white/[0.06] bg-white/[0.035] p-4 shadow-sm shadow-black/10 backdrop-blur-xl lg:block">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/95 p-1 shadow-sm shadow-black/15">
          <Image
            src="/assets/logos/logo-ness.png"
            alt="Logo Ness"
            width={8000}
            height={4500}
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

      <div className="mt-8 space-y-1.5">
        {menuItems.map((item) => (
          <button
            key={item}
            type="button"
            disabled={!isEnabledItem(item)}
            onClick={() => onNavigate(item)}
            className={`w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition ${
              item === activeItem
                ? "border border-[#0166A4]/25 bg-[#0166A4]/14 text-white font-semibold"
                : isEnabledItem(item)
                ? "text-white/52 hover:bg-white/[0.055] hover:text-white/82"
                : "cursor-not-allowed text-white/24"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/[0.06] bg-black/[0.08] p-4">
        <p className="text-xs font-semibold text-white/35">AI Assistant</p>
        <p className="mt-2 text-xs leading-5 text-white/40">
          Supporto operativo per checklist e casi simili.
        </p>
        <button type="button" className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-xs font-semibold text-white/48 transition hover:text-white/72">
          Apri assistente
        </button>
      </div>
    </aside>
  );
}
