import { useState } from "react";
import { Header } from "@/components/Header";
import { SolutionCard } from "@/components/SolutionCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, User, DollarSign, Building2, Home, FileText, HandCoins, Shield } from "lucide-react";

export default function HomePage() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [bankingOpen, setBankingOpen] = useState(true);
  const [financialOpen, setFinancialOpen] = useState(true);
  const [insuranceOpen, setInsuranceOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Agentic AI Suite for <span className="text-primary">BFSI</span>
          </h1>
        </div>

        <Tabs value="solutions" className="mb-8">
          <TabsList className="bg-secondary">
            <TabsTrigger value="solutions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Agentic Solution
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              onClick={(e) => {
                e.preventDefault();
                setShowAnalytics(true);
              }}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-6">
          {/* Banking Solutions */}
          <Collapsible open={bankingOpen} onOpenChange={setBankingOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="bg-primary text-primary-foreground px-6 py-4 rounded-lg flex items-center justify-between hover:opacity-90 transition-opacity">
                <h2 className="text-lg font-semibold">
                  Agentic AI Solutions For <span className="font-bold">Banking</span>
                </h2>
                <ChevronDown className={`w-5 h-5 transition-transform ${bankingOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <SolutionCard
                  icon={User}
                  title="Personal Loan Origination"
                  region="India"
                  link="/solution/personal-loan-india"
                />
                <SolutionCard
                  icon={User}
                  title="Personal Loan Origination"
                  region="USA"
                  link="/solution/personal-loan-usa"
                />
                <SolutionCard
                  icon={DollarSign}
                  title="Gold Loan Origination"
                  region="India"
                  link="/solution/gold-loan-india"
                />
                <SolutionCard
                  icon={Home}
                  title="Home Loan Origination"
                  region="India"
                  link="/solution/home-loan-india"
                />
                <SolutionCard
                  icon={FileText}
                  title="Digital Personal Loan Application"
                  region="India"
                  link="/solution/digital-loan-india"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Financial Services */}
          <Collapsible open={financialOpen} onOpenChange={setFinancialOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="bg-primary text-primary-foreground px-6 py-4 rounded-lg flex items-center justify-between hover:opacity-90 transition-opacity">
                <h2 className="text-lg font-semibold">
                  Agentic AI Solutions For <span className="font-bold">Financial Services</span>
                </h2>
                <ChevronDown className={`w-5 h-5 transition-transform ${financialOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <SolutionCard
                  icon={HandCoins}
                  title="Financial Services Support"
                  region="India"
                  link="/solution/financial-services-india"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Insurance */}
          <Collapsible open={insuranceOpen} onOpenChange={setInsuranceOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="bg-primary text-primary-foreground px-6 py-4 rounded-lg flex items-center justify-between hover:opacity-90 transition-opacity">
                <h2 className="text-lg font-semibold">
                  Agentic AI Solutions For <span className="font-bold">Insurance</span>
                </h2>
                <ChevronDown className={`w-5 h-5 transition-transform ${insuranceOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <SolutionCard
                  icon={Shield}
                  title="Insurance Solutions"
                  region="Coming Soon"
                  link="/solution/insurance"
                  disabled
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>

      {/* Analytics Coming Soon Overlay */}
      {showAnalytics && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
          onClick={() => setShowAnalytics(false)}
        >
          <div 
            className="bg-background rounded-2xl p-12 max-w-md shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold">Analytics</h3>
              <p className="text-muted-foreground text-lg">This feature is coming soon.</p>
              <button
                onClick={() => setShowAnalytics(false)}
                className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
