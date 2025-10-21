"use client";

import { timelineData } from "../data";
import { Code2, Rocket, Coffee, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const codeSnippets = [
    "cargo build --release --target x86_64-unknown-linux-gnu",
    "sudo wazuh-manager status && tail -f /var/ossec/logs/alerts/alerts.json",
    "proxmox-backup-client backup vm/100.qcow2 --repository backup@pbs:datastore",
    "rustc --emit=llvm-ir kernel_allocator.rs -C opt-level=3",
    "docker-compose up -d && docker logs -f c2-server",
    "psql -U postgres -d production -c 'SELECT * FROM incidents WHERE severity >= 8;'",
    "nmap -sS -sV -O -A --script=vuln 192.168.1.0/24",
    "systemctl restart pfsense && pfctl -f /etc/pf.conf",
];

export function ProjectsHero(): JSX.Element {
    const [currentSnippet, setCurrentSnippet] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (isTyping) {
            const snippet = codeSnippets[currentSnippet];
            if (snippet && displayedText.length < snippet.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(snippet.slice(0, displayedText.length + 1));
                }, 100);
                return () => clearTimeout(timeout);
            } else if (snippet) {
                const timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
                return () => clearTimeout(timeout);
            }
        } else {
            const timeout = setTimeout(() => {
                setDisplayedText("");
                setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
                setIsTyping(true);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [displayedText, isTyping, currentSnippet]);

    const stats = [
        { icon: Code2, label: "Projets", value: timelineData.length.toString() },
        { icon: Rocket, label: "Technologies", value: "20+" },
        { icon: Coffee, label: "Cafés bus", value: "∞" },
        { icon: Zap, label: "Passion", value: "100%" },
    ];

    return (
        <div className="relative py-20 lg:py-32">
            <div className="relative z-10">
                {/* Titre principal */}
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-sm">
                        <Code2 className="h-4 w-4" />
                        <span>Liste des projets</span>
                    </div>
                    <h1 className="mb-6 text-4xl font-bold text-white lg:text-6xl">
                        Développement & {" "}
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Cybersécurité
                        </span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-neutral-400 lg:text-xl">
                        De l'idée à la réalité, découvrez mes projets qui mêlent créativité,
                        innovation et expertise technique.
                    </p>
                </div>

                {/* Terminal animé */}
                <div className="mx-auto mb-12 max-w-3xl">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-xl">
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-3">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                            </div>
                            <span className="ml-2 text-xs text-neutral-500">~/projects</span>
                        </div>
                        {/* Terminal content */}
                        <div className="p-6 font-mono text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-green-400">$</span>
                                <span className="text-white">{displayedText}</span>
                                <span className="inline-block h-4 w-2 animate-pulse bg-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-800/80"
                        >
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                            <stat.icon className="mb-3 h-8 w-8 text-purple-400" />
                            <div className="relative">
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                                <p className="mt-1 text-sm text-neutral-400">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}