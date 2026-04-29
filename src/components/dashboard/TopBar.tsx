export default function TopBar() {
  return (
    <div className="flex items-center justify-between rounded-[2rem] border border-white/15 bg-white/[0.10] p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-white/95 p-1 shadow-lg shadow-black/20">
          <img
            src="/assets/logos/logo-ness.png"
            alt="Logo Ness"
            className="h-full w-full scale-[1.65] object-contain"
          />
        </div>

        <div>
          <p className="text-lg font-black leading-tight">NessOps</p>
          <p className="text-xs text-white/55">Ness Operations System</p>
        </div>
      </div>

      <button className="rounded-2xl bg-gradient-to-r from-[#97B822] to-[#C6E94B] px-4 py-2.5 text-sm font-black text-[#061521] shadow-xl shadow-[#97B822]/25">
        Menu
      </button>
    </div>
  );
}