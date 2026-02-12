import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Maximize2, X, Lightbulb } from "lucide-react";
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import workflowImage from "@/assets/workflow-personal-loan.png";
import workflowGoldLoanIndia from "@/assets/workflow-gold-loan-india.png";
import workflowHomeLoanIndia from "@/assets/workflow-home-loan-india.png";
import workflowDigitalLoanIndia from "@/assets/workflow-digital-loan-india.png";
import workflowFinancialServicesIndia from "@/assets/workflow-financial-services-india.png";
import workflowInsuranceIndia from "@/assets/workflow-insurance-india.png";
import workflowHealthInsuranceUsa from "@/assets/workflow-health-insurance-usa.png";
import workflowAutoInsuranceUsa from "@/assets/workflow-auto-insurance-usa.png";

const solutionLinks: Record<string, string> = {
  "financial-services-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/indexw.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "personal-loan-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/index.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "personal-loan-usa": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/indexash.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "gold-loan-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/indexgold.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "home-loan-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/output/index.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "digital-loan-india": "https://feature-mltools.searchunify.com/resources/search_clients_custom/bc8b786e-6def-11f0-bf8d-0242ac120023/download/indexbank.html?searchString=&activeType=all&from=0&sortby=_score&orderBy=desc&pageNo=1&aggregations=%5B%5D&uid=4d747e3d-690e-11ef-937c-0242ac120014&resultsPerPage=10&exactPhrase=&withOneOrMore=&withoutTheWords=&pageSize=10&language=en&suCaseCreate=false",
  "insurance": "https://feature-mltools.searchunify.com/bfsi-agentic-suite/loan?agentConfig=kotakInsurance",
  "health-insurance-usa": "https://feature-mltools.searchunify.com/bfsi-agentic-suite/health?agentConfig=usHealthInsurance",
  "auto-insurance-usa": ""
};

