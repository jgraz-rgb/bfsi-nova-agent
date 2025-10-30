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
    <Card className={`group relative overflow-hidden border-2 transition-all duration-300 ${
      disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-primary/30'
    }`}>
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/10">
          <Icon className="w-10 h-10 text-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">{title}</h3>
          {region && <p className="text-sm text-muted-foreground mt-1">({region})</p>}
          {disabled && (
            <p className="text-xs text-muted-foreground mt-2 italic">Coming Soon</p>
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
