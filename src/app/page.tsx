import Sidebar from "../components/dashboard/Sidebar";
import HeaderHero from "../components/dashboard/HeaderHero";
import SummaryCards from "../components/dashboard/SummaryCards";
import ActiveTaskCard from "../components/dashboard/ActiveTaskCard";
import AiCard from "../components/dashboard/AiCard";
import TasksList from "../components/dashboard/TasksList";
import TopBar from "../components/dashboard/TopBar";


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061521] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(1,102,164,0.42),_transparent_32%),radial-gradient(circle_at_85%_20%,_rgba(151,184,34,0.22),_transparent_28%),radial-gradient(circle_at_50%_100%,_rgba(1,102,164,0.22),_transparent_35%)]" />
      <div className="absolute left-[-160px] top-[-120px] h-[430px] w-[430px] rounded-full bg-[#0166A4]/30 blur-3xl" />
      <div className="absolute right-[-160px] top-[120px] h-[360px] w-[360px] rounded-full bg-[#97B822]/20 blur-3xl" />
      <div className="absolute bottom-[-220px] left-[35%] h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] gap-6 p-6">
        <Sidebar />

        <section className="flex-1 space-y-6">
          <TopBar />
          <HeaderHero />
          <SummaryCards />

          <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <ActiveTaskCard />
            <AiCard />
          </section>

          <TasksList />
        </section>
      </div>
    </main>
  );
}