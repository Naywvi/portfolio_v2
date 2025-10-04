import { SkillTree } from "~/components/SkillTree";
import { Navbar } from "~/components/navbar";
import { CustomCursor } from "~/components/CustomCursor";
import { CustomContextMenu } from "~/components/customContextMenu";
import { Loader } from "~/components/loader"
import '~/styles/skillTree.css';

export default function SkillTreePage() {
  return (
    <div className="skill-tree-container">
      <Loader />
      <Navbar />
      <SkillTree />
      {/* <CustomCursor /> */}
      <CustomContextMenu />
    </div>
  );
}