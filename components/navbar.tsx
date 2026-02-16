"use client";

import { useState, useEffect } from "react";
import { Clock, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Planificateur IA", href: "#planner" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <span className="font-serif text-xl font-bold tracking-wide text-foreground">
            Chronovoyage
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link text-sm tracking-widest uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#planner"
          className="btn-glow hidden rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-95 md:inline-block"
        >
          Réserver un voyage
        </a>

        {/* Mobile hamburger */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="glass-strong absolute inset-x-0 top-full border-t border-border/50 md:hidden">
          <ul className="flex flex-col gap-1 p-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-4">
              <a
                href="#planner"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Réserver un voyage
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
