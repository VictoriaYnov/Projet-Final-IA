# Chronovoyage — Agence de Voyage Temporel de Luxe

Webapp moderne et interactive pour une agence fictive de voyage dans le temps proposant 3 destinations : **Paris 1889** (Exposition Universelle), le **Crétacé** (dinosaures, -65 millions d'années) et **Florence 1504** (Renaissance italienne).

Projet réalisé dans le cadre du module IA — Ynov 2026.

**URL de production :** [luxury-time-travel-landing-page.vercel.app](https://luxury-time-travel-landing-page.vercel.app)

---

## Technologies utilisées

| Catégorie | Technologies |
|-----------|-------------|
| **Framework** | Next.js 16.1.6 (App Router, Turbopack) |
| **Langage** | TypeScript 5.7.3 |
| **UI / Styling** | Tailwind CSS 3.4, CSS custom properties, glassmorphism |
| **Composants** | Radix UI (primitives accessibles), shadcn/ui |
| **Icônes** | Lucide React |
| **Polices** | Playfair Display (serif), Inter (sans-serif) via Google Fonts |
| **Déploiement** | Vercel |
| **Runtime** | React 19.2.3 |

---

## Features implémentées

### Landing page
- Hero section avec **vidéo en fond** (autoplay, loop, muted) et particules flottantes
- **3 cards de destinations** avec images, badges de sécurité, notes, prix et highlights
- Section statistiques (4.6 Mrd+ années accessibles, 12 400+ voyageurs, etc.)
- Section "À propos" avec 4 features (garantie zéro paradoxe, ultra-luxe, guides experts, éthique)
- Footer complet avec liens, badges de certification et mentions légales
- Navbar responsive avec glassmorphism au scroll et menu hamburger mobile

### Planificateur IA
- Sélection parmi les **3 vraies destinations** (Paris 1889, Crétacé, Florence 1504)
- Tags de centres d'intérêt (Art, Gastronomie, Architecture, Science, etc.)
- Choix du nombre de voyageurs et de la durée
- **Génération d'itinéraire jour par jour** personnalisé selon la destination et les intérêts
- Calcul dynamique des prix (par personne + total groupe)
- Notes de personnalisation ajoutées selon les intérêts sélectionnés

### Chatbot (Chrono Concierge)
- Widget flottant en bas à droite avec animation ping
- **16 catégories de réponses** couvrant destinations, prix, sécurité, conseils, gastronomie, aventure, science, réservation, FAQ...
- Système de **matching par mots-clés avec scoring** (la meilleure réponse est choisie)
- Normalisation Unicode pour gérer les accents
- Quick replies au premier message
- Animation de typing (dots bounce)
- Ton professionnel, chaleureux et passionné d'histoire

### Animations & micro-interactions
- **Scroll reveal** via IntersectionObserver (hook `useScrollReveal` réutilisable)
- Animations staggerées (délai croissant entre les éléments)
- Micro-interactions boutons : `active:scale-95`, effet glow radial au hover (`btn-glow`)
- Underline animé sur les liens de navigation (`nav-link`)
- Zoom au hover sur les images de destinations
- Icônes qui grossissent/tournent au hover

### Optimisation
- Lazy loading natif via `next/image`
- Vidéo avec poster fallback
- Build statique (SSG)
- Thème sombre par défaut avec CSS variables

---

## Outils IA utilisés

Ce projet a été réalisé avec l'aide de plusieurs outils d'intelligence artificielle, dans un esprit de transparence :

| Outil | Utilisation |
|-------|-----------|
| **v0.dev (Vercel)** | Génération initiale du squelette de la webapp (composants, layout, UI shadcn) |
| **Claude Code (Anthropic)** | Développement, débogage, traduction FR, création du chatbot intelligent, planificateur IA, animations, déploiement |
| **IA générative (vidéo)** | Création de la vidéo hero présentant les 3 destinations (dinosaures, Renaissance, Exposition Universelle) |
| **IA générative (images)** | Génération des images hero des 3 destinations |

---

## Installation locale

### Prérequis
- Node.js 18+
- npm

### Étapes

```bash
# Cloner le projet
git clone <url-du-repo>
cd luxury-time-travel-landing-page

# Installer les dépendances
npm install --legacy-peer-deps

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

### Build de production

```bash
npm run build
npm start
```

### Déploiement sur Vercel

Le projet est déployé sur **Vercel**. Voici les étapes pour redéployer :

```bash
# Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer en production
vercel deploy --prod
```

Le déploiement est également automatique à chaque push sur la branche principale si le projet est connecté à un dépôt Git via le dashboard Vercel.

**URL de production :** [luxury-time-travel-landing-page.vercel.app](https://luxury-time-travel-landing-page.vercel.app)

> **Note :** L'installation des dépendances nécessite le flag `--legacy-peer-deps` en raison de conflits de versions entre certains packages. Vercel gère cela automatiquement lors du build.

---

## Structure du projet

```
app/
  layout.tsx          # Layout racine (polices, metadata, lang=fr)
  page.tsx            # Page d'accueil (assemblage des sections)
  globals.css         # Variables CSS, glassmorphism, animations

components/
  navbar.tsx          # Navigation fixe avec glassmorphism
  hero-section.tsx    # Hero avec vidéo et particules
  stats-section.tsx   # Statistiques animées
  destinations-section.tsx  # 3 cards de destinations
  ai-planner-section.tsx    # Planificateur IA interactif
  about-section.tsx   # Section features/valeurs
  footer.tsx          # Pied de page
  chatbot-widget.tsx  # Chatbot flottant intelligent
  ui/                 # 53 composants shadcn/ui

hooks/
  use-scroll-reveal.ts  # Hook IntersectionObserver réutilisable
  use-mobile.tsx        # Détection mobile
  use-toast.ts          # Système de notifications

lib/
  utils.ts            # Utilitaire cn() (tailwind-merge + clsx)

public/
  images/             # Images hero des destinations
  videos/             # Vidéo de fond
```

---

## Crédits

- **Framework UI** : [shadcn/ui](https://ui.shadcn.com/) — composants Radix UI + Tailwind CSS
- **Icônes** : [Lucide](https://lucide.dev/)
- **Polices** : [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Hébergement** : [Vercel](https://vercel.com/)
- **Images des destinations** : générées par IA
- **Vidéo hero** : générée par IA
- **Scaffolding initial** : [v0.dev](https://v0.dev/) (Vercel)
- **Développement assisté par IA** : [Claude Code](https://claude.ai/) (Anthropic)

---

*Projet réalisé par Victoria Martini — Module IA, Ynov 2026*
