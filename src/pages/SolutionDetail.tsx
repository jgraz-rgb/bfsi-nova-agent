import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import workflowImage from "@/assets/workflow-personal-loan-india.png";
import workflowGoldLoanIndia from "@/assets/workflow-gold-loan-india.png";
import workflowHomeLoanIndia from "@/assets/workflow-home-loan-india.png";
import workflowDigitalLoanIndia from "@/assets/workflow-digital-loan-india.png";
import workflowFinancialServicesIndia from "@/assets/workflow-financial-services-india.png";
import workflowInsuranceIndia from "@/assets/workflow-insurance-india.png";

const solutionLinks: Record<string, string> = {
  "financial-services-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/indexw.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "personal-loan-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/index.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "personal-loan-usa": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/indexash.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "gold-loan-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/indexgold.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "home-loan-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/output/index.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "insurance": "https://feature-mltools.searchunify.com/bfsi-agentic-suite/?agentConfig=kotakInsurance"
};

const solutionData: Record<string, { title: string; description: string; workflow: string }> = {
  "personal-loan-india": {
    title: "Personal Loan Origination (India)",
    description: "The Personal Loan Origination Agentic Solution enables seamless personal loan origination by pre-qualifying the user based on key parameters, presenting personalized pre-approved offers and collecting necessary documents digitally. Once the application is complete, it securely hands over the details to the bank for final underwriting and disbursement.",
    workflow: workflowImage
  },
  "personal-loan-usa": {
    title: "Personal Loan Origination (USA)",
    description: "Designed for the financial institutions in U.S., this agentic solution guides users through a simplified digital journey to check eligibility, verify identity and view personalized loan offers. It streamlines document collection and once the application is complete, it securely hands over the details to the bank for final underwriting and disbursement",
    workflow: workflowImage
  },
  "gold-loan-india": {
    title: "Gold Loan Origination (India)",
    description: "The Gold Loan Origination Agentic Solution automates the gold loan journey by helping users schedule valuation appointments, verify their identity and upload preliminary KYC details. The flow starts with collecting basic information about the customer followed by a tentative gold loan offer and scheduling of physical appointment",
    workflow: workflowGoldLoanIndia
  },
  "home-loan-india": {
    title: "Home Loan Origination (India)",
    description: "The Home Loan Origination Agentic Solution assists users through a structured, step-by-step process covering eligibility checks, KYC verification, income validation, and property inspection scheduling. It simplifies complex workflows, enabling banks to deliver a premium, transparent and time-efficient home financing experience",
    workflow: workflowHomeLoanIndia
  },
  "digital-loan-india": {
    title: "Digital Personal Loan Application (India)",
    description: "The Digital Personal Loan Application Agentic Solution is a comprehensive end-to-end digital solution that manages the entire personal loan lifecycle from origination to pre-qualified offer generation to credit underwriting to final approval and communication of disbursement",
    workflow: workflowDigitalLoanIndia
  },
  "financial-services-india": {
    title: "Financial Services Support (USA)",
    description: "An Agentic AI Support Solution built for financial services to assist customers get instant resolution to account management (e.g email address update, password reset, opening an account, linking an external bank account, etc.), credit (e.g retrieving credit report, suggesting a credit card, applying for a credit card, tracking spending habits, etc.) and service related queries",
    workflow: workflowFinancialServicesIndia
  },
  "insurance": {
    title: "Voice based Term Insurance Application (India)",
    description: "The Term Insurance Application Voice Agent enables customers to apply for term insurance through a conversational voice interface. The AI agent guides customers through a 15-step process covering basic information collection, plan selection, eligibility assessment, KYC verification, health questionnaires, employment details, and documentation. It seamlessly handles OTP verification, bank account setup, policy review, and coordinates with CRM for ticket management and support team handoff when needed",
    workflow: workflowInsuranceIndia
  }
};

