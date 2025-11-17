import { useState } from "react";
import { Header } from "@/components/Header";
import { SolutionCard } from "@/components/SolutionCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

// Import SVG icons
import personalLoanIcon from "@/assets/icons/personal-loan.svg";
import goldLoanIcon from "@/assets/icons/gold-loan.svg";
import homeLoanIcon from "@/assets/icons/home-loan.svg";
import digitalPersonalIcon from "@/assets/icons/digital-personal.svg";
import financialServicesIcon from "@/assets/icons/financial-services.svg";
import insuranceIcon from "@/assets/icons/insurance.svg";
export default function HomePage() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [bankingOpen, setBankingOpen] = useState(true);
  const [financialOpen, setFinancialOpen] = useState(true);
  const [insuranceOpen, setInsuranceOpen] = useState(true);
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <main className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            Agentic AI Suite for <span className="text-primary">BFSI</span>
          </h1>
          <p className="text-muted-foreground text-base">Purpose-built enterprise-grade AI solutions built for Banking, Financial Services and Insurance</p>
        </div>

        <Tabs value="solutions" className="mb-10">
          <TabsList className="bg-white border border-gray-200 p-1 shadow-sm">
            <TabsTrigger value="solutions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-md px-6 py-2 font-medium transition-all">
              Agentic Solution
            </TabsTrigger>
            <TabsTrigger value="analytics" onClick={e => {
            e.preventDefault();
            setShowAnalytics(true);
          }} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-md px-6 py-2 font-medium transition-all">
              Analytics
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-8">
          {/* Banking Solutions */}
          <Collapsible open={bankingOpen} onOpenChange={setBankingOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="bg-white border-2 border-primary px-8 py-5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all duration-300 group">
                <h2 className="text-lg font-semibold tracking-tight">
                  <span className="text-black">Agentic AI Solutions for </span>
                  <span className="text-primary font-bold">Banking</span>
                </h2>
                <ChevronDown className={`w-5 h-5 text-black transition-transform duration-300 ${bankingOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <SolutionCard iconSvg={personalLoanIcon} title="Personal Loan Origination" region="India" link="/solution/personal-loan-india" />
                <SolutionCard iconSvg={personalLoanIcon} title="Personal Loan Origination" region="USA" link="/solution/personal-loan-usa" />
                <SolutionCard iconSvg={goldLoanIcon} title="Gold Loan Origination" region="India" link="/solution/gold-loan-india" />
                <SolutionCard iconSvg={homeLoanIcon} title="Home Loan Origination" region="India" link="/solution/home-loan-india" />
                <SolutionCard iconSvg={digitalPersonalIcon} title="Digital Personal Loan Application" region="India" link="/solution/digital-loan-india" />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Financial Services */}
          <Collapsible open={financialOpen} onOpenChange={setFinancialOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="bg-white border-2 border-primary px-8 py-5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all duration-300 group">
                <h2 className="text-lg font-semibold tracking-tight">
                  <span className="text-black">Agentic AI Solutions for </span>
                  <span className="text-primary font-bold">Financial Services</span>
                </h2>
                <ChevronDown className={`w-5 h-5 text-black transition-transform duration-300 ${financialOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <SolutionCard iconSvg={financialServicesIcon} title="Financial Services Support" region="USA" link="/solution/financial-services-india" />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Insurance */}
          <Collapsible open={insuranceOpen} onOpenChange={setInsuranceOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="bg-white border-2 border-primary px-8 py-5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all duration-300 group">
                <h2 className="text-lg font-semibold tracking-tight">
                  <span className="text-black">Agentic AI Solutions for </span>
                  <span className="text-primary font-bold">Insurance</span>
                </h2>
                <ChevronDown className={`w-5 h-5 text-black transition-transform duration-300 ${insuranceOpen ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <SolutionCard iconSvg={insuranceIcon} title="Voice based Term Insurance Application" region="India" link="/solution/insurance" />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>

      {/* Analytics Coming Soon Overlay */}
      {showAnalytics && <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in px-4" onClick={() => setShowAnalytics(false)}>
          <div className="bg-white rounded-3xl p-12 max-w-lg w-full shadow-2xl animate-scale-in border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <span className="text-5xl">📊</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tight">Analytics</h3>
                <p className="text-muted-foreground text-base">Coming Soon. Stay Tuned</p>
              </div>
              <button onClick={() => setShowAnalytics(false)} className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium">
                Close
              </button>
            </div>
          </div>
        </div>}
    </div>;
}