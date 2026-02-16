"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Star, ArrowRight, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const destinations = [
  {
    id: "cretaceous",
    title: "Période Crétacé",
    subtitle: "Il y a 66 millions d'années",
    location: "Amérique du Nord, Crétacé supérieur",
    image: "/images/cretaceous.jpg",
    rating: 4.9,
    price: "45 000",
    duration: "3 jours",
    description:
      "Marchez parmi les titans de la préhistoire. Observez le Tyrannosaurus Rex dans son habitat naturel depuis nos pods d'observation temporels blindés.",
    highlights: ["Rencontre T-Rex", "Vol de Ptéranodons", "Coucher de soleil volcanique"],
    safety: "Classe A — Protection maximale",
  },
  {
    id: "florence",
    title: "Florence 1504",
    subtitle: "La Haute Renaissance",
    location: "Florence, République d'Italie",
    image: "/images/florence.jpg",
    rating: 4.8,
    price: "32 000",
    duration: "5 jours",
    description:
      "Assistez au dévoilement du David de Michel-Ange. Visitez l'atelier privé de Léonard de Vinci et dînez avec la famille Médicis.",
    highlights: ["Atelier de Michel-Ange", "Banquet Médicis", "Visite du Duomo"],
    safety: "Classe B — Immersion historique",
  },
  {
    id: "paris",
    title: "Paris 1889",
    subtitle: "L'Exposition Universelle",
    location: "Paris, République française",
    image: "/images/paris.jpg",
    rating: 4.9,
    price: "28 000",
    duration: "4 jours",
    description:
      "Tenez-vous au pied de la Tour Eiffel fraîchement construite. Vivez la grandeur de l'Exposition Universelle et la naissance de l'ère moderne.",
    highlights: ["Inauguration Tour Eiffel", "Pavillon Edison", "Gala Belle Époque"],
    safety: "Classe B — Immersion historique",
  },
];

function DestinationCard({
  destination,
  index,
}: {
  destination: (typeof destinations)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass card */}
      <div className="glass relative overflow-hidden rounded-2xl transition-all duration-500 hover:border-primary/20">
        {/* Image */}
        <div className="relative h-64 overflow-hidden md:h-72">
          <Image
            src={destination.image}
            alt={`${destination.title} - ${destination.subtitle}`}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full glass px-3 py-1.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs font-medium text-foreground">
              {destination.rating}
            </span>
          </div>

          {/* Safety badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full glass px-3 py-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-400">{destination.safety}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Location & date */}
          <div className="mb-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs">{destination.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">{destination.duration}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-1 font-serif text-2xl font-bold text-foreground">
            {destination.title}
          </h3>
          <p className="mb-4 text-sm font-medium text-primary">
            {destination.subtitle}
          </p>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            {destination.description}
          </p>

          {/* Highlights */}
          <div className="mb-6 flex flex-wrap gap-2">
            {destination.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/50 pt-5">
            <div>
              <span className="text-xs text-muted-foreground">À partir de</span>
              <p className="text-2xl font-bold text-foreground">
                <span className="text-primary">$</span>
                {destination.price}
              </p>
            </div>
            <button className="btn-glow group/btn flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-95">
              Voir les détails
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DestinationsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section id="destinations" className="relative py-24 md:py-32">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="mb-4 inline-block text-xs tracking-[0.3em] uppercase text-primary">
            Expéditions phares
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Choisissez votre époque
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
            Des voyages temporels d&apos;exception conçus pour les voyageurs les plus exigeants.
            Chaque expédition inclut un hébergement de luxe et des guides temporels experts.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
