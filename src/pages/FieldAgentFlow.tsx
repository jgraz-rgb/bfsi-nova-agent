import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { Header } from "@/components/Header";

export default function FieldAgentFlow() {
  const { id } = useParams<{ id: string }>();

  const leadOptions = [
    {
      title: "Morning Leads Update",
      description: "Review and process leads from overnight activity"
    },
    {
      title: "Evening Leads Update", 
      description: "End-of-day lead summary and follow-ups"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <main className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="mb-10">
          <Link 
            to={`/solution/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Solution</span>
          </Link>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span>Field Agent Flow</span>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Select either the <span className="font-semibold text-foreground">Morning</span> or <span className="font-semibold text-foreground">Evening</span> Leads update option on the page. To test the other option, simply refresh the page and select accordingly.
            </p>
            
            <button className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-primary to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <Play className="w-5 h-5 fill-white" />
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
