import "~/styles/customScrollbar.css";
import { Contact } from "~/components/contact";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { ProjectsList } from "~/components/projectsList";
import { CustomCursor } from "~/components/CustomCursor";
import { CustomContextMenu } from "~/components/customContextMenu";
import { Loader } from "~/components/loader"

export default function HomePage() {
  return (
    <main className="relative">
      <Loader />
      <Navbar />
      {/* <Hero /> */}
      <CustomCursor enabled={true} />
      <ProjectsList />
      {/* <About /> */}
      <Contact />
      <Footer />
      <CustomContextMenu />
    </main>
  );
}
