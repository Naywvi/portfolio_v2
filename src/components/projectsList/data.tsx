import { RiExternalLinkLine } from "react-icons/ri";
import type { TimelineEntry } from "../ui/timeline";

export const sectionHeading2 = {
  title: "",
  subTitle: "",
};

export const timelineData: TimelineEntry[] = [
  {
    title: "Advanced Malware Prototype",
    projectUrls: {
      repo: {
        owner: "MNA0D",
        name: "MNA0D",
        showStarCount: false,
      },
    },
    imageUrl: "/images/panel_mna0d.png",
    description: `Prototype avancé de malware développé en Rust dans un cadre académique. Le projet explore la robustesse des systèmes de sécurité et permet de tester des stratégies de défense, tout en respectant des pratiques de programmation sécurisée.`,
    tech: [
      "Rust",
      "REACT Native",
      "Python",
      "Nodejs",
      "TypeScript",
      "Linux",
      "Windows",
      "C2 Infrastructure",
      "AES Encryption",
      "Rat-Malware",
    ],
    cards: {
      a: {
        title: "Fonctionnalités principales",
        text: `Le prototype intègre un keylogger, une capture d’écran, un module de chiffrement et d’exfiltration de données, ainsi qu’une interface d’administration et une infrastructure de commande et contrôle (C2).`,
      },
      b: {
        title: "Contraintes et sécurité",
        text: `Toutes les communications sont chiffrées et le développement suit des pratiques sécurisées pour éviter les vulnérabilités. Le projet est compatible Windows et Linux et inclut des tests de performance et de robustesse.`,
      },
    },
  },
  {
    title: "Wazuh — Déploiement XDR / SIEM",
    projectUrls: {
      site: {
        url: "https://wazuh.com/",
        icon: <RiExternalLinkLine size={20} />,
      },
    },
    imageUrl: "/images/wazuh.png",
    description: `Mise en place et configuration complète de Wazuh comme solution XDR/SIEM open-source. Le projet couvre le déploiement serveur, l’intégration des agents sur différents environnements (Linux, Windows, macOS), et la mise en place de règles et tableaux de bord adaptés pour la détection et la réponse aux menaces.`,
    tech: [
      "Wazuh",
      "Go",
      "Linux",
      "Windows",
      "macOS",
      "Docker",
      "Elastic / OpenSearch",
      "TLS",
    ],
    cards: {
      a: {
        title: "Architecture et déploiement",
        text: `Installation du manager Wazuh, configuration TLS et intégration des agents sur postes et serveurs. Mise en place des modules essentiels : FIM, détection de vulnérabilités, collecte de logs et réponses actives. L’infrastructure est dimensionnée pour assurer la scalabilité et la sécurité réseau.`,
      },
      b: {
        title: "Analyse et réponse",
        text: `Centralisation des événements dans un dashboard interactif, création de règles personnalisées pour réduire le bruit, et configuration de playbooks de réponse. Le projet permet une corrélation multi-sources et une détection avancée, donnant une véritable visibilité type EDR/XDR sur l’environnement.`,
      },
    },
  },
  {
    title: "SQL Server — Administration & Sécurisation",
    projectUrls: {
      site: {
        url: "https://www.microsoft.com/en-us/sql-server",
        icon: <RiExternalLinkLine size={20} />,
      },
    },
    imageUrl: "/images/ssms.png",
    description: `Mise en place et gestion d’une infrastructure SQL Server, incluant l’installation, la configuration des bases de données et l’optimisation des performances. Le projet couvre également la sécurisation des accès et la mise en place de sauvegardes et restaurations fiables.`,
    tech: [
      "SQL Server",
      "T-SQL",
      "Windows Server",
      "Docker",
      "Backup & Restore",
      "Monitoring",
    ],
    cards: {
      a: {
        title: "Déploiement et optimisation",
        text: `Installation et configuration de SQL Server sur Windows et Docker. Mise en place des bases, gestion des index, optimisation des requêtes et surveillance des performances pour assurer la stabilité et la rapidité du système.`,
      },
      b: {
        title: "Sécurité et continuité",
        text: `Gestion des utilisateurs et rôles avec politiques d’accès strictes, chiffrement des données sensibles et configuration de sauvegardes/restaurations automatisées. Mise en place d’une supervision permettant de prévenir les incidents et de garantir la disponibilité des données.`,
      },
    },
  },
  {
    title: "Wiki Communautaire",
    projectUrls: {
      site: {
        url: "https://wiki.nlakhdari.tech/",
        icon: <RiExternalLinkLine size={20} />,
      },
    },
    imageUrl: "/images/wiki.png",
    description: `Conception et déploiement d’un wiki communautaire public, pensé pour le partage de connaissances (tutos, cours, guides). Mise en place de l’architecture, de la modération et des modèles de contenus afin d’assurer une contribution simple, une lecture claire et une maintenance durable.`,
    tech: [
      "BookStack",
      "Docker",
      "Nginx",
      "MariaDB",
      "TLS (Let’s Encrypt)",
      "Backup & Monitoring"
    ],
    cards: {
      a: {
        title: "Architecture & déploiement",
        text: `Installation conteneurisée (Docker) derrière Nginx avec TLS, base MariaDB, sauvegardes planifiées et supervision. Structure en étagères/livres/pages, navigation claire, recherche optimisée et performances stables pour un accès public.`
      },
      b: {
        title: "Contenu & gouvernance",
        text: `Modèles normalisés (template page), taxonomie par catégories/tags, rôles et permissions, processus de validation/modération et guide contributeur. Suivi des mises à jour et analytics pour prioriser les sujets utiles à la communauté.`
      }
    }
  },
  {
    title: "Nextcloud",
    projectUrls: {
      site: {
        url: "https://nxt.nlakhdari.tech/",
        icon: <RiExternalLinkLine size={20} />,
      },
    },
    imageUrl: "/images/nxt.png",
    description: `Mise en place et administration d’une instance Nextcloud auto-hébergée pour le partage de fichiers, la collaboration et la synchronisation multi-appareils. Configuration orientée sécurité, sauvegardes et intégrations avec des services tiers.`,
    tech: [
      "Nextcloud",
      "Docker",
      "Nginx",
      "MariaDB / PostgreSQL",
      "Redis",
      "TLS (Let’s Encrypt)",
      "Linux"
    ],
    cards: {
      a: {
        title: "Infrastructure & sécurité",
        text: `Déploiement conteneurisé avec Docker, reverse proxy Nginx et base MariaDB/PostgreSQL. Mise en place de TLS via Let’s Encrypt, durcissement des configurations, gestion fine des utilisateurs et intégration LDAP/SSO pour l’authentification.`
      },
      b: {
        title: "Fonctionnalités & administration",
        text: `Activation des modules collaboratifs (calendrier, contacts, talk, éditeur de documents). Synchronisation multi-appareils, quotas, sauvegardes planifiées, monitoring des performances et intégration avec services externes pour étendre l’usage.`
      }
    }
  },
  {
    title: "Proxmox — Virtualisation & Gestion d’Infrastructure",
    projectUrls: {
      site: {
        url: "https://www.proxmox.com/en/proxmox-ve",
        icon: <RiExternalLinkLine size={20} />,
      },
    },
    imageUrl: "/images/promox.jpeg",
    description: `Mise en place et administration d’une infrastructure de virtualisation basée sur Proxmox VE. Gestion de machines virtuelles et conteneurs, configuration réseau avancée, haute disponibilité et sauvegardes centralisées.`,
    tech: [
      "Proxmox VE",
      "Vmware Workstation",
      "LXC",
      "Ceph",
      "ZFS",
      "Linux",
      "Cluster HA"
    ],
    cards: {
      a: {
        title: "Déploiement & configuration",
        text: `Installation de Proxmox VE sur serveurs physiques, configuration du stockage (ZFS, Ceph), mise en place du clustering et gestion centralisée des ressources. Paramétrage réseau (bridges, VLANs) pour supporter différents environnements isolés.`
      },
      b: {
        title: "Administration & supervision",
        text: `Gestion quotidienne des VMs et conteneurs, snapshots et sauvegardes planifiées, restauration rapide en cas d’incident. Monitoring intégré et tableaux de bord pour suivre performances, disponibilité et état du cluster.`
      }
    }
  },
  {
    title: "pfSense — Firewall & Sécurité Réseau",
    projectUrls: {
      site: {
        url: "https://www.pfsense.org/",
        icon: <RiExternalLinkLine size={20} />,
      },
    },
    imageUrl: "/images/pfsense-logo.jpg",
    description: `Mise en place et administration d’une infrastructure réseau sécurisée avec pfSense. Configuration de firewall, routage, VPN et services avancés pour protéger et segmenter un environnement multi-sites.`,
    tech: [
      "pfSense",
      "FreeBSD",
      "OpenVPN / WireGuard",
      "HAProxy",
      "IDS/IPS (Snort)",
      "DNS Resolver",
      "DHCP"
    ],
    cards: {
      a: {
        title: "Déploiement & configuration réseau",
        text: `Installation de pfSense sur matériel dédié/VM, paramétrage des interfaces réseau, règles firewall et NAT, VLANs et redirections de ports. Mise en place d’un routage sécurisé et d’un accès distant via VPN (OpenVPN/WireGuard).`
      },
      b: {
        title: "Sécurité & supervision",
        text: `Activation d’IDS/IPS (Snort), configuration de HAProxy pour équilibrage de charge, DNS Resolver/DHCP centralisés. Supervision des logs, alertes en temps réel et sauvegardes pour assurer disponibilité et protection continue.`
      }
    }
  }

];
