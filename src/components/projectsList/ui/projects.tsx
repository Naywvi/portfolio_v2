import { Timeline } from "~/components/ui/timeline";
import { timelineData } from "../data";
import { ProjectsHero } from "./ProjectsHero";
export function ProjectsList() {
  return (
    <section className="relative w-full bg-gradient-to-b from-black to-[#141414]">
      <div className="px-4 md:container">
        <ProjectsHero />
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
