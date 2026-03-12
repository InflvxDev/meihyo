export type ValorantDeathmatch = {
  id: number;
  usuario: string; // UUID
  arma?: string | null;
  asesinatos?: number | null;
  muertes?: number | null;
  objetivo?: string | null;
  observaciones?: string | null;
  created_at: string; // TIMESTAMPTZ
};

export type ValorantDeathmatchInsert = Omit<ValorantDeathmatch, "id" | "created_at">;

export type ValorantDeathmatchUpdate = Partial<Omit<ValorantDeathmatch, "id" | "usuario" | "created_at">>;
