"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  Calendar,
  Users,
  ArrowRight,
  Landmark,
  Skull,
  Palette,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const destinations = [
  {
    id: "paris",
    label: "Paris 1889",
    icon: Landmark,
    subtitle: "Exposition Universelle",
    baseDays: 4,
    basePrice: 28000,
  },
  {
    id: "cretaceous",
    label: "Crétacé -65M",
    icon: Skull,
    subtitle: "Ère des dinosaures",
    baseDays: 3,
    basePrice: 45000,
  },
  {
    id: "florence",
    label: "Florence 1504",
    icon: Palette,
    subtitle: "Renaissance italienne",
    baseDays: 5,
    basePrice: 32000,
  },
];

const interestTags = [
  "Art & Culture",
  "Gastronomie",
  "Architecture",
  "Nature & Aventure",
  "Science & Innovation",
  "Musique & Spectacle",
  "Histoire & Politique",
  "Photographie",
];

interface ItineraryDay {
  title: string;
  description: string;
}

interface GeneratedPlan {
  intro: string;
  days: ItineraryDay[];
  includes: string;
  price: string;
}

function generatePlan(
  destId: string,
  interests: string[],
  travelers: string,
  duration: string
): GeneratedPlan {
  const nbTravelers = parseInt(travelers);
  const nbDays = parseInt(duration);
  const dest = destinations.find((d) => d.id === destId)!;
  const pricePerPerson = dest.basePrice + (nbDays - dest.baseDays) * 5000;
  const total = pricePerPerson * nbTravelers;

  const plans: Record<string, { days: ItineraryDay[]; intro: string }> = {
    paris: {
      intro: `Votre expédition de luxe à Paris 1889 pour ${nbTravelers} voyageur${nbTravelers > 1 ? "s" : ""} est prête. Plongez au cœur de la Belle Époque !`,
      days: [
        {
          title: "Arrivée & Calibration Temporelle",
          description:
            "Installation dans votre suite au Grand Hôtel du Louvre. Briefing par votre guide temporel sur les coutumes de l'époque, essayage de votre garde-robe Belle Époque. Promenade nocturne le long de la Seine illuminée aux premières lampes à arc.",
        },
        {
          title: "L'Exposition Universelle",
          description:
            "Accès privilégié au Champ-de-Mars. Visite du Pavillon Edison et découverte des premières ampoules électriques. Montée privée au sommet de la Tour Eiffel — dans sa couleur rouge-brun d'origine. Déjeuner au restaurant Le Brébant avec vue panoramique.",
        },
        {
          title: "Galerie des Machines & Innovation",
          description:
            "Exploration de la Galerie des Machines, la plus grande structure métallique au monde à l'époque. Rencontre avec les ingénieurs et inventeurs de l'Exposition. Découverte du phonographe et des premiers prototypes automobiles.",
        },
        {
          title: "Gala Belle Époque & Départ",
          description:
            "Grande soirée de gala en tenue d'apparat dans les salons de l'Exposition. Spectacle de cancan au Moulin Rouge (inauguré cette même année !). Retour à notre époque avec vos souvenirs et votre garde-robe en cadeau.",
        },
      ],
    },
    cretaceous: {
      intro: `Expédition Classe A au Crétacé pour ${nbTravelers} voyageur${nbTravelers > 1 ? "s" : ""} confirmée. Préparez-vous pour l'aventure la plus intense de votre vie !`,
      days: [
        {
          title: "Atterrissage & Exploration sécurisée",
          description:
            "Arrivée en pod temporel blindé classe A dans les plaines du Crétacé supérieur. Briefing sécurité renforcé et activation de vos champs de force individuels. Première observation de troupeaux d'hadrosaures dans les plaines verdoyantes. Installation au camp de base pressurisé.",
        },
        {
          title: "Face au T-Rex",
          description:
            "Expédition au cœur du territoire des grands prédateurs. Observation rapprochée d'un Tyrannosaurus Rex depuis le pod blindé — un moment gravé à jamais dans votre mémoire. Survol en pod aérien des vallées peuplées de Ptéranodons. Dîner gastronomique avec vue sur un coucher de soleil volcanique.",
        },
        {
          title: "Merveilles Préhistoriques & Retour",
          description:
            "Exploration des forêts de fougères géantes et observation de Triceratops au bord d'un lac primordial. Dernière sortie d'observation et collecte de données paléontologiques (hologrammes souvenir). Retour sécurisé vers notre époque.",
        },
      ],
    },
    florence: {
      intro: `Votre immersion Renaissance à Florence pour ${nbTravelers} voyageur${nbTravelers > 1 ? "s" : ""} a été créée sur mesure. La beauté de l'art vous attend !`,
      days: [
        {
          title: "Arrivée dans la Florence des Médicis",
          description:
            "Arrivée discrète dans la République de Florence. Installation au Palazzo Strozzi, résidence de prestige. Essayage de votre garde-robe Renaissance florentine. Promenade au coucher du soleil le long de l'Arno avec votre guide historien.",
        },
        {
          title: "L'Atelier de Léonard de Vinci",
          description:
            "Visite exclusive de l'atelier de Léonard de Vinci. Observation du maître travaillant sur ses études anatomiques et ses machines volantes. Déjeuner dans une taverne florentine authentique avec spécialités toscanes de l'époque.",
        },
        {
          title: "Le David de Michel-Ange",
          description:
            "Moment historique : assistez au dévoilement de la statue du David de Michel-Ange sur la Piazza della Signoria. Rencontre avec l'artiste et visite de son atelier de sculpture. Dîner privé dans les jardins Boboli.",
        },
        {
          title: "La Cour des Médicis",
          description:
            "Invitation au Palazzo Medici pour un banquet somptueux avec la famille la plus puissante de Florence. Concert privé de musique Renaissance. Visite du Duomo et montée dans la coupole de Brunelleschi.",
        },
        {
          title: "Dernières merveilles & Retour",
          description:
            "Matinée libre pour explorer les ruelles de Florence, les marchés d'artisans et les orfèvres du Ponte Vecchio. Acquisition de souvenirs d'époque authentiques. Cérémonie de départ et retour vers notre époque.",
        },
      ],
    },
  };

  const basePlan = plans[destId] || plans.paris;

  // Adapt days to requested duration
  let days = [...basePlan.days];
  if (nbDays < days.length) {
    days = days.slice(0, nbDays);
    days[days.length - 1] = {
      ...days[days.length - 1],
      title: days[days.length - 1].title + " & Retour",
    };
  } else if (nbDays > days.length) {
    for (let i = days.length; i < nbDays; i++) {
      const extraDays: Record<string, ItineraryDay> = {
        paris: {
          title: "Exploration libre de Paris",
          description:
            "Journée à votre rythme : flânez dans le Quartier Latin, visitez Notre-Dame dans sa splendeur d'antan, ou explorez les ateliers d'artistes de Montmartre. Votre guide reste disponible pour toute demande.",
        },
        cretaceous: {
          title: "Expédition supplémentaire",
          description:
            "Exploration de biomes inédits : forêts de conifères géants, observation de nids de Velociraptors (à distance sécurisée), ou plongée en pod sous-marin pour découvrir les reptiles marins.",
        },
        florence: {
          title: "Immersion culturelle prolongée",
          description:
            "Visite des fresques de Botticelli, cours de peinture à la tempera avec un artisan florentin, ou excursion dans la campagne toscane au milieu des vignobles et oliveraies du XVIe siècle.",
        },
      };
      days.push(extraDays[destId] || extraDays.paris);
    }
  }

  // Add interest-specific notes to intro
  let interestNote = "";
  if (interests.length > 0) {
    const interestMap: Record<string, Record<string, string>> = {
      paris: {
        "Gastronomie": "Nous avons ajouté des dégustations exclusives dans les grands restaurants de l'Exposition.",
        "Science & Innovation": "Votre itinéraire inclut un accès VIP aux pavillons scientifiques et une rencontre avec les inventeurs.",
        "Musique & Spectacle": "Nous avons réservé une loge privée au Moulin Rouge et un concert à l'Opéra Garnier.",
        "Architecture": "Visite des coulisses de la construction de la Tour Eiffel avec les plans originaux de Gustave Eiffel.",
        "Photographie": "Session de portrait sur plaques de verre avec un photographe de l'époque — un souvenir unique !",
        "Art & Culture": "Visite privée des ateliers d'artistes impressionnistes à Montmartre.",
      },
      cretaceous: {
        "Nature & Aventure": "Nous avons renforcé les sorties d'exploration avec un trek avancé en territoire sauvage.",
        "Photographie": "Pod d'observation équipé de capteurs holographiques haute résolution pour des souvenirs inoubliables.",
        "Science & Innovation": "Accompagnement par un paléontologue expert pour analyse scientifique en temps réel.",
      },
      florence: {
        "Art & Culture": "Accès exclusif aux ateliers de Raphaël et Botticelli en plus de Vinci et Michel-Ange.",
        "Gastronomie": "Atelier de cuisine toscane Renaissance et dégustation de vins des vignobles Médicis.",
        "Architecture": "Visite technique de la coupole de Brunelleschi avec un maître bâtisseur de l'époque.",
        "Musique & Spectacle": "Concert privé de madrigaux dans la chapelle des Médicis.",
        "Histoire & Politique": "Audience privée avec les conseillers politiques de la République de Florence.",
      },
    };

    const destInterests = interestMap[destId] || {};
    const matchedNotes = interests
      .filter((i) => destInterests[i])
      .map((i) => destInterests[i]);

    if (matchedNotes.length > 0) {
      interestNote = "\n\n✨ Personnalisation : " + matchedNotes.join(" ");
    }
  }

  return {
    intro: basePlan.intro + interestNote,
    days,
    includes:
      "Assurance temporelle complète, pod de transport temporel, hébergement de luxe, garde-robe d'époque, guide dédié 24h/24, repas gastronomiques inclus.",
    price: `${pricePerPerson.toLocaleString("fr-FR")} $ par personne${nbTravelers > 1 ? ` — Total : ${total.toLocaleString("fr-FR")} $` : ""}`,
  };
}

