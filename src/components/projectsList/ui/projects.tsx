"use client";

import { useState, useEffect } from "react";
import { Timeline } from "~/components/ui/timeline";
import { timelineData } from "../data";
import { ProjectsHero } from "./ProjectsHero";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS_PER_PAGE = 3;

export function ProjectsList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(timelineData.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = timelineData.slice(startIndex, endIndex);

  // Scroll en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="relative w-full overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #000000 0%, #050505 15%, #0a0a0a 35%, #0d0d0d 50%, #101010 65%, #131313 85%, #141414 100%)'
    }}>
      {/* Couche 1 - Sphères principales animées */}
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      {/* Couche 2 - Sphères secondaires */}
      <div className="absolute left-3/4 top-1/4 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute left-1/3 bottom-1/3 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute right-1/3 top-1/2 h-64 w-64 rounded-full bg-indigo-500/12 blur-3xl animate-pulse" style={{ animationDuration: '5.5s' }} />
      {/* Couche 3 - Petites sphères d'accent */}
      <div className="absolute left-1/2 top-1/3 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl animate-pulse" style={{ animationDuration: '4.5s' }} />
      <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDuration: '6.5s' }} />
      <div className="absolute left-1/6 top-2/3 h-52 w-52 rounded-full bg-sky-500/12 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute right-1/6 top-1/6 h-60 w-60 rounded-full bg-blue-400/10 blur-3xl animate-pulse" style={{ animationDuration: '7.5s' }} />
      {/* Couche 4 - Micro sphères dispersées */}
      <div className="absolute left-[15%] bottom-[15%] h-40 w-40 rounded-full bg-purple-400/8 blur-2xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute right-[10%] top-[40%] h-44 w-44 rounded-full bg-cyan-400/8 blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute left-[60%] bottom-[40%] h-36 w-36 rounded-full bg-pink-400/8 blur-2xl animate-pulse" style={{ animationDuration: '5.5s' }} />
      {/* Grid pattern amélioré */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Lignes diagonales subtiles */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(139,92,246,.1) 0px, rgba(139,92,246,.1) 1px, transparent 1px, transparent 60px)`,
        }}
      />
      {/* Gradient overlay pour plus de profondeur - Version améliorée */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]/40" />
      </div>

      <div className="relative z-10 px-4 md:container">
        {/* Hero UNIQUEMENT sur la page 1 */}
        {currentPage === 1 && <ProjectsHero />}

        {/* Marqueur pour le scroll */}
        <div id="timeline-start" className={currentPage !== 1 ? 'pt-20' : ''} />

        {/* Timeline avec projets paginés */}
        <Timeline data={currentProjects} />

        {/* Contrôles de pagination */}
        <div className="mt-16 mb-20 flex flex-col items-center gap-8">
          {/* Indicateur de page */}
          <div className="text-center">
            <p className="text-neutral-400 text-sm">
              Projets <span className="text-white font-semibold">{startIndex + 1}</span> à{' '}
              <span className="text-white font-semibold">{Math.min(endIndex, timelineData.length)}</span> sur{' '}
              <span className="text-white font-semibold">{timelineData.length}</span>
            </p>
          </div>

          {/* Boutons de navigation */}
          <div className="flex items-center gap-4">
            {/* Bouton Précédent */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Précédent</span>
            </button>

            {/* Numéros de pages */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`h-10 w-10 rounded-full font-semibold transition-all duration-300 ${page === currentPage
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110 shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white hover:scale-105 border border-white/10'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Bouton Suivant */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="font-medium">Suivant</span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Barre de progression */}
          <div className="w-full max-w-md">
            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 transition-all duration-500 ease-out"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}