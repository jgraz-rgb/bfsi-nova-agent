import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AgentCardProps {
  name: string;
  description: string;
}

export const AgentCard = ({ name, description }: AgentCardProps) => {
  return (
    <Card className="group transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-primary/20 animate-fade-in bg-white">
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:from-primary/10 group-hover:to-primary/5 group-hover:scale-105 relative">
            <Bot className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300" />
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
