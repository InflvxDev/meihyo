// src/data/weapons.ts
import type { Weapon } from "../../interfaces/valorant/weapon";

export const weapons: Weapon[] = [
  // Sidearms
  { nombre: 'Classic', tipo: 'Sidearm' },
  { nombre: 'Shorty', tipo: 'Sidearm' },
  { nombre: 'Frenzy', tipo: 'Sidearm' },
  { nombre: 'Ghost', tipo: 'Sidearm' },
  { nombre: 'Sheriff', tipo: 'Sidearm' },
  { nombre: 'Bandit', tipo: 'Sidearm' },
  // SMGs
  { nombre: 'Stinger', tipo: 'SMG' },
  { nombre: 'Spectre', tipo: 'SMG' },
  // Shotguns
  { nombre: 'Bucky', tipo: 'Shotgun' },
  { nombre: 'Judge', tipo: 'Shotgun' },
  // Rifles
  { nombre: 'Bulldog', tipo: 'Rifle' },
  { nombre: 'Guardian', tipo: 'Rifle' },
  { nombre: 'Phantom', tipo: 'Rifle' },
  { nombre: 'Vandal', tipo: 'Rifle' },
  // Sniper Rifles
  { nombre: 'Marshal', tipo: 'Sniper Rifle' },
  { nombre: 'Outlaw', tipo: 'Sniper Rifle' },
  { nombre: 'Operator', tipo: 'Sniper Rifle' },
  // Machine Guns
  { nombre: 'Ares', tipo: 'Machine Gun' },
  { nombre: 'Odin', tipo: 'Machine Gun' },
  // Melee
  { nombre: 'Melee', tipo: 'Melee' },
];