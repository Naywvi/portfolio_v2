"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "~/components/ui/logo";

export function Navbar() {
  const pathname = usePathname();

  // Fonction pour déterminer si le lien est actif
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Style pour le lien actif
  const getLinkClassName = (path: string) => {
    const baseClasses = "text-sm font-medium transition-all duration-300 relative";
    const activeClasses = "text-white";
    const inactiveClasses = "text-white/60 hover:text-white/80";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="sticky left-0 top-0 z-50 flex w-full items-center bg-[#000000ab] px-5 backdrop-blur-lg">
      <div className="m-auto flex w-full max-w-[1800px] items-center justify-between py-2">
        {/* Logo à gauche */}
        <Link href="/" className="inline-block">
          <Logo className="w-28" />
        </Link>

        {/* Navigation centrée */}
        <div className="flex items-center gap-8">
          <Link href="/" className={getLinkClassName("/")}>
            Accueil
            {isActive("/") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 animate-shimmer" />
            )}
          </Link>

          <Link href="/projets" className={getLinkClassName("/projets")}>
            Projets
            {isActive("/projets") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 animate-shimmer" />
            )}
          </Link>

          <Link href="/skillTree" className={getLinkClassName("/skillTree")}>
            Arbre de compétences
            {isActive("/skillTree") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 animate-shimmer" />
            )}
          </Link>

          {/* <Link href="/about" className={getLinkClassName("/about")}>
            À propos
            {isActive("/about") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 animate-shimmer" />
            )}
          </Link>

          <Link href="/contact" className={getLinkClassName("/contact")}>
            Contact
            {isActive("/contact") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 animate-shimmer" />
            )}
          </Link> */}
        </div>

        {/* Espace vide à droite pour équilibrer */}
        <div className="w-28"></div>
      </div>
    </nav>
  );
}