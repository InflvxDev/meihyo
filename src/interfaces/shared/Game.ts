export interface Game {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}