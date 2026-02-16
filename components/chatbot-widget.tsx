"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";

interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
}

const initialMessage: Message = {
  id: 0,
  role: "assistant",
  content:
    "Bienvenue chez Chronovoyage ! Je suis votre concierge temporel. Que puis-je faire pour vous ? Renseignements sur nos destinations, tarifs, ou conseils pour choisir votre époque idéale... je suis à votre disposition !",
};

const quickReplies = [
  "Quelles destinations proposez-vous ?",
  "Quels sont vos tarifs ?",
  "Comment choisir mon époque ?",
  "Le voyage est-il sûr ?",
];

interface BotRule {
  keywords: string[];
  response: string;
}

const botRules: BotRule[] = [
  // --- PARIS 1889 ---
  {
    keywords: ["paris", "1889", "eiffel", "exposition", "universelle", "belle époque", "belle epoque"],
    response:
      "Paris 1889, quelle époque magnifique ! Vous assisterez à l'inauguration de la Tour Eiffel par Gustave Eiffel lui-même, lors de l'Exposition Universelle. Au programme : promenade sur le Champ-de-Mars illuminé, visite du pavillon Edison avec les premières ampoules électriques, et un gala Belle Époque en tenue d'époque. Le forfait commence à 28 000 $ pour 4 jours. C'est notre destination la plus accessible et l'une des plus populaires !",
  },
  {
    keywords: ["tour eiffel", "eiffel"],
    response:
      "La Tour Eiffel venait tout juste d'être achevée en 1889 — vous la verrez dans sa couleur rouge-brun d'origine, pas le brun actuel ! Vous pourrez même monter au sommet avec bien moins de monde qu'aujourd'hui. Un moment absolument unique.",
  },
  // --- CRÉTACÉ ---
  {
    keywords: ["crétacé", "cretace", "dinosaure", "dino", "t-rex", "tyrannosaure", "préhistoire", "prehistoire", "jurassique", "-65"],
    response:
      "Le Crétacé, c'est notre expédition la plus spectaculaire ! Imaginez : observer un T-Rex dans son habitat naturel depuis nos pods d'observation blindés de classe A. Vous survolerez aussi des vallées avec des Ptéranodons et assisterez à un coucher de soleil volcanique à couper le souffle. Forfait à 45 000 $ pour 3 jours — le tarif plus élevé s'explique par les protocoles de sécurité renforcés. Chaque seconde en vaut la peine !",
  },
  {
    keywords: ["pod", "observation", "sécurité dinosaure"],
    response:
      "Nos pods d'observation temporels sont fabriqués en alliage titane-chromium et équipés de champs de force temporels. Vous êtes totalement invisible et intouchable pour la faune locale. Pas d'inquiétude, nos 12 400 voyageurs sont tous revenus en parfaite santé !",
  },
  // --- FLORENCE 1504 ---
  {
    keywords: ["florence", "1504", "renaissance", "michel-ange", "michelange", "leonard", "léonard", "vinci", "medici", "médicis", "david"],
    response:
      "Florence 1504, le cœur battant de la Renaissance ! Vous assisterez au dévoilement du David de Michel-Ange, visiterez l'atelier privé de Léonard de Vinci, et dînerez avec la famille Médicis lors d'un banquet somptueux. 5 jours d'immersion totale pour 32 000 $. C'est la destination idéale pour les amoureux d'art, de culture et de gastronomie italienne.",
  },
  {
    keywords: ["art", "peinture", "sculpture", "musée"],
    response:
      "Si l'art vous passionne, Florence 1504 est faite pour vous ! Vous verrez des chefs-d'œuvre en cours de création — pas derrière une vitre de musée. Michel-Ange taillant le David, les fresques encore fraîches... Une expérience qu'aucun musée au monde ne pourra jamais égaler. 32 000 $ pour 5 jours.",
  },
  // --- PRIX / TARIFS ---
  {
    keywords: ["prix", "tarif", "coût", "cout", "combien", "cher", "budget", "payer", "€", "$", "argent"],
    response:
      "Voici nos tarifs :\n\n• Paris 1889 — à partir de 28 000 $ (4 jours)\n• Florence 1504 — à partir de 32 000 $ (5 jours)\n• Crétacé — à partir de 45 000 $ (3 jours)\n\nTous nos forfaits incluent : assurance temporelle, hébergement de luxe, garde-robe d'époque, guide dédié 24h/24 et transport en pod temporel. Nous proposons aussi des facilités de paiement et des réductions groupe !",
  },
  // --- SÉCURITÉ ---
  {
    keywords: ["sûr", "sur", "sécurité", "securite", "danger", "risque", "paradoxe", "mourir", "blessure"],
    response:
      "La sécurité est notre priorité absolue. Chaque voyageur est équipé d'une ancre temporelle personnelle, de vaccins adaptés à l'époque et d'un guide dédié. Nos expéditions préhistoriques (Classe A) utilisent des pods blindés, et nos immersions historiques (Classe B) incluent des combinaisons d'intégration culturelle. Notre taux de retour est de 100 %, et notre moteur d'intégrité temporelle garantit zéro paradoxe.",
  },
  // --- CHOIX DESTINATION / CONSEIL ---
  {
    keywords: ["choisir", "choix", "conseiller", "conseil", "recommander", "recommandation", "hésiter", "hesiter", "quelle destination", "quelle époque", "quel voyage"],
    response:
      "Tout dépend de vos passions !\n\n🎨 Vous aimez l'art et la culture → Florence 1504\n🦖 Vous rêvez d'aventure et de nature → Le Crétacé\n🗼 Vous adorez l'histoire moderne et la gastronomie → Paris 1889\n\nSi vous me dites ce qui vous passionne (art, nature, gastronomie, science, aventure...), je peux affiner ma recommandation !",
  },
  // --- DESTINATIONS GÉNÉRALES ---
  {
    keywords: ["destination", "où", "ou", "visiter", "voyager", "époque", "epoque", "ère", "ere", "quand"],
    response:
      "Nous proposons actuellement 3 destinations phares :\n\n🗼 Paris 1889 — L'Exposition Universelle et la Tour Eiffel (4 jours, 28 000 $)\n🦖 Crétacé — Les dinosaures il y a 65 millions d'années (3 jours, 45 000 $)\n🎨 Florence 1504 — La Renaissance et Michel-Ange (5 jours, 32 000 $)\n\nChaque expédition est entièrement personnalisable. Laquelle vous intrigue le plus ?",
  },
  // --- DURÉE ---
  {
    keywords: ["durée", "duree", "combien de temps", "jour", "jours", "semaine"],
    response:
      "La durée varie selon la destination : Paris 1889 dure 4 jours, Florence 1504 propose 5 jours d'immersion, et le Crétacé est un séjour intense de 3 jours. Toutes les durées sont personnalisables selon vos envies — certains clients prolongent jusqu'à 2 semaines !",
  },
  // --- RÉSERVATION ---
  {
    keywords: ["réserver", "reserver", "réservation", "reservation", "book", "inscription", "inscrire"],
    response:
      "Pour réserver, vous pouvez utiliser notre planificateur IA juste au-dessus dans la page — il vous créera un itinéraire sur mesure. Sinon, je peux transmettre votre demande à l'un de nos conseillers temporels humains. Souhaitez-vous que je le fasse ?",
  },
  // --- GASTRONOMIE ---
  {
    keywords: ["gastronomie", "manger", "cuisine", "repas", "nourriture", "restaurant", "banquet", "dîner", "diner"],
    response:
      "La gastronomie fait partie intégrante de chaque voyage ! À Paris 1889, dégustez la haute cuisine française naissante dans les grands restaurants de l'Exposition. À Florence 1504, savourez un banquet Médicis avec des recettes authentiques de la Renaissance. Même au Crétacé, nos chefs préparent des repas gastronomiques dans le pod — avec vue sur les dinosaures !",
  },
  // --- AVENTURE / NATURE ---
  {
    keywords: ["aventure", "nature", "sauvage", "animal", "faune", "explorer", "exploration", "trek"],
    response:
      "Pour les amateurs d'aventure, le Crétacé est incomparable : survol de volcans actifs, observation de troupeaux de Triceratops, rencontre (à distance sécurisée !) avec le T-Rex... C'est l'expédition la plus intense que nous proposons. Si vous préférez quelque chose de plus doux, Paris 1889 offre aussi de belles découvertes avec ses jardins et pavillons exotiques !",
  },
  // --- SCIENCE / TECHNOLOGIE ---
  {
    keywords: ["science", "technologie", "invention", "edison", "électricité", "electricite", "innovation"],
    response:
      "Si la science vous fascine, Paris 1889 est idéal ! L'Exposition Universelle était un temple de l'innovation : le pavillon Edison avec les premières ampoules, les débuts du phonographe, la Galerie des Machines... Vous assisterez à la naissance de l'ère moderne. Et la Tour Eiffel elle-même était une prouesse d'ingénierie controversée à l'époque !",
  },
  // --- FAQ / INFORMATIONS GÉNÉRALES ---
  {
    keywords: ["qui êtes", "qui etes", "c'est quoi", "chronovoyage", "agence", "entreprise", "société"],
    response:
      "Chronovoyage est la première agence de voyage temporel de luxe, fondée en 2089. Nous sommes certifiés par l'Autorité de Régulation Temporelle, conformes ISO-T 9001, et garantissons un voyage sans paradoxe. Plus de 12 400 voyageurs nous ont fait confiance à travers 847 destinations temporelles. Notre mission : vous faire vivre l'Histoire, pas seulement la lire !",
  },
  // --- BONJOUR / SALUTATIONS ---
  {
    keywords: ["bonjour", "hello", "salut", "bonsoir", "coucou", "hey", "hi"],
    response:
      "Bonjour et bienvenue chez Chronovoyage ! Ravi de vous accueillir. Que puis-je faire pour vous aujourd'hui ? Renseignements sur une destination, tarifs, conseils personnalisés... je suis là pour vous guider à travers le temps !",
  },
  // --- MERCI ---
  {
    keywords: ["merci", "thanks", "thank"],
    response:
      "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Voyager dans le temps est une décision importante, et je suis là pour vous accompagner à chaque étape. Bon voyage temporel ! ⏳",
  },
];

