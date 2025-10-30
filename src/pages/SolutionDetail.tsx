import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import workflowImage from "@/assets/workflow-personal-loan-india.png";

const solutionData: Record<string, { title: string; description: string; workflow: string }> = {
  "personal-loan-india": {
    title: "Personal Loan Origination (India)",
    description: "The Personal Loan Origination Agentic Solution enables seamless personal loan origination by pre-qualifying the user based on key parameters, presenting personalized pre-approved offers and collecting necessary documents digitally. Once the application is complete, it securely hands over the details to the bank for final underwriting and disbursement.",
    workflow: workflowImage
  },
  "personal-loan-usa": {
    title: "Personal Loan Origination (USA)",
    description: "The Personal Loan Origination Agentic Solution enables seamless personal loan origination by pre-qualifying the user based on key parameters, presenting personalized pre-approved offers and collecting necessary documents digitally. Once the application is complete, it securely hands over the details to the bank for final underwriting and disbursement.",
    workflow: workflowImage
  },
  "gold-loan-india": {
    title: "Gold Loan Origination (India)",
    description: "The Gold Loan Origination Agentic Solution streamlines gold loan applications through automated valuation, document verification, and instant loan offers based on gold purity and weight.",
    workflow: workflowImage
  },
  "home-loan-india": {
    title: "Home Loan Origination (India)",
    description: "The Home Loan Origination Agentic Solution simplifies home loan applications with property valuation, eligibility assessment, and comprehensive documentation support.",
    workflow: workflowImage
  },
  "digital-loan-india": {
    title: "Digital Personal Loan Application (India)",
    description: "The Digital Personal Loan Application provides a fully digital experience for loan applications with instant credit decisions and minimal documentation requirements.",
    workflow: workflowImage
  },
  "financial-services-india": {
    title: "Financial Services Support (India)",
    description: "The Financial Services Support Agentic Solution provides comprehensive customer service for various financial products through AI-powered assistance.",
    workflow: workflowImage
  }
};

const agents = [
  {
    name: "AI Pre-Qualification Agent",
    description: "Engages users with qualifying questions about personal information, KYC, loan needs, employment and income information to determine loan eligibility"
  },
  {
    name: "AI Pre-Qualified Offer Agent",
    description: "Computes personalized pre-qualified loan offers instantly. If approved, the AI agent will display pre-qualified loan amount, tentative ROI (or APR) and tenure, estimated EMI and processing fees (if any)"
  },
  {
    name: "Documentation Agent",
    description: "Collects and validates digital documents required for loan application processing such as proof of identity, proof of address, proof of income as applicable"
  },
  {
    name: "Intent Detection Agent",
    description: "Identifies user intent and routes queries to the appropriate AI or workflow agent"
  },
  {
    name: "AI Customer Service Agent",
    description: "Responsible for communication with the customer. Provides instant, accurate responses to customer queries using the knowledge base. Raises a ticket for complex queries"
  },
  {
    name: "AI Knowledge Agent",
    description: "Analyses the conversation between the customer and the human support agent. Detects information gaps and auto-generates documentation from customer-human support agent interactions"
  },
  {
    name: "AI Feedback Analyst",
    description: "Captures feedback as given by the loan underwriters or quality auditors on the applications reviewed by the AI agents. Suggests changes to AI agent prompts based on the feedback shared"
  }
];

export default function SolutionDetail() {
  const { id } = useParams<{ id: string }>();
  const solution = id ? solutionData[id] : null;

  if (!solution) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Solution not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Agentic Solution</span>
          </Link>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-3xl font-bold">
              <span className="text-muted-foreground">Agentic Solution</span>
              <span className="mx-3">→</span>
              <span className="text-primary">{solution.title}</span>
            </h1>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Try this Solution <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="workflow" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger 
              value="workflow"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Workflow
            </TabsTrigger>
            <TabsTrigger 
              value="agents"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Agents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6 animate-fade-in">
            <div className="border-2 border-blue-200 bg-blue-50/30 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-3">Workflow Description :</h2>
              <p className="text-foreground leading-relaxed">{solution.description}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-sm">
              <img 
                src={solution.workflow} 
                alt="Workflow Diagram" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </TabsContent>

          <TabsContent value="agents" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => (
                <AgentCard key={index} name={agent.name} description={agent.description} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
