import { GiPistolGun } from "react-icons/gi";
import { MdGpsFixed, MdPersonOff, MdSportsScore } from "react-icons/md";

interface StatCardProps {
  label: string;
  value: string;
  valueClass?: string;
  subtext?: string;
  Icon: React.ComponentType<{ size: number; className?: string }>;
  accentClass?: string;
}

function StatCard({
  label,
  value,
  valueClass = "text-foreground",
  subtext,
  Icon,
  accentClass = "text-primary/30",
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-secondary/5 border border-foreground/10 px-5 py-4 flex items-center justify-between gap-3 group hover:border-foreground/20 hover:bg-secondary/10 transition-all">
      {/* top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="min-w-0">
        <p className="text-secondary/60 text-xs font-semibold uppercase tracking-widest mb-2">
          {label}
        </p>
        <p className={`font-bold font-mono text-2xl leading-none truncate ${valueClass}`}>
          {value}
        </p>
        {subtext && (
          <p className="text-secondary/45 text-xs mt-1.5 truncate">{subtext}</p>
        )}
      </div>

      <Icon size={38} className={`shrink-0 ${accentClass} group-hover:opacity-60 transition-opacity`} />
    </div>
  );
}

export interface StatsBarData {
  total: number;
  totalK: number;
  kd: string;
  kdCls: string;
  topArma: string | null;
}

export function StatsBar({ total, totalK, kd, kdCls, topArma }: StatsBarData) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        label="K/D Promedio"
        value={kd}
        valueClass={kdCls}
        Icon={MdGpsFixed}
        accentClass="text-primary/30"
      />
      <StatCard
        label="Arma más usada"
        value={topArma ?? "Sin datos"}
        valueClass={topArma ? "text-foreground" : "text-secondary/40"}
        Icon={GiPistolGun}
        accentClass="text-foreground/20"
      />
      <StatCard
        label="Bajas totales"
        value={totalK.toString()}
        valueClass="text-emerald-400"
        Icon={MdPersonOff}
        accentClass="text-emerald-400/25"
      />
      <StatCard
        label="Partidas jugadas"
        value={total.toString()}
        valueClass="text-foreground"
        Icon={MdSportsScore}
        accentClass="text-secondary/25"
      />
    </div>
  );
}