function findBotResponse(userInput: string): string {
  const normalized = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let bestMatch: BotRule | null = null;
  let bestScore = 0;

  for (const rule of botRules) {
    let score = 0;
    for (const keyword of rule.keywords) {
      const normalizedKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalized.includes(normalizedKeyword)) {
        score += normalizedKeyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  return "Excellente question ! Je ne suis pas certain de pouvoir y répondre précisément, mais je vous invite à utiliser notre planificateur IA plus haut dans la page, ou à me poser des questions sur nos destinations (Paris 1889, Crétacé, Florence 1504), nos tarifs ou la sécurité de nos voyages. Je suis là pour vous aider !";
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = findBotResponse(text);
    const typingDelay = Math.min(800 + response.length * 5, 2500);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, typingDelay);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-500 ${
          isOpen
            ? "bg-secondary text-foreground rotate-0"
            : "bg-primary text-primary-foreground shadow-primary/30 hover:shadow-primary/50 hover:scale-110"
        }`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>

      {/* Pulse ring on closed state */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 h-14 w-14 animate-ping rounded-full bg-primary/20" />
      )}

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 translate-y-4 scale-95"
        }`}
      >
        <div className="glass-strong flex flex-col" style={{ height: "520px" }}>
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-background/50 px-5 py-4">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                Chrono Concierge
              </p>
              <p className="text-xs text-emerald-400">
                En ligne — toutes époques
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 animate-fade-in-up ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "assistant"
                      ? "bg-primary/10"
                      : "bg-secondary"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "assistant"
                      ? "bg-secondary/50 text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-secondary/50 px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border/50 bg-background/30 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about time travel..."
                className="flex-1 rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="btn-glow flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95 disabled:opacity-40"
                aria-label="Envoyer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
