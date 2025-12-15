import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FieldAgentFlow() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <main className="container mx-auto px-6 py-10 max-w-3xl">
        <Link 
          to={`/solution/${id}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Solution</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Field Agent Flow
          </h1>
          
          <p className="text-muted-foreground leading-relaxed">
            Select either the Morning or Evening Leads update option on the page. To test the other option, simply refresh the page and select accordingly.
          </p>

          <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white px-8 py-2 rounded-xl shadow-lg">
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
