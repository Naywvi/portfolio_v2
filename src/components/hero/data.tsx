import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

export const title = {
  plainText: "",
  glowText: "nextMotion",
  subTitle: "Curiosité, rigueur, et l’envie de créer autrement.",
  highlight: ["unforgettable"],
};

export const profileCard = {
  title: "Nagib Lakhdari",
  subTitle: "Développeur Full-Stack, ingénieur cyber sécurité",
  body: ` Passionné par le développement, je conçois des applications performantes et accessibles. Je m’intéresse à la sécurité et aux bonnes pratiques pour créer des solutions fiables. Curieux, j’explore sans cesse de nouvelles approches. Et j’aime les oiseaux.`,
  socialUrls: [
    {
      url: "https://www.linkedin.com/in/nagibl/",
      icon: <FaLinkedinIn size={20} />,
    },
    {
      url: "https://github.com/naywvi",
      icon: <IoLogoGithub size={20} />,
    },
  ],
  tooltip: {
    imagePath: "https://media.licdn.com/dms/image/v2/D4E03AQH5OvR7SptLMQ/profile-displayphoto-scale_400_400/B4EZmADSaTIQAg-/0/1758789970574?e=1761782400&v=beta&t=TYSLZPnJduwhHnJ7Wg9bvwDz1QFMqABN5F6uLACOhKA",
    title: "Hey...",
    subTitle: "C'est moi !",
  },
};