const agentsData: Record<string, Array<{ name: string; description: string }>> = {
  "personal-loan-india": [
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
  ],
  "personal-loan-usa": [
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
  ],
  "digital-loan-india": [
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
      name: "AI Loan Underwriting Agent",
      description: "Calculates the final loan offer based on application details and predefined credit policies. If approved, it displays the final approved loan amount, EMI, tenure, rate of interest (or APR) and processing fees (if any)"
    },
    {
      name: "AI Disbursal Agent",
      description: "Manages e-signing of loan agreement and coordinates the communication for loan disbursal with the customer"
    },
    {
      name: "AI Knowledge Agent",
      description: "Analyses the conversation between the customer and the human support agent. Detects information gaps and auto-generates documentation from customer-human support agent interactions"
    },
    {
      name: "AI Feedback Analyst",
      description: "Captures feedback as given by the loan underwriters or quality auditors on the applications reviewed by the AI agents. Suggests changes to AI agent prompts based on the feedback shared"
    },
    {
      name: "Intent Detection Agent",
      description: "Identifies user intent and routes queries to the appropriate AI or workflow agent"
    },
    {
      name: "AI Customer Service Agent",
      description: "Responsible for communication with the customer. Provides instant, accurate responses to customer queries using the knowledge base. Raises a ticket for complex queries"
    }
  ],
  "financial-services-india": [
    {
      name: "AI Support Agent",
      description: "Responsible for communication with the customer. Provides instant, accurate responses to customer queries using the knowledge base. Raises a ticket for complex queries"
    },
    {
      name: "AI Agent Partner",
      description: "Assists human support agents with real time insights and contextaware suggestions for faster resolution of the issue shared by the customer"
    },
    {
      name: "AI Knowledge Agent",
      description: "Analyses the conversation between the customer and the human support agent. Detects information gaps and auto-generates documentation from customer-human support agent interactions"
    }
  ],
  "insurance": [
    {
      name: "Realtime Voice Agent",
      description: "Handles end-to-end term insurance application through voice interaction. Collects customer information, presents plan options, gathers KYC and health details, manages document uploads via email, handles OTP verification, and coordinates policy issuance and premium payment processing"
    }
  ],
  "default": [
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
    }
  ]
};

export default function SolutionDetail() {
  const { id } = useParams<{ id: string }>();
  const solution = id ? solutionData[id] : null;
  const agents = id && agentsData[id] ? agentsData[id] : agentsData["default"];
  const solutionUrl = id ? solutionLinks[id] : null;
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <main className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="mb-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Agentic Solutions</span>
          </Link>
          
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span>Agentic Solution</span>
                <span>→</span>
                <span className="text-foreground font-medium">{solution.title}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {solution.title}
              </h1>
            </div>
            
            {solutionUrl ? (
              <a 
                href={solutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
              >
                Try this Solution 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group">
                Try this Solution 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        <Tabs defaultValue="workflow" className="space-y-8">
          <TabsList className="bg-white border border-gray-200 p-1 shadow-sm">
            <TabsTrigger 
              value="workflow"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-md px-8 py-2.5 font-medium transition-all data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:rounded-full"
            >
              Workflow
            </TabsTrigger>
            <TabsTrigger 
              value="agents"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-primary rounded-md px-8 py-2.5 font-medium transition-all data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:rounded-full"
            >
              Agents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-br from-orange-50/50 to-orange-100/30 border border-orange-200/50 rounded-2xl p-8 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">ℹ</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-lg mb-3 text-foreground">Workflow Description</h2>
                  <p className="text-foreground/90 leading-relaxed">{solution.description}</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-white border border-gray-200 rounded-2xl p-10 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 group relative"
              onClick={() => setIsWorkflowOpen(true)}
            >
              <div className="absolute top-4 right-4 bg-primary/90 text-white rounded-lg px-4 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4" />
                <span className="text-sm font-medium">View Full Screen</span>
              </div>
              <img 
                src={solution.workflow} 
                alt="Workflow Diagram" 
                className="w-full h-auto rounded-xl shadow-sm"
              />
            </div>

            <Dialog open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
              <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                <div className="relative w-full h-full">
                  <DialogHeader className="px-6 pt-6 pb-4 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
                    <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-between">
                      <span>Workflow Diagram - {solution.title}</span>
                      <button
                        onClick={() => setIsWorkflowOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="overflow-auto max-h-[calc(95vh-100px)] p-8">
                    <img 
                      src={solution.workflow} 
                      alt="Workflow Diagram Full View" 
                      className="w-full h-auto rounded-xl shadow-2xl bg-white"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
