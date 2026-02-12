import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SolutionCard } from "@/components/SolutionCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from "@/assets/searchunify-logo.svg";

// Import icons
import personalLoanIcon from "@/assets/icons/personal-loan-origination.png";
import goldLoanIcon from "@/assets/icons/gold-loan-new.png";
import homeLoanIcon from "@/assets/icons/home-loan-new.png";
import digitalPersonalIcon from "@/assets/icons/digital-personal-loan.png";
import financialServicesIcon from "@/assets/icons/personal-finance-support.png";
import insuranceIcon from "@/assets/icons/term-insurance-new.png";
import healthInsuranceIcon from "@/assets/icons/health-insurance-new.png";
import autoInsuranceIcon from "@/assets/icons/auto-insurance.png";

export default function AgenticSolutionsPage() {
  const [activeTab, setActiveTab] = useState<"home" | "solutions" | "analytics">("solutions");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [bankingOpen, setBankingOpen] = useState(true);
  const [financialOpen, setFinancialOpen] = useState(true);
  const [insuranceOpen, setInsuranceOpen] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (tab: "home" | "solutions" | "analytics") => {
    if (tab === "analytics") {
      setShowAnalytics(true);
    } else if (tab === "home") {
      navigate("/home");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="SearchUnify" className="h-6 w-auto" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <User className="h-5 w-5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)} className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => handleTabClick("home")}
              className="py-4 px-2 font-medium text-sm border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleTabClick("solutions")}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "solutions"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Agentic Solutions
            </button>
            <button
              onClick={() => handleTabClick("analytics")}
              className="py-4 px-2 font-medium text-sm border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
            >
              Analytics
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-6 py-8">

        <div className="space-y-16">
          {/* Banking Solutions */}
          <Collapsible open={bankingOpen} onOpenChange={setBankingOpen}>
            <CollapsibleTrigger className="text-left">
              <h2 className="text-base font-semibold tracking-tight inline-flex items-center py-2 pr-3 border-b border-border/60 hover:border-border transition-colors">
                <span className="text-foreground">Agentic AI Solutions for&nbsp;</span>
                <span className="text-primary font-bold">Banking</span>
                <ChevronDown
                  className={`w-4 h-4 ml-2 text-muted-foreground transition-transform duration-300 ${
                    bankingOpen ? "rotate-180" : ""
                  }`}
                />
              </h2>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                <SolutionCard
                  iconSvg={personalLoanIcon}
                  title="Personal Loan Origination"
                  region="India"
                  link="/solution/personal-loan-india"
                />
                <SolutionCard
                  iconSvg={personalLoanIcon}
                  title="Personal Loan Origination"
                  region="USA"
                  link="/solution/personal-loan-usa"
                />
                <SolutionCard
                  iconSvg={goldLoanIcon}
                  title="Gold Loan Origination"
                  region="India"
                  link="/solution/gold-loan-india"
                />
                <SolutionCard
                  iconSvg={homeLoanIcon}
                  title="Home Loan Origination"
                  region="India"
                  link="/solution/home-loan-india"
                />
                <SolutionCard
                  iconSvg={digitalPersonalIcon}
                  title="Digital Personal Loan Application"
                  region="India"
                  link="/solution/digital-loan-india"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Financial Services */}
          <Collapsible open={financialOpen} onOpenChange={setFinancialOpen}>
            <CollapsibleTrigger className="text-left">
              <h2 className="text-base font-semibold tracking-tight inline-flex items-center py-2 pr-3 border-b border-border/60 hover:border-border transition-colors">
                <span className="text-foreground">Agentic AI Solutions for&nbsp;</span>
                <span className="text-primary font-bold">Financial Services</span>
                <ChevronDown
                  className={`w-4 h-4 ml-2 text-muted-foreground transition-transform duration-300 ${
                    financialOpen ? "rotate-180" : ""
                  }`}
                />
              </h2>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                <SolutionCard
                  iconSvg={financialServicesIcon}
                  title="Personal Finance Customer Support Agent"
                  region="USA"
                  link="/solution/financial-services-india"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Insurance */}
          <Collapsible open={insuranceOpen} onOpenChange={setInsuranceOpen}>
            <CollapsibleTrigger className="text-left">
              <h2 className="text-base font-semibold tracking-tight inline-flex items-center py-2 pr-3 border-b border-border/60 hover:border-border transition-colors">
                <span className="text-foreground">Agentic AI Solutions for&nbsp;</span>
                <span className="text-primary font-bold">Insurance</span>
                <ChevronDown
                  className={`w-4 h-4 ml-2 text-muted-foreground transition-transform duration-300 ${
                    insuranceOpen ? "rotate-180" : ""
                  }`}
                />
              </h2>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                <SolutionCard
                  iconSvg={insuranceIcon}
                  title={
                    <>
                      Voice based
                      <br />
                      ULIP Origination
                    </>
                  }
                  region="India"
                  link="/solution/insurance"
                />
                <SolutionCard
                  iconSvg={healthInsuranceIcon}
                  title={
                    <>
                      Voice based
                      <br />
                      Health Insurance Renewal
                    </>
                  }
                  region="USA"
                  link="/solution/health-insurance-usa"
                />
                <SolutionCard
                  iconSvg={autoInsuranceIcon}
                  title={
                    <>
                      Voice based
                      <br />
                      Auto Insurance Origination
                    </>
                  }
                  region="USA"
                  link="/solution/auto-insurance-usa"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>

      {/* Analytics Coming Soon Overlay */}
      {showAnalytics && (
        <div
          className="fixed inset-0 bg-foreground/60 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in px-4"
          onClick={() => setShowAnalytics(false)}
        >
          <div
            className="bg-card rounded-2xl p-12 max-w-lg w-full shadow-2xl animate-scale-in border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-5xl">📊</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h3>
                <p className="text-muted-foreground text-base">Coming Soon. Stay Tuned</p>
              </div>
              <button
                onClick={() => setShowAnalytics(false)}
                className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to exit?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/")}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
