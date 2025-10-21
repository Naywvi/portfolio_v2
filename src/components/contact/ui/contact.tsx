"use client";

import { Zap } from "lucide-react";
import { Form } from "./form";

export function Contact(): JSX.Element {
  return (
    <section className="w-full bg-[#141414] py-20 relative overflow-hidden" id="contact">
      {/* Gradient fade-in en HAUT pour transition douce avec la section précédente */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#141414] to-transparent pointer-events-none z-10" />

      {/* Background effects améliorés */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Gradient fade-out en bas pour transition douce */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#141414] pointer-events-none z-10" />

      <div className="container max-w-[1200px] mx-auto">
        {/* En-tête redesigné avec plus de punch */}
        <div className="relative mb-16">
          {/* Badge animé */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Un petit café, un grand projet!
              </span>
            </div>
          </div>

          {/* Titre principal avec effet gradient */}
          <h2 className="text-center text-5xl md:text-7xl font-bold mb-6 relative">
            <span
              className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% auto',
                animation: 'gradient 3s ease infinite'
              }}
            >
              Restons en contact!
            </span>
          </h2>

          {/* Sous-titre avec animation */}
          <div className="flex items-center justify-center gap-3 text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50" />
            <p className="text-center">
              Contactez-moi via le formulaire ci-dessous et je vous répondrai dès que possible
              <span className="inline-block ml-2 animate-bounce">👋</span>
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>

          {/* Particules décoratives */}
          <div className="absolute -top-8 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
          <div className="absolute top-0 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>

        {/* Formulaire */}
        <div className="mx-auto w-full">
          <Form />
        </div>
      </div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}