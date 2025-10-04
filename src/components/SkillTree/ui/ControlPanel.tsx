// 📁 components/ControlPanel.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Theme {
    colors?: {
        ui?: {
            glass?: string;
            border?: string;
        };
        text?: {
            primary?: string;
        };
    };
}

interface ControlPanelProps {
    isPanelOpen: boolean;
    setIsPanelOpen: (open: boolean) => void;
    currentMode: string;
    setCurrentMode: (mode: any) => void;
    visualizationModes: Record<string, any>;
    currentTheme: string;
    setCurrentTheme: (theme: string) => void;
    themes: Record<string, any>;
    currentAudience: string;
    setCurrentAudience: (audience: any) => void;
    audienceConfig: Record<string, any>;
    theme?: Theme;
}

export function ControlPanel({
    isPanelOpen,
    setIsPanelOpen,
    currentMode,
    setCurrentMode,
    visualizationModes,
    currentTheme,
    setCurrentTheme,
    themes,
    currentAudience,
    setCurrentAudience,
    audienceConfig,
    theme
}: ControlPanelProps) {
    // États pour les sections rétractables
    const [isModesOpen, setIsModesOpen] = useState(true);
    const [isThemesOpen, setIsThemesOpen] = useState(true);
    const [isAudienceOpen, setIsAudienceOpen] = useState(true);

    // Composant réutilisable pour les sections
    const CollapsibleSection = ({
        title,
        isOpen,
        setIsOpen,
        children
    }: {
        title: string;
        isOpen: boolean;
        setIsOpen: (open: boolean) => void;
        children: React.ReactNode;
    }) => (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
                <h3 className="font-bold">{title}</h3>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    );

    return (
        <div className="absolute top-4 left-4 z-10 max-h-[calc(100vh-2rem)]">
            <div
                className="backdrop-blur p-4 rounded-2xl border shadow-xl transition-all duration-300 w-80 max-w-[calc(100vw-2rem)] overflow-y-auto max-h-[calc(100vh-2rem)]"
                style={{
                    backgroundColor: theme?.colors?.ui?.glass ?? "#222",
                    borderColor: theme?.colors?.ui?.border ?? "#444",
                    color: theme?.colors?.text?.primary ?? "#fff",
                }}
            >
                <button
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                    <span className="font-bold">Panneau de contrôle</span>
                    <span>{isPanelOpen ? "▲" : "▼"}</span>
                </button>

                {isPanelOpen && (
                    <div className="mt-4 space-y-4">
                        {/* Modes de visualisation */}
                        <CollapsibleSection
                            title="Mode de visualisation"
                            isOpen={isModesOpen}
                            setIsOpen={setIsModesOpen}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {Object.entries(visualizationModes).map(([key, config]) => (
                                    <button
                                        key={key}
                                        onClick={() => setCurrentMode(key)}
                                        className={`p-3 rounded-lg transition-all text-left ${currentMode === key
                                            ? 'ring-2 ring-blue-400 bg-gray-700'
                                            : 'bg-gray-700/50 hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{config.icon}</div>
                                        <div className="text-sm font-semibold">{config.name}</div>
                                        <div className="text-xs text-gray-400 line-clamp-2">{config.description}</div>
                                    </button>
                                ))}
                            </div>
                        </CollapsibleSection>

                        <hr className="border-gray-600" />

                        {/* Thèmes */}
                        <CollapsibleSection
                            title="Thème du graph"
                            isOpen={isThemesOpen}
                            setIsOpen={setIsThemesOpen}
                        >
                            <div className="flex gap-2 flex-wrap">
                                {Object.values(themes).map((t: any) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setCurrentTheme(t.id)}
                                        className={`p-2 rounded-lg transition-all hover:scale-110 ${currentTheme === t.id ? "ring-2 ring-blue-400" : ""
                                            }`}
                                        style={{ backgroundColor: t.colors.nodes.center }}
                                        title={t.name}
                                    >
                                        {t.icon}
                                    </button>
                                ))}
                            </div>
                        </CollapsibleSection>

                        <hr className="border-gray-600" />

                        {/* Audience */}
                        <CollapsibleSection
                            title="Type de visualisation"
                            isOpen={isAudienceOpen}
                            setIsOpen={setIsAudienceOpen}
                        >
                            <div className="space-y-2">
                                {Object.entries(audienceConfig).map(([key, config]: [string, any]) => (
                                    <button
                                        key={key}
                                        onClick={() => setCurrentAudience(key)}
                                        className={`w-full text-left p-2 rounded-lg transition-all hover:scale-105 ${currentAudience === key ? "ring-2" : ""
                                            }`}
                                        style={{
                                            backgroundColor:
                                                currentAudience === key ? config.color + "20" : "transparent",
                                        }}
                                    >
                                        <span className="mr-2">{config.icon}</span>
                                        <span className="text-sm">{config.name}</span>
                                    </button>
                                ))}
                            </div>
                        </CollapsibleSection>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ControlPanel;
