import "~/styles/customScrollbar.css";
import { Contact } from "~/components/contact";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { ProjectsList } from "~/components/projectsList";
import { CustomCursor } from "~/components/CustomCursor";
import { CustomContextMenu } from "~/components/customContextMenu";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      {/* <Hero /> */}
      <CustomCursor />
      <ProjectsList />
      {/* <About /> */}
      <Contact />
      <Footer />
      <CustomContextMenu />
    </main>
  );
}
