import React, { useState } from 'react';
import { VisualizationMode, AudienceType } from './types';
import { visualizationModes, audienceConfig } from './visualizationConfig';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';

interface ControlPanelProps {
    currentMode: VisualizationMode;
    setCurrentMode: (mode: VisualizationMode) => void;
    currentAudience: AudienceType;
    setCurrentAudience: (audience: AudienceType) => void;
    showOnboarding: boolean;
    highlightedOption: number;
    onSelectAudience: () => void;
}

export function ControlPanel({
    currentMode,
    setCurrentMode,
    currentAudience,
    setCurrentAudience,
    showOnboarding,
    highlightedOption,
    onSelectAudience,
}: ControlPanelProps): JSX.Element {

    const audiences: AudienceType[] = ['visitor', 'hr', 'technical'];
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleAudienceSelect = (audience: AudienceType): void => {
        setCurrentAudience(audience);
        onSelectAudience();
    };

    const toggleCollapse = (): void => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {/* Panneau principal */}
            <div
                className={`fixed left-0 top-0 z-50 h-screen transition-transform duration-300 ease-out ${isCollapsed ? '-translate-x-full' : 'translate-x-0'
                    }`}
            >
                <div className="flex h-full">
                    <div className="w-[calc(100vw-3rem)] overflow-y-auto bg-black/40 backdrop-blur-xl sm:w-80">
                        <div className="space-y-4 p-2 sm:p-4">
                            {/* Sélection d'audience - MISE EN VALEUR */}
                            <div
                                className={`overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:p-6 ${showOnboarding
                                    ? 'border-purple-400 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-cyan-900/90 ring-4 ring-purple-400/50'
                                    : 'border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-cyan-900/40'
                                    }`}
                            >
                                {/* En-tête avec animation */}
                                <div className={`mb-3 flex items-center gap-2 transition-all duration-500 sm:mb-4 ${showOnboarding ? 'scale-110' : 'scale-100'}`}>
                                    <div className={`flex h-6 w-6 items-center justify-center rounded-full sm:h-8 sm:w-8 ${showOnboarding ? 'animate-pulse bg-purple-500/40' : 'bg-purple-500/20'}`}>
                                        <span className="text-base sm:text-lg">👤</span>
                                    </div>
                                    <h3 className="text-base font-bold text-white sm:text-lg">Qui êtes-vous ?</h3>
                                </div>

                                <p className="mb-3 text-xs text-gray-300 sm:mb-4 sm:text-sm">
                                    Choisissez votre profil pour adapter l'affichage
                                </p>

                                <div className="space-y-2">
                                    {audiences.map((key, index) => {
                                        const config = audienceConfig[key];
                                        const isActive = currentAudience === key;
                                        const isHighlighted = showOnboarding && highlightedOption === index + 1;

                                        return (
                                            <button
                                                key={key}
                                                onClick={() => handleAudienceSelect(key)}
                                                className={`group relative w-full overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-500 sm:p-4 ${isActive
                                                    ? 'border-white bg-white/10 shadow-lg'
                                                    : isHighlighted
                                                        ? 'animate-pulse border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/50 ring-4 ring-yellow-400/30'
                                                        : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                                                    }`}
                                                style={{
                                                    transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                                                }}
                                            >
                                                {/* Badge ACTIF */}
                                                {isActive && (
                                                    <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-1 text-[10px] font-bold text-white">
                                                        ACTIF
                                                    </div>
                                                )}

                                                {/* Badge NOUVEAU (lors de l'onboarding) */}
                                                {isHighlighted && !isActive && (
                                                    <div className="absolute right-2 top-2 animate-bounce rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                                                        ✨ VOIR
                                                    </div>
                                                )}

                                                <div className="flex items-start gap-2 sm:gap-3">
                                                    <span className={`text-xl transition-transform duration-300 sm:text-2xl ${isHighlighted ? 'scale-125' : 'scale-100'}`}>
                                                        {config.icon}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="mb-1 flex flex-wrap items-center gap-1 sm:gap-2">
                                                            <h4 className="text-sm font-semibold text-white sm:text-base">{config.name}</h4>
                                                            <span
                                                                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                                                                style={{
                                                                    backgroundColor: config.color + '40',
                                                                    color: config.color,
                                                                }}
                                                            >
                                                                {config.badge}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-400 sm:text-sm">{config.description}</p>
                                                    </div>
                                                </div>

                                                {/* Indicateur de sélection */}
                                                {isActive && (
                                                    <div
                                                        className="absolute bottom-0 left-0 h-1 w-full"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${config.color}, transparent)`,
                                                        }}
                                                    />
                                                )}

                                                {/* Effet de brillance pour l'option en cours de highlight */}
                                                {isHighlighted && (
                                                    <div className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Message encourageant pendant l'onboarding */}
                                {showOnboarding && (
                                    <div className="mt-3 animate-pulse rounded-lg bg-purple-500/20 p-2 text-center sm:mt-4 sm:p-3">
                                        <p className="text-xs font-semibold text-purple-200 sm:text-sm">
                                            👆 Cliquez pour commencer !
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Modes de visualisation - Grisé pendant l'onboarding */}
                            <div
                                className={`overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${showOnboarding
                                    ? 'border-white/5 bg-black/20 opacity-30'
                                    : 'border-white/10 bg-black/40 opacity-100'
                                    }`}
                            >
                                <div className="p-3 sm:p-4">
                                    <h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-white sm:mb-3 sm:text-sm">
                                        <span>👁️</span>
                                        Visualisation
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(Object.keys(visualizationModes) as VisualizationMode[]).map((key) => {
                                            const config = visualizationModes[key];
                                            const isActive = currentMode === key;

                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => setCurrentMode(key)}
                                                    disabled={showOnboarding}
                                                    className={`rounded-lg p-2 text-left transition-all sm:p-3 ${isActive
                                                        ? 'bg-white/20 ring-2 ring-white/50'
                                                        : 'bg-white/5 hover:bg-white/10'
                                                        } ${showOnboarding ? 'cursor-not-allowed' : ''}`}
                                                >
                                                    <div className="mb-1 text-lg sm:text-xl">{config.icon}</div>
                                                    <div className="text-[10px] font-semibold text-white sm:text-xs">{config.name}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bouton toggle - toujours visible */}
            <button
                onClick={toggleCollapse}
                className={`fixed left-0 top-1/2 z-50 flex h-24 w-8 -translate-y-1/2 items-center justify-center rounded-r-lg border-y border-r border-white/20 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-cyan-900/90 backdrop-blur-xl transition-all duration-300 hover:w-10 ${isCollapsed ? 'translate-x-0' : 'translate-x-[calc(100vw-3rem)] sm:translate-x-80'
                    } ${showOnboarding ? 'ring-2 ring-purple-400/50' : ''}`}
                aria-label={isCollapsed ? 'Ouvrir le panneau' : 'Fermer le panneau'}
            >
                {isCollapsed ? (
                    <ChevronRightIcon className="h-5 w-5 text-white" />
                ) : (
                    <ChevronLeftIcon className="h-5 w-5 text-white" />
                )}
            </button>
        </>
    );
}

export default ControlPanel;