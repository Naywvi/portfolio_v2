import { RiExternalLinkLine } from "react-icons/ri";
import type { TimelineEntry } from "../ui/timeline";

export const sectionHeading = {
  title: "Sur quoi je travaille",
  subTitle: "Plongeons dans ce que j’ai fait.",
};

export const timelineData: TimelineEntry[] = [
 {
  title: "Audit parité",
  projectUrls: {
    site: {
        url: "https://outil.paritepro.fr",
        icon: <RiExternalLinkLine size={20} />,
      },
    // repo: {
    //   owner: "naywvi",
    //   name: "parite_360",
    //   showStarCount: false,
    // },
  },
  imageUrl: "/images/parite3601.png",
  description: `Outil d’audit de parité hommes-femmes destiné aux experts-comptables. Il facilite les contre-audits, génère des synthèses et rapports clairs, et intègre divers outils comme une matrice SWOT, un benchmark concurrentiel et des retours d’entretiens automatisés. Ces fonctionnalités ne sont que quelques exemples des nombreuses données exploitables offertes par la solution.`,
  tech: [
    "TypeScript",
    "Next.js",
    "TailwindCSS",
    "shadcn/ui",
    "Docker",
    "MongoDB",
  ],
  cards: {
    a: {
      title: "Un suivi fiable et automatisé",
      text: `Grâce à son approche quantitative et qualitative, l’application offre une vision précise de la parité au sein des entreprises et permet d’en suivre les évolutions dans le temps.`,
    },
    b: {
      title: "Analyses avancées et comparatives",
      text: `L’outil propose une matrice SWOT, un benchmark concurrentiel et des retours d’entretiens automatisés, afin de croiser les données internes avec celles du secteur et fournir une vision stratégique complète.`,
    },
  },
},
{
  title: "Sandbox d'Analyse de Malware",
  projectUrls: {
    repo: {
      owner: "Lisna-Audit",
      name: "Agent-allowing-sharing",
      showStarCount: false,
    },
  },
  imageUrl: "/images/lisna.png",
  description: `Plateforme complète d’analyse comportementale de malware développée en Go et déployée dans un environnement virtualisé. Elle permet l’exécution sécurisée d’échantillons, le monitoring avancé via un agent cross-platform, et la génération de rapports détaillés avec export multi-format (PDF, JSON, STIX, YARA).`,
  tech: [
    "Go",
    "TypeScript",
    "Next.js",
    "TailwindCSS",
    "Docker",
    "MongoDB",
    "QEMU/KVM",
  ],
  cards: {
    a: {
      title: "Agent de monitoring avancé",
      text: `Développé en Go, cet agent cross-platform assure la surveillance en profondeur des activités systèmes, fichiers, processus, registres, services et communications réseau sur Windows, Linux et macOS. Il détecte automatiquement les anomalies et fournit des logs structurés pour analyse.`,
    },
    b: {
      title: "Visualisation et reporting",
      text: `Les données collectées sont centralisées dans une interface web interactive : dashboard, timeline, arbre de processus, cartographie réseau. La plateforme génère des rapports détaillés et exportables dans des formats standards pour la threat intelligence.`,
    },
  },
}
];
