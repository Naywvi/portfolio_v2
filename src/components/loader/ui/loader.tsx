'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import './loader.css';

export function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        // Démarrer le chargement
        setIsLoading(true);
        setProgress(0);

        // Simuler une progression réaliste
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 15;
            });
        }, 200);

        // Vérifier que tout est chargé
        const checkLoaded = () => {
            // Atteindre 100%
            setProgress(100);

            // Attendre un peu avant de cacher le loader
            setTimeout(() => {
                setIsLoading(false);
            }, 400);
        };

        // Si déjà chargé
        if (document.readyState === 'complete') {
            setTimeout(checkLoaded, 500); // Délai minimum pour voir le loader
        } else {
            window.addEventListener('load', checkLoaded);
        }

        // Sécurité : forcer la fin après 5 secondes max
        const timeout = setTimeout(checkLoaded, 5000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timeout);
            window.removeEventListener('load', checkLoaded);
        };
    }, [pathname]);

    if (!isLoading) return null;

    return (
        <div className="page-loader-overlay">
            {/* Sphères d'arrière-plan animées */}
            <div className="loader-sphere-1" />
            <div className="loader-sphere-2" />
            <div className="loader-sphere-3" />

            {/* Contenu centré */}
            <div className="page-loader-content">
                {/* Spinner moderne avec cercles concentriques */}
                <div className="loader-spinner">
                    <div className="spinner-ring spinner-ring-1" />
                    <div className="spinner-ring spinner-ring-2" />
                    <div className="spinner-ring spinner-ring-3" />
                    <div className="spinner-core" />
                </div>

                {/* Nom avec gradient */}
                <h4 className="loader-title">La folie c'est de faire toujours la même chose et de s'attendre à un résultat différent - Albert Einstein</h4>

                {/* Barre de progression */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                        <div className="progress-shimmer" />
                    </div>
                    <p className="progress-percentage">
                        {Math.round(progress)}%
                    </p>
                </div>

                {/* Texte de chargement */}
                <p className="loading-text">
                    Chargement<span className="loading-dots">...</span>
                </p>
            </div>
        </div>
    );
}