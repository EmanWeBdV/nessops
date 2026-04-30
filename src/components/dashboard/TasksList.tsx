import type { Task, TaskStatus } from "../../types/task";
import StatusBadge from "./StatusBadge";

type TasksListProps = {
  tasks: Task[];
  onTaskAction: (taskCode: string) => void;
};

function getStatusVariant(status: TaskStatus) {
  if (status === "In corso") {
    return "progress";
  }

  if (status === "In stand-by") {
    return "standby";
  }

  if (status === "Completata") {
    return "completed";
  }

  return "todo";
}

export default function TasksList({ tasks, onTaskAction }: TasksListProps) {
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

                <div className="mt-1 flex flex-wrap gap-2 text-sm text-white/50">
                  <StatusBadge
                    label={task.status}
                    variant={getStatusVariant(task.status)}
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

            <button
              className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-[#061521] shadow-lg transition enabled:group-hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white/40"
              disabled={task.status === "Completata"}
              onClick={() => onTaskAction(task.code)}
            >
              {task.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
