import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  region?: string;
  link: string;
  disabled?: boolean;
}

export const SolutionCard = ({ icon: Icon, title, region, link, disabled }: SolutionCardProps) => {
  const content = (
    <Card className={`group relative overflow-hidden transition-all duration-300 ${
      disabled 
        ? 'opacity-40 cursor-not-allowed bg-gray-50' 
        : 'cursor-pointer bg-white hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-primary/20'
    }`}>
      <div className="p-8 flex flex-col items-center text-center space-y-5">
        <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          disabled 
            ? 'bg-gray-100' 
            : 'bg-gradient-to-br from-orange-50 to-orange-100/50 group-hover:from-primary/10 group-hover:to-primary/5 group-hover:scale-110'
        }`}>
          <Icon className={`w-8 h-8 transition-colors duration-300 ${
            disabled ? 'text-gray-400' : 'text-primary group-hover:text-primary'
          }`} />
          {!disabled && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300" />
          )}
        </div>
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base text-foreground leading-tight">{title}</h3>
          {region && (
            <p className={`text-xs tracking-wide ${
              disabled ? 'text-gray-400' : 'text-muted-foreground'
            }`}>
              {region}
            </p>
          )}
          {disabled && (
            <p className="text-xs text-gray-400 mt-2 italic font-medium">Coming Soon</p>
          )}
        </div>
      </div>
    </Card>
  );

  if (disabled) {
    return content;
  }

  return <Link to={link}>{content}</Link>;
};