const solutionData: Record<string, { title: string; description: string; workflow: string }> = {
  "personal-loan-india": {
    title: "Personal Loan Origination (India)",
    description: "The Personal Loan Origination Agentic Solution enables seamless personal loan origination by pre-qualifying the user based on key parameters, presenting personalized pre-approved offers and collecting necessary documents digitally. Once the application is complete, it securely hands over the details to the bank for final underwriting and disbursement.\n\n**Note**: Use the following information while testing, as and when prompted\n\n• **Name**: Arkadeep Joardar | **Aadhar Number**: 8060 1212 1818 | **Mobile Number**: 9593959473 | **OTP for mobile verification**: Enter any 6-digit OTP | **PAN**: AUFPJ1111A | **Date of Birth**: 18/05/1994 | **Permanent Address with Pincode**: 101/23, Street 1501, Park Street, Kolkata - 700016 | **Pincode**: 700016\n\n• **Email**: Enter your email ID\n\n• Choose **Type of Customer** as \"Salaried\"",
    workflow: workflowImage
  },
  "personal-loan-usa": {
    title: "Personal Loan Origination (USA)",
    description: "Designed for the financial institutions in U.S., this agentic solution guides users through a simplified digital journey to check eligibility, verify identity and view personalized loan offers. It streamlines document collection and once the application is complete, it securely hands over the details to the bank for final underwriting and disbursement\n\n**Note**: Use the following information while testing, as and when prompted\n\n• **Name**: Arkadeep Joardar | **SSN**: 900-15-6012 | **Mobile Number**: 9593959473 | **OTP for mobile verification**: Enter any 6-digit OTP | **Date of Birth**: 9/10/1991 | **Permanent Address with Pincode**: 1203, Abbey Street, Detroit, 48226\n\n• **Email**: Enter your email ID\n\n• Choose **Type of Customer** as \"Salaried\"",
    workflow: workflowImage
  },
  "gold-loan-india": {
    title: "Gold Loan Origination (India)",
    description: "The Gold Loan Origination Agentic Solution automates the gold loan journey by helping users schedule valuation appointments, verify their identity and upload preliminary KYC details. The flow starts with collecting basic information about the customer followed by a tentative gold loan offer and scheduling of physical appointment\n\n**Note**: Use the following information while testing, as and when prompted\n\n• **Name**: Arkadeep Joardar | **Aadhar Number**: 8060 1212 1818 | **Mobile Number**: 9593959473 | **OTP for mobile verification**: Enter any 6-digit OTP | **PAN**: AUFPJ1111A | **Date of Birth**: 18/05/1994 | **Permanent Address with Pincode**: 101/23, Street 1501, Park Street, Kolkata - 700016 | **Pincode**: 700016\n\n• **Email**: Enter your email ID",
    workflow: workflowGoldLoanIndia
  },
  "home-loan-india": {
    title: "Home Loan Origination (India)",
    description: "The Home Loan Origination Agentic Solution assists users through a structured, step-by-step process covering eligibility checks, KYC verification, income validation, and property inspection scheduling. It simplifies complex workflows, enabling banks to deliver a premium, transparent and time-efficient home financing experience\n\n**Note**: Use the following information while testing, as and when prompted\n\n• **Name**: Arkadeep Joardar | **Aadhar Number**: 8060 1212 1818 | **Mobile Number**: 9593959473 | **OTP for mobile verification**: Enter any 6-digit OTP | **PAN**: AUFPJ1111A | **Date of Birth**: 18/05/1994 | **Permanent Address with Pincode**: 101/23, Street 1501, Park Street, Kolkata - 700016 | **Pincode**: 700016\n\n• **Email**: Enter your email ID\n\n• Choose **Type of Customer** as \"Salaried\"",
    workflow: workflowHomeLoanIndia
  },
  "digital-loan-india": {
    title: "Digital Personal Loan Application (India)",
    description: "The Digital Personal Loan Application Agentic Solution is a comprehensive end-to-end digital solution that manages the entire personal loan lifecycle from origination to pre-qualified offer generation to credit underwriting to final approval and communication of disbursement\n\n**Note**: Use the following information while testing, as and when prompted\n\n• **Name**: Arkadeep Joardar | **Aadhar Number**: 8060 1212 1818 | **Mobile Number**: 9593959473 | **OTP for mobile verification**: Enter any 6-digit OTP | **PAN**: AUFPJ1111A | **Date of Birth**: 18/05/1994 | **Permanent Address with Pincode**: 101/23, Street 1501, Park Street, Kolkata - 700016 | **Pincode**: 700016\n\n• **Email**: Enter your email ID\n\n• Choose **Type of Customer** as \"Salaried\"",
    workflow: workflowDigitalLoanIndia
  },
  "financial-services-india": {
    title: "Personal Finance Customer Support Agent (USA)",
    description: "An Agentic AI Support Solution built for a US-based multinational personal finance company designed to assist customers get instant resolution to account management (e.g email address update, password reset, opening an account, linking an external bank account, etc.), credit (e.g retrieving credit report, suggesting a credit card, applying for a credit card, tracking spending habits, etc.) and service related queries\n\n**Note**: Use the following information while testing, as and when prompted\n\n• **Full Name**: Brian Corcoran\n• **Registered Email ID**: brianc@grazitti.com\n• **Phone Number**: +1-212-456-7890\n• **Home Address**: 132 My Street, Kingston, New York 12401\n• **Birth Year**: 01/01/1990\n\nStart a conversation by asking any of the following:\n\n• I want to update my registered email address\n\n• I need help to reset my password\n\n• I want to open a CK Money Spend Account\n\n• I want to link my bank account to the Spend Account\n\n• I want to download my credit report\n\n• I am looking for a credit card\n\n• I want to see what I spent over the last 6 months",
    workflow: workflowFinancialServicesIndia
  },
  "insurance": {
    title: "Voice based ULIP Origination (India)",
    description: "The Voice-based ULIP Origination Agentic Solution guides the customer through the complete Unit Linked Insurance Plan (ULIP) investment journey step-by-step, collecting personal, financial and risk profile details through a natural conversational flow. The agent helps the customer understand investment-cum-insurance benefits, explains NAV-based fund options, assists with fund selection based on risk profiling, and walks through premium allocation and charges. The underlying agent also uses email as a medium to confirm ULIP policy details with the customer, assist in uploading required documents, assist in paying the first premium and to finally share the policy document with the customer. At the end of the workflow, a ticket with transcripts and customer details gets created in a CRM.\n\n**Note**: Use the following information while testing, as and when prompted\n\n• **Aadhar Number**: 8060 1212 1818 | **Mobile Number**: 9593959473 | **OTP for mobile verification**: Enter any 6-digit OTP | **PAN**: AUFPJ1111A | **Date of Birth**: 18/05/1994 | **Permanent Address with Pincode**: 101/23, Street 1501, Park Street, Kolkata - 700016 | **Pincode**: 700016\n\n• **Email**: Enter your email ID",
    workflow: workflowInsuranceIndia
  },
  "health-insurance-usa": {
    title: "Voice based Health Insurance Renewal",
    description: "The Voice-based Health Insurance Renewal Solution assists insurance brokers in USA by automating the renewal process. This solution operates entirely over voice calls, where the AI agent proactively calls clients, gathers information, answers questions, negotiates with carrier, creates a proposal and completes renewal steps conversationally. At the end, the AI agent sends the policy documents to the client over an email.",
    workflow: workflowHealthInsuranceUsa
  },
  "auto-insurance-usa": {
    title: "Voice based Auto Insurance Origination (USA)",
    description: "The Voice-based Auto Insurance Agentic AI Solution guides customers through the complete quote-to-bind journey in a single natural conversation. Starting with identity verification and intelligent vehicle capture using VIN or conversational prompts, it collects driver history, evaluates current insurance status for competitive pricing, and explains coverage options in simple terms — while detecting discount eligibility and home-bundle opportunities. The agent transparently generates a personalized quote, handles payment options, and completes policy binding within minutes. At the end of the interaction, policy details and customer data are automatically logged into the CRM for follow-up and compliance.\n\n**Demo/Simulation Notes**:\n\n• **Pre-loaded sample VINs for vehicle lookup simulation**: 1HGBH41JXMN109186, 1FAFP404X1F192837, 2T1BURHE5JC045612, 5NPE24AF4FH123456, 1C4RJFBG8LC334455, 3VW2B7AJ5HM098765, 1G1BE5SM7H7154321, JN1EV7AR0JM654321, WAUENAF48KN112233\n\n• **OTP verification**: Accept any 6-digit code entered by the user",
    workflow: workflowAutoInsuranceUsa
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
      name: "AI ULIP Origination Agent",
      description: "Provides conversational guidance over voice to gather personal, financial and risk profile details required for the ULIP investment journey. The agent explains fund options, premium allocation, and investment-cum-insurance benefits. It also uses email to confirm ULIP policy information, support document uploads and premium payment, share the final policy document. It automatically creates a CRM ticket with transcripts and customer details."
    }
  ],
  "health-insurance-usa": [
    {
      name: "AI Health Insurance Renewal Agent",
      description: "Initiates client outreach over a phone call. Submits gathered data from client to the carrier and creates proposal for client. Assists clients in negotiating with carrier and then choosing the renewal plan. Conversationally completes the renewal flows as well as responds to customer queries."
    }
  ],
  "auto-insurance-usa": [
    {
      name: "AI Auto Insurance Origination Agent",
      description: "A voice-based agent that completes the end-to-end auto insurance quote-to-bind journey through a guided conversational flow while also answering customer questions in real time using the insurer's knowledge base. It seamlessly handles identity verification, data collection, coverage education, discount assessment, and policy binding — all within a single interaction."
    },
    {
      name: "Bundle Detection & Upsell Agent",
      description: "An intelligent agent that analyzes customer signals during the conversation — such as home ownership, existing policies, and profile data — to identify bundling opportunities and recommend relevant add-on or cross-sell products."
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

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!solution) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Solution not found</h1>
          <Link to="/solutions" className="text-primary hover:underline">
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
            to="/solutions" 
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
            
            {solutionUrl && (
              <a 
                href={solutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
              >
                Try this Solution 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
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
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">ℹ</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-lg mb-3 text-foreground">Workflow Description</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    {solution.description.split('\n\n')[0]}
                  </p>
                </div>
              </div>
            </div>

            {solution.description.split('\n\n').length > 1 && (
              <div className="bg-gradient-to-br from-orange-50/50 to-orange-100/30 border border-orange-200/50 rounded-2xl p-8 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg mb-3 text-foreground">Note</h2>
                    <div className="text-foreground/90 leading-relaxed">
                      {solution.description.split('\n\n').slice(1).map((paragraph, index) => (
                        <p key={index} className={index > 0 ? "mt-2" : ""}>
                          {paragraph.replace(/^\*\*Note\*\*:\s*/, '').split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={i}>{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
