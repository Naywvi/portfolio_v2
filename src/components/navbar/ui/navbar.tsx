"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "~/components/ui/logo";

export function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Fonction pour déterminer si le lien est actif
  const isActive = (path: string): boolean => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Style pour le lien actif (desktop)
  const getLinkClassName = (path: string): string => {
    const baseClasses = "text-sm font-medium transition-all duration-300 relative group px-3 py-2 flex items-center gap-2";
    const activeClasses = "text-white font-semibold";
    const inactiveClasses = "text-white/60 hover:text-white/80";
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  // Style pour le lien actif (mobile)
  const getMobileLinkClassName = (path: string): string => {
    const baseClasses = "text-lg font-medium transition-all duration-300 px-4 py-3 rounded-lg block";
    const activeClasses = "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30";
    const inactiveClasses = "text-white/80 hover:bg-white/10";
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/projets", label: "Projets" },
    { href: "/skillTree", label: "Arbre de compétences" },
  ];

  return (
    <>
      <nav className="sticky left-0 top-0 z-50 flex w-full items-center bg-[#000000ab] px-4 backdrop-blur-lg sm:px-5">
        <div className="m-auto flex w-full max-w-[1800px] items-center justify-between py-2">
          {/* Logo à gauche */}
          <Link href="/" className="inline-block relative z-50">
            <Logo className="w-24 sm:w-28" />
          </Link>

          {/* Navigation desktop - cachée sur mobile */}
          <div className="hidden items-center gap-2 lg:flex lg:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClassName(link.href)}
              >
                {/* Petit point indicateur minimaliste */}
                {isActive(link.href) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                )}
                {link.label}

                {/* Hover effect pour tous les liens */}
                <span className="absolute inset-0 -z-10 scale-0 bg-white/5 rounded-lg transition-transform duration-300 group-hover:scale-100" />
              </Link>
            ))}
          </div>

          {/* Bouton burger - visible seulement sur mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white/20 lg:hidden"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Espace vide à droite pour équilibrer (desktop) */}
          <div className="hidden w-28 lg:block"></div>
        </div>
      </nav>

      {/* Menu mobile - slide depuis le haut */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out lg:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black pt-20">
          {/* Background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* Navigation links */}
          <div className="relative space-y-2 p-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={getMobileLinkClassName(link.href)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Decorative gradient orb */}
          <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute left-10 top-40 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        </div>
      </div>

      {/* Overlay pour fermer le menu mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}