export function AIPlannerSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [selectedDest, setSelectedDest] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [travelers, setTravelers] = useState("2");
  const [duration, setDuration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);

  const selectedDestData = destinations.find((d) => d.id === selectedDest);

  // Auto-set duration when destination is selected
  const handleSelectDest = (id: string) => {
    setSelectedDest(id);
    const dest = destinations.find((d) => d.id === id);
    if (dest && !duration) {
      setDuration(String(dest.baseDays));
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    if (!selectedDest) return;
    setIsGenerating(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(
        generatePlan(selectedDest, selectedInterests, travelers, duration || "3")
      );
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <section
      id="planner"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-primary">
            <Sparkles className="h-4 w-4" />
            Planificateur IA
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Concevez Votre Voyage Idéal
          </h2>
          <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground">
            Notre IA temporelle analyse vos préférences pour créer un itinéraire
            sur mesure à travers l&apos;Histoire.
          </p>
        </div>

        {/* Planner card */}
        <div
          className={`glass-strong rounded-3xl p-6 md:p-10 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Form */}
            <div className="space-y-8">
              {/* Destination selector */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Landmark className="h-4 w-4 text-primary" />
                  Choisissez votre destination
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {destinations.map((dest) => {
                    const Icon = dest.icon;
                    return (
                      <button
                        key={dest.id}
                        onClick={() => handleSelectDest(dest.id)}
                        className={`flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 active:scale-[0.98] ${
                          selectedDest === dest.id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <Icon className={`h-5 w-5 shrink-0 ${selectedDest === dest.id ? "text-primary-foreground" : "text-primary"}`} />
                        <div>
                          <p className="text-sm font-semibold">{dest.label}</p>
                          <p className={`text-xs ${selectedDest === dest.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                            {dest.subtitle} — {dest.baseDays} jours — à partir de {dest.basePrice.toLocaleString("fr-FR")} $
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Vos centres d&apos;intérêt
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestTags.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 active:scale-95 ${
                        selectedInterests.includes(interest)
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-transparent text-muted-foreground hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    Voyageurs
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} voyageur{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    Durée
                  </label>
                  <select
                    value={duration || (selectedDestData ? String(selectedDestData.baseDays) : "3")}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  >
                    {[2, 3, 4, 5, 7, 10, 14].map((n) => (
                      <option key={n} value={n}>
                        {n} jour{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !selectedDest}
                className="btn-glow group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Création de votre itinéraire...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Générer mon itinéraire
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {/* Right: AI Response */}
            <div className="flex flex-col">
              <div className="flex-1 rounded-2xl border border-border/50 bg-background/50 p-6 overflow-y-auto max-h-[600px]">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Chrono AI
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Moteur d&apos;Intelligence Temporelle
                    </p>
                  </div>
                </div>

                {plan ? (
                  <div className="animate-fade-in-up space-y-4">
                    <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                      {plan.intro}
                    </p>

                    <div className="space-y-3">
                      {plan.days.map((day, i) => (
                        <div key={i} className="rounded-xl bg-secondary/30 p-4">
                          <p className="mb-1 text-xs font-semibold text-primary">
                            Jour {i + 1}
                          </p>
                          <p className="mb-2 text-sm font-semibold text-foreground">
                            {day.title}
                          </p>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {day.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="mb-1 text-xs font-semibold text-primary">
                        Inclus dans votre forfait
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {plan.includes}
                      </p>
                      <p className="mt-3 text-lg font-bold text-foreground">
                        {plan.price}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button className="btn-glow rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95">
                        Réserver ce voyage
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="rounded-full border border-border px-5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
                      >
                        Régénérer
                      </button>
                    </div>
                  </div>
                ) : isGenerating ? (
                  <div className="flex h-64 flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="h-16 w-16 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                      <Sparkles className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analyse des corridors temporels...
                    </p>
                  </div>
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Send className="h-8 w-8 text-primary/40" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/60">
                        Prêt à planifier votre voyage temporel
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Sélectionnez une destination et vos préférences, puis
                        laissez notre IA créer votre itinéraire idéal
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
