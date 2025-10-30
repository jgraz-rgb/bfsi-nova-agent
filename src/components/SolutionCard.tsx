import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
interface SolutionCardProps {
  icon?: LucideIcon;
  iconSvg?: string;
  title: string;
  region?: string;
  link: string;
  disabled?: boolean;
}
export const SolutionCard = ({
  icon: Icon,
  iconSvg,
  title,
  region,
  link,
  disabled
}: SolutionCardProps) => {
  const content = <Card className={`group relative overflow-hidden transition-all duration-500 ${disabled ? 'opacity-40 cursor-not-allowed bg-gray-50/50' : 'cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-white/95 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary/30'}`} style={{
    boxShadow: disabled ? 'var(--shadow-sm)' : 'var(--shadow-card)'
  }} onMouseEnter={e => {
    if (!disabled) {
      e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
    }
  }} onMouseLeave={e => {
    if (!disabled) {
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }
  }}>
      <div className="p-8 flex flex-col items-center text-center space-y-5">
        <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${disabled ? 'bg-gray-100' : 'bg-gradient-to-br from-orange-50/80 to-white group-hover:from-orange-100/90 group-hover:to-orange-50/80 group-hover:scale-110 group-hover:rotate-3'}`}>
          {iconSvg ? <img src={iconSvg} alt={title} className={`w-14 h-14 transition-all duration-500 ${disabled ? 'opacity-50' : 'group-hover:scale-110'}`} /> : Icon ? <Icon className={`w-10 h-10 transition-all duration-500 ${disabled ? 'text-gray-400' : 'text-primary group-hover:scale-110'}`} /> : null}
          {!disabled && <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-500" />}
        </div>
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base text-foreground leading-tight">{title}</h3>
          {region && <p className={`text-xs tracking-wide ${disabled ? 'text-gray-400' : 'text-muted-foreground'}`}>
              {region}
            </p>}
          {disabled}
        </div>
      </div>
    </Card>;
  if (disabled) {
    return content;
  }
  return <Link to={link}>{content}</Link>;
};