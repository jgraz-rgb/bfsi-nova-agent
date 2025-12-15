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
          <div className="space-y-4">
            {leadOptions.map((option, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-6 p-6 bg-white border border-gray-200 rounded-2xl hover:border-primary hover:shadow-lg transition-all duration-300 group text-left"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Play className="w-7 h-7 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
