"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Clock, Users, Globe, Shield } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "4,6 Mrd",
    label: "Années accessibles",
    suffix: "+",
  },
  {
    icon: Users,
    value: "12 400",
    label: "Voyageurs satisfaits",
    suffix: "+",
  },
  {
    icon: Globe,
    value: "847",
    label: "Destinations temporelles",
    suffix: "",
  },
  {
    icon: Shield,
    value: "100",
    label: "Taux de sécurité",
    suffix: "%",
  },
];

export function StatsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`glass rounded-2xl p-6 text-center transition-all duration-700 hover:scale-105 hover:border-primary/20 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                  <span className="text-primary">{stat.suffix}</span>
                </p>
                <p className="mt-1 text-xs tracking-wider uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
