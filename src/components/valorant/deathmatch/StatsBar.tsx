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
    <div className="rounded-xl bg-secondary/10 border border-foreground/12 px-5 py-4 flex items-center justify-between gap-3 hover:border-primary/25 hover:bg-secondary/15 transition-all duration-150">
      <div className="min-w-0">
        <p className="text-secondary/65 text-xs font-semibold uppercase tracking-widest mb-2">
          {label}
        </p>
        <p className={`font-bold font-mono text-2xl leading-none truncate ${valueClass}`}>
          {value}
        </p>
        {subtext && (
          <p className="text-secondary/50 text-xs mt-1.5 truncate">{subtext}</p>
        )}
      </div>

      <Icon size={36} className={`shrink-0 ${accentClass}`} />
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
        valueClass="text-emerald-500"
        Icon={MdPersonOff}
        accentClass="text-emerald-500/30"
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
