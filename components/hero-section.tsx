"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video / cinematic background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-40"
          poster="/images/cretaceous.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs tracking-[0.2em] uppercase text-primary">
              Voyage Temporel Premium depuis 2089
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-balance">
              Voyagez à travers le{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Temps
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Vivez l&apos;Histoire en personne avec nos expéditions temporelles de luxe.
            Marchez parmi les dinosaures, assistez à la Renaissance, ou
            émerveillez-vous devant les plus grandes expositions du monde.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#destinations"
              className="btn-glow group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
            >
              <span className="relative z-10">Explorer les destinations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </a>
            <a
              href="#planner"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary active:scale-95"
            >
              Planificateur IA
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#destinations"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Défiler vers les destinations"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Découvrir</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
