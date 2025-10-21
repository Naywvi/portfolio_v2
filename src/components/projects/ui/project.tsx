import { Badge } from "~/components/ui/badge";
import Image from "next/image";
import { WobbleCard } from "~/components/ui/wobble-card";
import type { TimelineEntry } from "~/components/ui/timeline";
import { usePalette } from "color-thief-react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export function Project({
  tech,
  description,
  cards,
  imageUrl,
  videoUrl,
  title,
}: TimelineEntry) {
  const { data } = usePalette(imageUrl ?? "", 8, "hex");
  const [cornerColor, setCornerColor] = useState<string>("#f5f5f5");

  useEffect(() => {
    if (!imageUrl) return;

    let isMounted = true;
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      if (!isMounted) return; // Vérifier si le composant est toujours monté

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Utiliser une petite taille pour optimiser
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);

      try {
        // Extraire la couleur du coin supérieur gauche (moyenne de quelques pixels)
        const imageData = ctx.getImageData(5, 5, 10, 10);
        let r = 0, g = 0, b = 0;
        const pixels = imageData.data.length / 4;

        for (let i = 0; i < imageData.data.length; i += 4) {
          r += imageData.data[i]!;
          g += imageData.data[i + 1]!;
          b += imageData.data[i + 2]!;
        }

        r = Math.floor(r / pixels);
        g = Math.floor(g / pixels);
        b = Math.floor(b / pixels);

        if (isMounted) {
          setCornerColor(`rgb(${r}, ${g}, ${b})`);
        }
      } catch (error) {
        console.error("Erreur extraction couleur:", error);
        if (isMounted) {
          setCornerColor("#f5f5f5");
        }
      }

      // Nettoyer le canvas
      canvas.width = 0;
      canvas.height = 0;
    };

    img.onerror = () => {
      if (isMounted) {
        setCornerColor("#f5f5f5");
      }
    };

    // Cleanup: annuler les opérations si le composant se démonte
    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
      img.src = "";
    };
  }, [imageUrl]);

  return (
    <div className="relative">
      {/* Hero Section avec image et titre superposé */}
      <div
        className="relative mb-8 overflow-hidden rounded-3xl"
        style={{ backgroundColor: cornerColor }}
      >
        <div className="relative">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={800}
              className="h-[500px] w-full object-contain lg:h-[650px]"
              priority
            />
          )}
          {videoUrl && (
            <video
              className="h-[500px] w-full object-contain lg:h-[650px]"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Overlay gradient pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Titre superposé */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <h1 className="mb-3 text-3xl font-bold text-white lg:text-5xl">
              {title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {tech.map((text) => (
                <Badge
                  key={text}
                  className="border-white/20 bg-white/10 text-xs text-white backdrop-blur-sm"
                >
                  {text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-8 text-base leading-relaxed text-muted-foreground lg:text-lg">
        {description}
      </p>

      {/* Bento Grid pour les cartes */}
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <WobbleCard
          style={{ backgroundColor: data?.[6] ?? "#262626" }}
          className="group relative overflow-hidden p-6 lg:p-8"
        >
          <div className="relative z-10">
            <div className="mb-4 inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              Feature
            </div>
            <h2
              style={{
                color: data?.[6] ?? "#262626",
                filter: "brightness(0.8)",
              }}
              className="mb-4 text-2xl font-bold tracking-tight lg:text-3xl"
            >
              {cards.a.title}
            </h2>
            <p className="text-base leading-relaxed text-neutral-200">
              {cards.a.text}
            </p>
          </div>

          {/* Effet de brillance subtil au hover */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-all duration-500 group-hover:scale-150" />
        </WobbleCard>

        <WobbleCard
          style={{ backgroundColor: data?.[7] ?? "#235147" }}
          className="group relative overflow-hidden p-6 lg:p-8"
        >
          <div className="relative z-10">
            <div className="mb-4 inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              Details
            </div>
            <h2
              style={{
                color: data?.[7] ?? "#235147",
                filter: "brightness(0.8)",
              }}
              className="mb-4 text-2xl font-bold tracking-tight lg:text-3xl"
            >
              {cards.b.title}
            </h2>
            <p className="text-base leading-relaxed text-neutral-200">
              {cards.b.text}
            </p>
          </div>

          {/* Effet de brillance subtil au hover */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-all duration-500 group-hover:scale-150" />
        </WobbleCard>
      </div>

      {/* Accordion Mobile - Sans hover underline */}
      <div className="mt-6 space-y-3 lg:hidden">
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <Accordion type="multiple">
            <AccordionItem value="item-1" className="border-none px-4">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">01</span>
                  {cards.a.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {cards.a.text}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <Accordion type="multiple">
            <AccordionItem value="item-2" className="border-none px-4">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                <span className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">02</span>
                  {cards.b.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {cards.b.text}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}