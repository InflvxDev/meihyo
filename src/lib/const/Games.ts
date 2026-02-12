import type { Game } from "../../interfaces/shared/Game";
import { SiValorant, SiLeagueoflegends } from "react-icons/si";

export const GAMES: Game[] = [
  { id: "valorant", name: "Valorant", icon: SiValorant },
  { id: "lol", name: "League of Legends", icon: SiLeagueoflegends },
];