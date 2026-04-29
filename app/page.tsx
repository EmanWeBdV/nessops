export default function Home() {
  const tasks = [
    {
      title: "Verifica documenti Cliente Alfa",
      code: "OPS-1024",
      status: "Da fare",
      priority: "Alta",
      action: "Inizia",
      accent: "bg-[#97B822]",
    },
    {
      title: "Preparare relazione impianto FV 1MW",
      code: "OPS-1025",
      status: "In corso",
      priority: "Media",
      action: "Apri",
      accent: "bg-[#0166A4]",
    },
    {
      title: "Contatto cliente Beta",
      code: "OPS-1026",
      status: "Stand-by",
      priority: "Media",
      action: "Riprendi",
      accent: "bg-amber-400",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061521] text-white">
      {/* Background premium Ness */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(1,102,164,0.42),_transparent_32%),radial-gradient(circle_at_85%_20%,_rgba(151,184,34,0.22),_transparent_28%),radial-gradient(circle_at_50%_100%,_rgba(1,102,164,0.22),_transparent_35%)]" />
      <div className="absolute left-[-160px] top-[-120px] h-[430px] w-[430px] rounded-full bg-[#0166A4]/30 blur-3xl" />
      <div className="absolute right-[-160px] top-[120px] h-[360px] w-[360px] rounded-full bg-[#97B822]/20 blur-3xl" />
      <div className="absolute bottom-[-220px] left-[35%] h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl gap-6 p-6">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-white/15 bg-white/[0.10] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:block">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/25 bg-white/95 p-2 shadow-xl shadow-black/20">
              <img
  src="/assets/logos/logo-ness.png"
  alt="Logo Ness"
  className="h-full w-full object-contain"
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
            {[
              "Home",
              "Le mie attività",
              "Operations",
              "HR",
              "Documenti",
              "AI Assistant",
            ].map((item, index) => (
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

        {/* Main content */}
        <section className="flex-1 space-y-6">
          {/* Header */}
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

                <button className="rounded-2xl bg-[#97B822] px-4 py-3 text-sm font-black text-[#061521] shadow-xl shadow-[#97B822]/25 transition hover:scale-[1.02]">
                  Fine giornata
                </button>
              </div>
            </div>
          </header>

          {/* Summary cards */}
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-5 shadow-xl shadow-black/20 backdrop-blur-2xl">
              <p className="text-sm text-white/50">Riepilogo ieri</p>
              <h2 className="mt-3 text-3xl font-black">5 completate</h2>
              <p className="mt-2 text-sm leading-6 text-white/62">
                2 attività rimaste aperte, 1 ancora in stand-by.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-5 shadow-xl shadow-black/20 backdrop-blur-2xl">
              <p className="text-sm text-white/50">Stato oggi</p>
              <h2 className="mt-3 text-3xl font-black">3 assegnate</h2>
              <p className="mt-2 text-sm leading-6 text-white/62">
                1 attività in corso e 1 attività in attesa cliente.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#97B822]/25 bg-[#97B822]/15 p-5 shadow-xl shadow-[#97B822]/10 backdrop-blur-2xl">
              <p className="text-sm text-[#E6F6A8]/80">Tempo operativo</p>
              <h2 className="mt-3 text-3xl font-black">2h 35m</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Tempo effettivo registrato nella giornata corrente.
              </p>
            </div>
          </section>

          {/* Active task + AI card */}
          <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm text-white/50">Attività attiva</p>
                  <h2 className="mt-2 text-2xl font-black">
                    Preparare relazione impianto FV 1MW
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                    Bozza relazione tecnica con strutture fisse, vincoli e note
                    operative collegate alla pratica.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#0166A4]/30 bg-[#0166A4]/25 px-4 py-2 text-sm font-bold text-blue-100">
                  In corso
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                  <p className="text-xs text-white/45">Tempo lavoro</p>
                  <p className="mt-1 text-xl font-black">1h 20m</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                  <p className="text-xs text-white/45">Priorità</p>
                  <p className="mt-1 text-xl font-black">Media</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                  <p className="text-xs text-white/45">Codice</p>
                  <p className="mt-1 text-xl font-black">OPS-1025</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-black text-[#061521] shadow-lg shadow-amber-300/20 transition hover:scale-[1.02]">
                  Metti in stand-by
                </button>

                <button className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#061521] shadow-lg transition hover:scale-[1.02]">
                  Termina attività
                </button>

                <button className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/20">
                  Apri dettagli
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <div className="absolute right-[-80px] top-[-70px] h-52 w-52 rounded-full bg-[#97B822]/20 blur-3xl" />

              <div className="relative">
                <p className="text-sm text-white/50">NessOps AI</p>
                <h2 className="mt-2 text-2xl font-black">Case Memory</h2>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Cerca casi simili già gestiti in azienda e usa la memoria operativa
                  per supportare nuove pratiche.
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    "Cerca casi simili",
                    "Crea checklist",
                    "Scrivi nota stand-by",
                  ].map((item) => (
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
          </section>

          {/* Tasks */}
          <section className="rounded-[2rem] border border-white/15 bg-white/[0.10] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Le mie attività di oggi</h2>
                <p className="mt-1 text-sm text-white/55">
                  Una vista pulita delle attività assegnate alla tua giornata.
                </p>
              </div>

              <button className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/20">
                Vedi tutte
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.code}
                  className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.07] p-4 transition hover:translate-y-[-2px] hover:border-white/20 hover:bg-white/[0.12] md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-1.5 rounded-full ${task.accent}`} />

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">{task.title}</h3>
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/55">
                          {task.code}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-white/50">
                        Stato: {task.status} · Priorità: {task.priority}
                      </p>
                    </div>
                  </div>

                  <button className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-[#061521] shadow-lg transition group-hover:scale-[1.02]">
                    {task.action}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}