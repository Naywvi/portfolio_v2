'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import './loader.css';

export function Loader() {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Démarrer le loader
        setIsLoading(true);

        // Attendre que la page soit complètement chargée
        const handleComplete = () => {
            setIsLoading(false);
        };

        // Si le document est déjà chargé
        if (document.readyState === 'complete') {
            handleComplete();
        } else {
            // Sinon, attendre l'événement load
            window.addEventListener('load', handleComplete);
        }

        return () => {
            window.removeEventListener('load', handleComplete);
        };
    }, [pathname, searchParams]);

    if (!isLoading) return null;

    return (
        <div className="page-loader-overlay">
            <div className="page-loader-content">
                <svg
                    viewBox="0 0 78 38"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    strokeWidth="1"
                    className="page-loader-logo"
                >
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>

                    {/* Arc principal avec blur */}
                    <path
                        d="M63.5,22.3294a19.5,19.5,0,0,0-39,0"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="blur-path"
                    />
                    <path
                        d="M63.5,22.3294a19.5,19.5,0,0,0-39,0"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="main-path arc-1"
                    />

                    {/* Petit arc avec blur */}
                    <path
                        d="M38.4694,26.593a6.9229,6.9229,0,0,0,9.79-9.7905"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="blur-path"
                    />
                    <path
                        d="M38.4694,26.593a6.9229,6.9229,0,0,0,9.79-9.7905"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="main-path arc-2"
                    />

                    {/* Arc moyen avec blur */}
                    <path
                        d="M43.25,33.1706a11.2273,11.2273,0,1,0,0-22.4545"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="blur-path"
                    />
                    <path
                        d="M43.25,33.1706a11.2273,11.2273,0,1,0,0-22.4545"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="main-path arc-3"
                    />

                    {/* Grand arc avec blur */}
                    <path
                        d="M54.6024,32.2223a14.6374,14.6374,0,1,0-20.7-20.7"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="blur-path"
                    />
                    <path
                        d="M54.6024,32.2223a14.6374,14.6374,0,1,0-20.7-20.7"
                        stroke="url(#logoGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="main-path arc-4"
                    />

                    {/* Texte avec blur */}
                    <text
                        x="6"
                        y="25"
                        fontSize="12"
                        fontFamily="Arial"
                        fontWeight="bold"
                        fill="url(#logoGradient)"
                        className="blur-text"
                    >
                        Naywvi
                    </text>
                    <text
                        x="6"
                        y="25"
                        fontSize="12"
                        fontFamily="Arial"
                        fontWeight="bold"
                        fill="white"
                        className="main-text"
                    >
                        Naywvi
                    </text>
                </svg>

                {/* Barre de progression */}
                <div className="progress-bar">
                    <div className="progress-bar-fill" />
                </div>

                {/* Texte de chargement */}
                <p className="loading-text">Chargement en cours...</p>
            </div>
        </div>
    );
}