"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Compass, ShieldCheck, Gem, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Garantie zéro paradoxe",
    description:
      "Notre moteur d'intégrité temporelle breveté garantit aucune perturbation de la ligne temporelle. Chaque voyage est vérifié avant le départ.",
  },
  {
    icon: Gem,
    title: "Expérience ultra-luxe",
    description:
      "De la haute cuisine authentique d'époque aux garde-robes sur mesure, chaque détail est pensé selon les plus hauts standards du luxe.",
  },
  {
    icon: Compass,
    title: "Guides temporels experts",
    description:
      "Chaque expédition est menée par des historiens, des linguistes et des ingénieurs temporels cumulant des milliers de voyages réussis.",
  },
  {
    icon: HeartHandshake,
    title: "Voyage temporel éthique",
    description:
      "Nous respectons les codes d'éthique temporelle les plus stricts. Observer, vivre, mais jamais altérer le cours de l'Histoire.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`glass group rounded-2xl p-8 transition-all duration-700 hover:border-primary/20 hover:scale-[1.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-3 font-serif text-xl font-bold text-foreground">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </div>
  );
}

export function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="mb-4 inline-block text-xs tracking-[0.3em] uppercase text-primary">
            Pourquoi Chronovoyage
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            La référence du voyage temporel
          </h2>
          <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground">
            Depuis 2089, nous redéfinissons ce que signifie vivre l&apos;Histoire.
            Notre engagement envers la sécurité, le luxe et l&apos;éthique est inégalé.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
