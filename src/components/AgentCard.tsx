import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AgentCardProps {
  name: string;
  description: string;
}

export const AgentCard = ({ name, description }: AgentCardProps) => {
  return (
    <Card className="group border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/30 animate-fade-in">
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary/10">
            <Bot className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-foreground mb-2">{name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
