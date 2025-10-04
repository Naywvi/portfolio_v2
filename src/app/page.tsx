import { Contact } from "~/components/contact";
import { Footer } from "~/components/footer";
import { Hero } from "~/components/hero";
import { Navbar } from "~/components/navbar";
import { Projects } from "~/components/projects";
import { CustomCursor } from "~/components/CustomCursor";
import { About } from "~/components/about";
import { CustomContextMenu } from "~/components/customContextMenu";
import { Loader } from "~/components/loader"

export default function HomePage() {
  return (
    <main className="relative">
      <Loader />
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <CustomCursor enabled={true} />
      <CustomContextMenu />
    </main>
  );
}
