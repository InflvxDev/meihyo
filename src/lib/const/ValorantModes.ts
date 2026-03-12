export interface ValorantMode {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  bgColor: string;
  accentColor: string;
}

export const VALORANT_MODES: ValorantMode[] = [
  {
    id: "deathmatch",
    title: "Deathmatch",
    description:
      "Entrena tu puntería en partidas individuales sin objetivos. Ideal para calentar y mejorar tu mecánica de disparo.",
    href: "/game/valorant/deathmatch",
    image: "/logos/valorant/Deathmatch.webp",
    bgColor: "bg-orange-950/50",
    accentColor: "border-orange-500/40",
  },
  {
    id: "team-deathmatch",
    title: "Team Deathmatch",
    description:
      "Practica en equipo y mide tu rendimiento colectivo. Perfecto para trabajar coordinación y rotaciones rápidas.",
    href: "/game/valorant/team-deathmatch",
    image: "/logos/valorant/Team_Deathmatch.webp",
    bgColor: "bg-blue-950/50",
    accentColor: "border-blue-500/40",
  },
  {
    id: "rankeds-normals",
    title: "Rankeds / Normals",
    description:
      "Analiza tus partidas competitivas y no clasificatorias. Revisa estadísticas, tendencias y progreso de rango.",
    href: "/game/valorant/rankeds-normals",
    image: "/logos/valorant/Ranked.webp",
    bgColor: "bg-yellow-950/50",
    accentColor: "border-yellow-500/40",
  },
];
