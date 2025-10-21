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
    description: `Déploiement et administration d'une plateforme Wazuh XDR/SIEM en architecture distribuée master/slave pour la supervision de sécurité centralisée. Infrastructure dimensionnée pour gérer 100+ endpoints avec collecte temps réel, corrélation multi-sources et réponse automatisée aux incidents. Mise en place d'un système d'alertes multicouches (email, Slack) couvrant les tentatives d'intrusion, anomalies comportementales, et conformité réglementaire (PCI-DSS, RGPD).`,

    tech: [
      "Wazuh Manager",
      "Wazuh Agents",
      "Go",
      "Python",
      "Linux",
      "Windows",
      "macOS",
      "Docker",
      "Elastic Stack",
      "OpenSearch",
      "TLS/mTLS",
      "API REST"
    ],

    cards: {
      a: {
        title: "Architecture Master/Slave & Intégration",
        text: `Déploiement d'une architecture Wazuh en haute disponibilité : manager master et slave(s) avec réplication automatique des règles et configurations. Installation et durcissement TLS/mTLS des agents. Configuration avancée des modules : FIM avec exclusions intelligentes, vulnerability detection avec base CVE actualisée, SCA pour audits de conformité CIS, et active response pour blocage automatique des IP malveillantes. Intégration VirusTotal et MISP pour l'enrichissement des IOCs.`
      },
      b: {
        title: "Alertes, Corrélation & SOC",
        text: `Développement de 50+ règles personnalisées pour réduire les faux positifs et détecter les attaques avancées (lateral movement, privilege escalation, data exfiltration). Mise en place d'un système d'alerting granulaire avec escalade automatique selon la criticité (INFO, WARNING, CRITICAL). Création de dashboards Kibana/OpenSearch pour l'analyse forensique et le reporting exécutif. Configuration de playbooks de réponse automatisée : isolation de machines compromises, kill process malveillants, blocage firewall temps réel.`
      }
    }
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
  // {
  //   title: "Wiki Communautaire",
  //   projectUrls: {
  //     site: {
  //       url: "https://wiki.nlakhdari.tech/",
  //       icon: <RiExternalLinkLine size={20} />,
  //     },
  //   },
  //   imageUrl: "/images/wiki.png",
  //   description: `Conception et déploiement d’un wiki communautaire public, pensé pour le partage de connaissances (tutos, cours, guides). Mise en place de l’architecture, de la modération et des modèles de contenus afin d’assurer une contribution simple, une lecture claire et une maintenance durable.`,
  //   tech: [
  //     "BookStack",
  //     "Docker",
  //     "Nginx",
  //     "MariaDB",
  //     "TLS (Let’s Encrypt)",
  //     "Backup & Monitoring"
  //   ],
  //   cards: {
  //     a: {
  //       title: "Architecture & déploiement",
  //       text: `Installation conteneurisée (Docker) derrière Nginx avec TLS, base MariaDB, sauvegardes planifiées et supervision. Structure en étagères/livres/pages, navigation claire, recherche optimisée et performances stables pour un accès public.`
  //     },
  //     b: {
  //       title: "Contenu & gouvernance",
  //       text: `Modèles normalisés (template page), taxonomie par catégories/tags, rôles et permissions, processus de validation/modération et guide contributeur. Suivi des mises à jour et analytics pour prioriser les sujets utiles à la communauté.`
  //     }
  //   }
  // },
  // {
  //   title: "Nextcloud",
  //   projectUrls: {
  //     site: {
  //       url: "https://nxt.nlakhdari.tech/",
  //       icon: <RiExternalLinkLine size={20} />,
  //     },
  //   },
  //   imageUrl: "/images/nxt.png",
  //   description: `Mise en place et administration d’une instance Nextcloud auto-hébergée pour le partage de fichiers, la collaboration et la synchronisation multi-appareils. Configuration orientée sécurité, sauvegardes et intégrations avec des services tiers.`,
  //   tech: [
  //     "Nextcloud",
  //     "Docker",
  //     "Nginx",
  //     "MariaDB / PostgreSQL",
  //     "Redis",
  //     "TLS (Let’s Encrypt)",
  //     "Linux"
  //   ],
  //   cards: {
  //     a: {
  //       title: "Infrastructure & sécurité",
  //       text: `Déploiement conteneurisé avec Docker, reverse proxy Nginx et base MariaDB/PostgreSQL. Mise en place de TLS via Let’s Encrypt, durcissement des configurations, gestion fine des utilisateurs et intégration LDAP/SSO pour l’authentification.`
  //     },
  //     b: {
  //       title: "Fonctionnalités & administration",
  //       text: `Activation des modules collaboratifs (calendrier, contacts, talk, éditeur de documents). Synchronisation multi-appareils, quotas, sauvegardes planifiées, monitoring des performances et intégration avec services externes pour étendre l’usage.`
  //     }
  //   }
  // },
  {
    title: "Proxmox — Virtualisation & Gestion d’Infrastructure",
    projectUrls: {
      site: {
        url: "https://www.proxmox.com/en/proxmox-ve",
        icon: <RiExternalLinkLine size={20} />,
      },
    },
    imageUrl: "/images/proxmox.png",
    description: `Administration d'une infrastructure de virtualisation Proxmox VE orientée vers l'agilité et l'efficacité opérationnelle. Déploiement rapide d'environnements de développement, test et production via templates standardisés et automatisation. Gestion centralisée permettant un provisioning de machines virtuelles en quelques minutes avec une configuration réseau simplifiée et fiable.`,

    tech: [
      "Proxmox VE",
      "VMware Workstation",
      "LXC",
      "QEMU/KVM",
      "ZFS",
      "Linux",
      "Cloud-Init",
      "Bash Scripting"
    ],

    cards: {
      a: {
        title: "Déploiement & Standardisation",
        text: `Création et maintenance d'une bibliothèque de templates système (Ubuntu Server, Debian, Rocky Linux) intégrant Cloud-Init pour un provisioning automatisé. Configuration réseau optimisée avec bridges et VLANs permettant l'isolation des environnements sans surcharge administrative. Clonage rapide de VMs pour la réplication d'architectures validées. Utilisation intensive de conteneurs LXC pour les services légers offrant des performances natives avec un overhead minimal.`
      },
      b: {
        title: "Administration & Continuité",
        text: `Gestion opérationnelle de 30+ machines virtuelles et conteneurs couvrant les environnements de développement, staging et production. Stratégie de snapshots systématiques avant modifications critiques pour assurer une restauration rapide en cas d'incident. Backups automatisés avec politique de rétention de 7 jours. Monitoring des ressources système via interface web et CLI pour optimisation des performances et allocation des capacités.`
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
    imageUrl: "/images/pfsense.png",
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
  },
  {
    title: "Native Memory Allocator — Kernel Development",
    projectUrls: {
      repo: {
        owner: "naywvi",
        name: "native_allocator_rust",
        showStarCount: false,
      }
    },
    imageUrl: "/images/rust_allocator.png",
    description: `Développement d'un allocateur mémoire natif en Rust pur, sans dépendances externes, dans le cadre d'un projet de kernel custom. Implémentation bas niveau des primitives de gestion mémoire (allocation, désallocation, fragmentation) avec un focus sur la performance et la sécurité type-safe offerte par Rust.`,
    tech: [
      "Rust",
      "Systems Programming",
      "Memory Management",
      "Kernel Development",
      "No-std",
      "Unsafe Rust",
      "x86_64 Architecture"
    ],
    cards: {
      a: {
        title: "Architecture & Primitives",
        text: `Conception d'un allocateur from-scratch sans utiliser std ni allocator externe. Implémentation des traits Allocator et GlobalAlloc pour gérer les allocations heap. Gestion manuelle de la mémoire physique et virtuelle, stratégies d'allocation (first-fit, best-fit) pour minimiser la fragmentation. Code 100% no-std compatible avec un environnement bare-metal.`
      },
      b: {
        title: "Optimisation & Sécurité",
        text: `Utilisation stratégique d'unsafe Rust pour manipuler les pointeurs raw tout en maintenant des garanties de sécurité via des abstractions safe. Gestion des edge cases (out of memory, double-free) avec panic handlers customisés. Benchmarks de performance pour comparer avec les allocateurs standards. Foundation pour un kernel custom avec allocations déterministes et prévisibles.`
      }
    }
  },
  {
    title: "TikTak — Automatisation Vidéo",
    projectUrls: {
    },
    imageUrl: "/images/tiktak.png",
    description: `Système d'automatisation complet pour la création et publication de contenu vidéo sur TikTok. Pipeline entièrement automatisé : génération de concepts viraux via IA, vérification anti-duplicate, enrichissement contextuel avec sources, génération vidéo et publication programmée sur plusieurs comptes. Infrastructure scalable permettant une production continue sans intervention manuelle.`,
    tech: [
      "TypeScript",
      "Node.js",
      "MongoDB",
      "OpenAI API / Claude API",
      "Playwright",
      "FFmpeg",
      "Proxmox VE",
      "Docker",
      "Cron Jobs"
    ],
    cards: {
      a: {
        title: "Pipeline IA & Génération",
        text: `Architecture en plusieurs étapes : (1) LLM génère des titres de vidéos optimisés pour l'engagement, (2) Système de vérification anti-duplicate via recherche MongoDB sur l'historique, (3) Enrichissement contextuel automatique avec fact-checking et agrégation de sources via IA, (4) Génération vidéo programmatique avec montage, voix-off synthétique et sous-titres automatiques via FFmpeg. Chaque étape est validée et tracée pour assurer la qualité du contenu.`
      },
      b: {
        title: "Automatisation & Déploiement",
        text: `Publication multi-comptes orchestrée via Playwright pour simuler le comportement utilisateur authentique. Scheduling configurable (fréquence, horaires optimaux) avec distribution équilibrée entre comptes pour éviter les patterns suspects. Infrastructure hébergée sur VMs Proxmox avec isolation par conteneur Docker. Monitoring des métriques (vues, engagement) stockées dans MongoDB pour optimisation continue du pipeline. Système entièrement autonome capable de produire et publier 100+ vidéos/semaine sans intervention.`
      }
    }
  },
  {
    title: "nlttm — VM Configuration Manager",
    projectUrls: {
      repo: {
        owner: "naywvi",
        name: "nlttm-package",
        showStarCount: false,
      }
    },
    imageUrl: "/images/nlttm.png",
    description: `Package Debian développé en Go pour l'automatisation de la configuration initiale de machines virtuelles. Outil permettant le bootstrapping rapide d'environnements via des presets prédéfinis, déployant automatiquement les bibliothèques, configurations et outils essentiels. Solution centralisée pour standardiser le provisioning de VMs et réduire le temps de setup de plusieurs heures à quelques minutes.`,
    tech: [
      "Go",
      "Debian Packaging",
      "APT Repository",
      "Bash Scripting",
      "YAML",
      "Linux System Administration",
      "CI/CD"
    ],
    cards: {
      a: {
        title: "Architecture & Packaging",
        text: `Développement en Go avec compilation cross-platform pour générer un package .deb distributable. Implémentation du système de presets via fichiers YAML définissant les dépendances, configurations système et scripts post-installation. Gestion des hooks APT (postinst, prerm) pour orchestrer le déploiement automatique. Intégration dans un dépôt APT privé permettant l'installation standard via apt install nlttm. Support de multiples profils (dev, staging, prod) avec configurations adaptées à chaque environnement.`
      },
      b: {
        title: "Automatisation & Workflow",
        text: `Utilisation quotidienne pour bootstrapper rapidement de nouvelles VMs Proxmox avec configuration idempotente. Presets incluant stack complète (Docker, monitoring agents, outils CLI, configurations SSH, firewall rules). Commande unique post-installation pour transformer une VM vierge en environnement opérationnel. Gain de temps significatif : passage de 2-3h de configuration manuelle à 5 minutes d'installation automatisée. Versionning des presets pour assurer la cohérence entre environnements et faciliter les rollbacks.`
      }
    }
  },
  {
    title: "Teensy MNQ — Red Team Payload Framework",
    projectUrls: {
      repo: {
        owner: "naywvi",
        name: "teensy_mnq",
        showStarCount: true,
      }
    },
    imageUrl: "/images/teensy_mnq.png",
    description: `Framework de pentesting physique basé sur Teensy pour démonstration d'attaques post-exploitation lors d'audits de sécurité. Payload automatisé simulant un scénario d'attaque complet : création de comptes privilégiés, contournement des défenses Windows, établissement de persistance et exfiltration de données. Outil éducatif et de recherche pour sensibiliser aux risques liés aux périphériques USB non contrôlés (USB Drop Attacks).`,
    tech: [
      "Teensy 4.1",
      "Arduino IDE",
      "C/C++",
      "PowerShell",
      "Batch Scripting",
      "USB HID",
      "Windows API",
      "Reverse Shell"
    ],
    cards: {
      a: {
        title: "Payload & Exploitation",
        text: `Implémentation d'un payload multi-étapes : (1) Émulation clavier USB HID pour injection de commandes, (2) Création discrète d'un compte administrateur local avec credentials prédéfinis, (3) Désactivation séquentielle de Windows Defender et Firewall via commandes obfusquées, (4) Établissement de reverse shell avec persistance via registre Windows et tâches planifiées. Détection automatique du port COM pour communication bidirectionnelle Teensy ↔ PC. Système de retry intelligent en cas d'échec avec mécanisme de persistance.`
      },
      b: {
        title: "Post-Exploitation & Exfiltration",
        text: `Déploiement automatisé d'AnyDesk pour accès remote avec récupération de l'ID de connexion. Implémentation d'un grabber exfiltrant les données sensibles (documents, credentials, historiques navigateurs) vers webhook Discord. Stockage des scripts sur SD card du Teensy pour payload modulaire et facilement modifiable. Framework démontrant concrètement les risques liés aux attaques physiques par USB et l'importance du contrôle des périphériques. Utilisation strictement réservée aux audits de sécurité autorisés et environnements de lab contrôlés.`
      }
    }
  },
  {
    title: "Naluos RPG — Text-Based Adventure Game",
    projectUrls: {
      repo: {
        owner: "naywvi",
        name: "Naluos_Rpg_Python",
        showStarCount: false,
      }
    },
    imageUrl: "/images/naluos_rpg.png",
    description: `Jeu de rôle narratif développé en Python, offrant une expérience d'exploration immersive dans la ville fictive de Nalua. Projet démontrant la maîtrise de la programmation orientée objet, la gestion d'états complexes et le design d'interactions utilisateur en CLI. Architecture modulaire permettant l'extension facile du contenu (personnages, quêtes, lieux) et la contribution open-source.`,
    tech: [
      "Python",
      "Object-Oriented Programming",
      "Game Design",
      "CLI Development",
      "State Management",
      "JSON"
    ],
    cards: {
      a: {
        title: "Architecture & Game Design",
        text: `Développement en Python avec architecture orientée objet pour gérer les entités du jeu (joueur, PNJs, lieux, inventaire). Système d'exploration basé sur une carte interactive permettant la navigation entre différentes zones de la ville de Nalua. Implémentation d'un moteur de dialogue avec système de choix influençant la progression narrative. Gestion de l'état du jeu avec sauvegarde/chargement des progressions. Design accessible pensé pour les débutants en RPG tout en offrant une profondeur narrative.`
      },
      b: {
        title: "Narration & Open Source",
        text: `Création d'un univers cohérent avec lore développé autour de la ville de Nalua et de ses habitants. Système d'interactions permettant de découvrir l'histoire progressivement via dialogues et exploration. Projet open-source (MIT) encourageant les contributions communautaires pour enrichir le contenu (nouveaux personnages, quêtes, zones). Code modulaire facilitant l'ajout de nouveaux éléments de gameplay. Démontre des compétences en storytelling, design de jeu et développement collaboratif.`
      }
    }
  },
  {
    title: "Nlookup — NASA API Explorer",
    projectUrls: {
      site: {
        url: "https://api.nasa.gov/",
        icon: <RiExternalLinkLine size={20} />,
      },
      repo: {
        owner: "naywvi",
        name: "NlookUp_representation_of_Nasa_API",
        showStarCount: false,
      }
    },
    imageUrl: "/images/nlookup.png",
    description: `Application desktop en C# permettant l'exploration et la consultation des données astronomiques via l'API officielle de la NASA. Interface intuitive offrant un accès simplifié aux archives spatiales : recherche temporelle sur événements historiques, visualisation de l'image astronomique du jour (APOD), et consultation d'informations détaillées sur planètes, astéroïdes et missions spatiales.`,
    tech: [
      "C#",
      ".NET Framework",
      "WinForms / WPF",
      "REST API",
      "JSON",
      "HTTP Client",
      "NASA API",
      "APOD"
    ],
    cards: {
      a: {
        title: "Intégration API & Fonctionnalités",
        text: `Consommation de l'API NASA avec gestion des endpoints multiples : APOD (Astronomy Picture of the Day), NEO (Near Earth Objects), Mars Rover Photos. Implémentation de requêtes HTTP avec désérialisation JSON pour traiter les réponses API. Système de recherche par plage de dates permettant d'explorer l'historique des découvertes spatiales et événements astronomiques. Affichage optimisé des images haute résolution avec mise en cache locale pour améliorer les performances et réduire les appels API.`
      },
      b: {
        title: "Interface & Expérience Utilisateur",
        text: `Interface graphique Windows native développée en WinForms/WPF offrant une navigation fluide dans les archives NASA. Visualisation enrichie de l'image du jour avec métadonnées (titre, description, crédits, date). Gestion des erreurs réseau et API avec messages informatifs pour l'utilisateur. Application standalone ne nécessitant aucune configuration complexe. Projet démontrant la maîtrise de C#, des APIs REST et du design d'interfaces desktop conviviales pour la vulgarisation scientifique.`
      }
    }
  }
];
