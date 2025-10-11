import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function About() {
  return (
    <section className="w-full bg-[#141414] py-20">
      <div className="container">
        <Link
          href="/projets"
          className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 p-8 transition-all duration-500 hover:border-white/20 lg:p-12"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">
                  Portfolio complet
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white lg:text-4xl">
                Découvrez tous mes projets
              </h2>
              <p className="max-w-2xl text-base text-neutral-400 lg:text-lg">
                Explorez l'ensemble de mes réalisations, des applications web
                aux projets open source. Chaque projet raconte une histoire.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 lg:px-8 lg:py-4">
              <span className="text-base font-semibold text-white lg:text-lg">
                Voir tous les projets
              </span>
              <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          {/* Subtle grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
        </Link>
      </div>
    </section>
  );
}