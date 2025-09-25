"use client";
import Link from "next/link";
import { Logo } from "~/components/ui/logo";

export function Navbar() {
  return (
    <nav className="sticky left-0 top-0 z-50 flex w-full items-center bg-[#000000ab] px-5 backdrop-blur-lg">
      <div className="m-auto flex w-full max-w-[1800px] items-center justify-between py-2">
        {/* Logo à gauche */}
        <Link href="/" className="inline-block">
          <Logo className="w-28" />
        </Link>

        {/* Navigation centrée */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Accueil
          </Link>
          <Link
            href="/projets"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Projets
          </Link>
          {/* <Link
            href="/about"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Contact
          </Link> */}
        </div>

        {/* Espace vide à droite pour équilibrer */}
        <div className="w-28"></div>
      </div>
    </nav>
  );
}