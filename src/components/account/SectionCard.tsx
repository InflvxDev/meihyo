interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <div className={`bg-background border border-foreground/10 rounded-xl p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}
