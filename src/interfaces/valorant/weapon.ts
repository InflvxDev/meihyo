
export type WeaponType =
  | 'Sidearm'
  | 'SMG'
  | 'Shotgun'
  | 'Rifle'
  | 'Sniper Rifle'
  | 'Machine Gun'
  | 'Melee';

export type Weapon = {
  nombre: string;
  tipo: WeaponType;
};
