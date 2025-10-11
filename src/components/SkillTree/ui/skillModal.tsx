import React, { useEffect, useState, useRef } from 'react';
import { X, Minimize2, Maximize2, Github, Linkedin, Book, Link2Icon, Braces, Code, FileJson2, LampDesk, BookCopy, Library, Zap, School } from 'lucide-react';

interface SkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}

export function SkillModal({ isOpen, onClose, data }: SkillModalProps): JSX.Element | null {
    const [isMinimized, setIsMinimized] = useState(false);
    const [touchStart, setTouchStart] = useState<number>(0);
    const [touchEnd, setTouchEnd] = useState<number>(0);
    const modalRef = useRef<HTMLDivElement>(null);

    // Fermer avec Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Ne pas bloquer le scroll en mode minimisé
            if (!isMinimized) {
                document.body.style.overflow = 'hidden';
            }
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, isMinimized]);

    // Reset minimized state when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsMinimized(false);
        }
    }, [isOpen]);

    // Gestion du swipe
    const handleTouchStart = (e: React.TouchEvent): void => {
        if (e.targetTouches && e.targetTouches[0]) {
            setTouchStart(e.targetTouches[0].clientY);
        }
    };

    const handleTouchMove = (e: React.TouchEvent): void => {
        if (e.targetTouches && e.targetTouches[0]) {
            setTouchEnd(e.targetTouches[0].clientY);
        }
    };

    const handleTouchEnd = (): void => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isSwipeDown = distance < -50;
        const isSwipeUp = distance > 50;

        if (isSwipeDown && !isMinimized) {
            // Swipe down = minimiser
            setIsMinimized(true);
            document.body.style.overflow = 'unset';
        } else if (isSwipeUp && isMinimized) {
            // Swipe up = maximiser
            setIsMinimized(false);
            document.body.style.overflow = 'hidden';
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const toggleMinimize = (): void => {
        setIsMinimized(!isMinimized);
        document.body.style.overflow = isMinimized ? 'hidden' : 'unset';
    };

    if (!isOpen || !data) return null;

    const linkIcons: Record<string, any> = {
        Github,
        Linkedin,
        Documentation: Book,
        Javascript: Braces,
        HTML5: FileJson2,
        CSS3: Code,
        Officiel: LampDesk,
        Hooks: BookCopy,
        Patterns: Library,
        Performance: Zap,
        Tutoriel: School,
    };

    const audienceData = data.data || data;

    const translations: Record<string, string> = {
        'Years Experience': "Années d'expérience",
        'Skills': 'Compétences',
        'Languages': 'Langues',
        'Education': 'Formation',
        'Business Value': "Valeur d'entreprise",
        'Team Impact': "Impact d'équipe",
        'web_development': 'Développement web',
        'Best_practices': 'Bonnes pratiques'
    };

    const renderSection = (key: string, value: any): JSX.Element | null => {
        if (!value) return null;

        const displayName = key
            .replace(/_/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const translatedName = translations[displayName] || displayName;

        if (key === 'projects') {
            return (
                <div key={key} className="rounded-lg bg-green-500/10 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-400">
                        <span>📦</span>
                        Projets
                    </h4>
                    <div className="space-y-3">
                        {Object.entries(value).map(([projectKey, projectData]: [string, any], i: number) => (
                            <div key={i} className="rounded-lg bg-black/20 p-3">
                                <p className="font-medium text-green-300">{projectKey}</p>
                                <p className="mt-1 text-sm text-gray-300">{projectData.name}</p>
                                {projectData.link && (
                                    <a
                                        href={projectData.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-sm text-blue-400 underline hover:text-blue-300"
                                    >
                                        Voir le projet →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (key === 'links') {
            return (
                <div key={key} className="rounded-lg bg-purple-500/10 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-purple-400">
                        <Link2Icon className="h-5 w-5" />
                        Liens utiles
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {Object.entries(value).map(([linkKey, linkUrl]: [string, any], i: number) => {
                            const Icon = linkIcons[linkKey];
                            if (!Icon) return null;
                            return (
                                <a
                                    key={i}
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-lg bg-black/20 p-3 text-blue-400 transition-all hover:bg-black/40 hover:text-blue-300"
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    <span className="text-sm">{linkKey}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <div key={key} className="rounded-lg bg-cyan-500/10 p-4">
                    <h4 className="mb-3 text-base font-semibold text-cyan-400">{translatedName}</h4>
                    <div className="flex flex-wrap gap-2">
                        {value.map((item: string, i: number) => (
                            <span key={i} className="rounded-full bg-gray-700 px-3 py-1 text-sm text-white">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            );
        }

        if (typeof value === 'string') {
            return (
                <div key={key} className="rounded-lg bg-blue-500/10 p-4">
                    <h4 className="mb-2 text-base font-semibold text-blue-400">{translatedName}</h4>
                    <p className="text-sm leading-relaxed text-gray-300">{value}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            {/* Overlay - seulement visible quand non minimisé sur mobile */}
            {!isMinimized && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={onClose}
                />
            )}

            {/* Modal */}
            <div
                ref={modalRef}
                className={`fixed z-50 transition-all duration-300 ease-out ${isMinimized
                    ? 'bottom-0 left-0 right-0 sm:bottom-4 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-3xl sm:-translate-x-1/2'
                    : 'inset-0 flex items-end justify-center p-0 sm:items-center sm:p-4'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`relative w-full transition-all duration-300 ${isMinimized
                        ? 'h-auto'
                        : 'max-h-[100vh] sm:max-h-[90vh] sm:max-w-3xl'
                        }`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {isMinimized ? (
                        // Version minimisée (mobile uniquement)
                        <div
                            onClick={toggleMinimize}
                            className="cursor-pointer rounded-t-3xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl sm:rounded-3xl"
                        >
                            {/* Handle de swipe */}
                            <div className="flex justify-center pt-2 pb-1">
                                <div className="h-1 w-12 rounded-full bg-gray-600"></div>
                            </div>

                            <div className="flex items-center justify-between p-4">
                                <div className="flex-1">
                                    <h3 className="font-bold text-white">{data.name}</h3>
                                    {audienceData.level && (
                                        <div className="mt-1 flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <div
                                                    key={star}
                                                    className={`h-2 w-2 rounded-full ${star <= audienceData.level ? 'bg-yellow-400' : 'bg-gray-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMinimize();
                                        }}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
                                    >
                                        <Maximize2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClose();
                                        }}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Version maximisée
                        <div className="overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl sm:rounded-3xl">
                            {/* Handle de swipe - visible seulement sur mobile */}
                            <div className="flex justify-center pt-2 pb-1 sm:hidden">
                                <div className="h-1 w-12 rounded-full bg-gray-600"></div>
                            </div>

                            {/* Header */}
                            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-white/10 bg-gray-900/95 p-4 backdrop-blur-sm sm:p-6">
                                <div className="flex-1 pr-4">
                                    <h2 className="text-2xl font-bold text-white sm:text-3xl">{data.name}</h2>
                                    {audienceData.level && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <div
                                                        key={star}
                                                        className={`h-4 w-4 rounded-full ${star <= audienceData.level ? 'bg-yellow-400' : 'bg-gray-600'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                Niveau {audienceData.level}/5
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-shrink-0 items-center gap-2">
                                    {/* Bouton minimiser - visible seulement sur mobile */}
                                    <button
                                        onClick={toggleMinimize}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 sm:hidden"
                                        aria-label="Minimiser"
                                    >
                                        <Minimize2 className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
                                        aria-label="Fermer"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="max-h-[calc(100vh-140px)] space-y-4 overflow-y-auto p-4 sm:max-h-[calc(90vh-120px)] sm:p-6">
                                {/* Description */}
                                {audienceData.description && (
                                    <div className="rounded-lg bg-white/5 p-4">
                                        <p className="leading-relaxed text-gray-300">{audienceData.description}</p>
                                    </div>
                                )}

                                {/* Autres sections */}
                                {Object.entries(audienceData)
                                    .filter(([key]) => !['description', 'level'].includes(key))
                                    .map(([key, value]) => renderSection(key, value))
                                    .filter(Boolean)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SkillModal;