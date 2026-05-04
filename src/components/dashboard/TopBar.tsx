import Image from "next/image";

type TopBarProps = {
  activeItem: string;
  onNavigate: (item: string) => void;
};

export default function TopBar({ activeItem, onNavigate }: TopBarProps) {
  const nextItem =
    activeItem === "Home"
      ? "Le mie attività"
      : activeItem === "Le mie attività"
      ? "Operations"
      : "Home";

  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/[0.08] bg-white/[0.045] p-4 shadow-sm shadow-black/10 backdrop-blur-xl lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/95 p-1 shadow-sm shadow-black/15">
          <Image
            src="/assets/logos/logo-ness.png"
            alt="Logo Ness"
            width={8000}
            height={4500}
            className="h-full w-full scale-[1.65] object-contain"
          />
        </div>

        <div>
          <p className="text-lg font-black leading-tight">NessOps</p>
          <p className="text-xs text-white/55">Ness Operations System</p>
        </div>
      </div>

      <button
        type="button"
        className="rounded-2xl border border-[#0166A4]/25 bg-[#0166A4]/14 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-[#0166A4]/22 hover:text-white"
        onClick={() => onNavigate(nextItem)}
      >
        {nextItem}
      </button>
    </div>
  );
}
