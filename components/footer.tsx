import { Clock } from "lucide-react";

const footerLinks = [
  {
    title: "Expéditions",
    links: ["Préhistoire", "Civilisations antiques", "Renaissance", "Ère moderne", "Voyages sur mesure"],
  },
  {
    title: "Entreprise",
    links: ["À propos", "Protocoles de sécurité", "Éthique temporelle", "Carrières", "Presse"],
  },
  {
    title: "Assistance",
    links: ["Centre d'aide", "Assurance voyage", "Politique d'annulation", "Urgence temporelle", "Contact"],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="font-serif text-xl font-bold text-foreground">
                Chronovoyage
              </span>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              La première agence de voyage temporel de luxe au monde. Vivez
              l&apos;Histoire, ne vous contentez pas de la lire. Agréée par
              l&apos;Autorité de Régulation Temporelle.
            </p>
            <div className="flex gap-3">
              {["Agréée ART", "ISO-T 9001", "Sans paradoxe"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2089 Chronovoyage Inc. Tous droits (et toutes lignes temporelles) réservés.
          </p>
          <div className="flex gap-6">
            {["Confidentialité", "Conditions", "Éthique temporelle"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
