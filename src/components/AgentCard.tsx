import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AgentCardProps {
  name: string;
  description: string;
}

export const AgentCard = ({ name, description }: AgentCardProps) => {
  return (
    <Card className="group transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary/30 animate-fade-in bg-white/80 backdrop-blur-sm hover:bg-white/95"
    style={{ boxShadow: 'var(--shadow-card)' }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }}>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50/80 to-white flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:from-orange-100/90 group-hover:to-orange-50/80 group-hover:scale-110 group-hover:rotate-3 relative">
            <Bot className="w-8 h-8 text-primary transition-all duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-foreground mb-2 leading-tight">{name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
