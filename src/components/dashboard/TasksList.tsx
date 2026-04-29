import { tasks } from "../../data/mockDashboard";
import StatusBadge from "./StatusBadge";


export default function TasksList() {
  return (
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

                <div className="mt-1 text-sm text-white/50">
                      <StatusBadge
    label={task.status}
    variant={
      task.status === "In corso"
        ? "progress"
        : task.status === "Stand-by"
          ? "standby"
          : task.status === "Completata"
            ? "completed"
            : "todo"
    }
  />

  <StatusBadge
    label={`Priorità ${task.priority}`}
    variant={
      task.priority === "Alta"
        ? "high"
        : task.priority === "Media"
          ? "medium"
          : "low"
    }
  />
                </div>
              </div>
            </div>

            <button className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-[#061521] shadow-lg transition group-hover:scale-[1.02]">
              {task.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}