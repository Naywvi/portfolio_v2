import { SectionHeading } from "~/components/ui/section-heading";
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function About() {
  return (
    <section className="w-full bg-[#141414]">
       <div className="container">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:items-baseline md:gap-5">
        {/* Bouton stylé avec animation */}
        {/* <div className="flex justify-center mt-12">
          <Link 
            href="/projets"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">{data.title}</span>
            <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100" style={{ transitionProperty: 'opacity, transform' }} />
          </Link>
        </div> */}

        {/* Variante alternative avec style plus minimaliste */}
        
     
          <Link 
            href="/projets"
            className="group relative inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
          >
            <SectionHeading title="Voir plus de projets" subTitle="Vous pouvez consulter mes projets passés ici." />

            {/* <div className="relative overflow-hidden w-11 h-11">
              <ChevronRight className="w-11 h-11 transition-transform duration-300 group-hover:translate-x-1" />
              <ChevronRight className="w-11 h-11 absolute top-0 -right-6 transition-transform duration-300 group-hover:translate-x-1" />
            </div> */}
            
            <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 w-0 group-hover:w-full transition-all duration-500" />
          </Link>
        </div>
        </div>
    </section>
  );
}