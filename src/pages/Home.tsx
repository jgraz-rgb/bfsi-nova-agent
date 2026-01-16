import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, User, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import complianceBadges from "@/assets/compliance-badges.png";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "solutions" | "analytics">("home");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab: "home" | "solutions" | "analytics") => {
    if (tab === "analytics") {
      setShowAnalytics(true);
    } else if (tab === "solutions") {
      navigate("/solutions");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2">
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
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "home"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleTabClick("solutions")}
              className="py-4 px-2 font-medium text-sm border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
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
        {/* Row 1: Welcome & Platform Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Welcome Text (no card) */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-foreground mb-1">Welcome to</h2>
            <h2 className="text-3xl font-bold mb-3">
              <span className="text-foreground">SearchUnify's Agentic AI Suite for </span>
              <span className="text-primary">BFSI</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Purpose-built enterprise-grade AI solutions built for <span className="font-bold text-foreground">Banking</span>, <span className="font-bold text-foreground">Financial Services</span> and <span className="font-bold text-foreground">Insurance</span>.
            </p>
          </div>

          {/* Platform Overview */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">
              PLATFORM OVERVIEW
            </p>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6 bg-card border-border text-center hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow duration-300 min-h-[120px] flex flex-col justify-center">
                <p className="text-5xl font-bold text-foreground mb-2">8</p>
                <p className="text-sm text-muted-foreground">Agentic AI Solutions Available</p>
              </Card>
              <Card className="p-6 bg-card border-border text-center hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow duration-300 min-h-[120px] flex flex-col justify-center">
                <p className="text-5xl font-bold text-foreground mb-2">2</p>
                <p className="text-sm text-muted-foreground">Voice-based Agentic AI Solutions</p>
              </Card>
              <Card className="p-6 bg-card border-border text-center flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow duration-300 min-h-[120px]">
                <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                <p className="text-sm text-muted-foreground">System Health : <span className="text-green-500 font-semibold">ACTIVE</span></p>
              </Card>
            </div>
          </div>
        </div>

        {/* Row 2: Quick Actions */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">
            QUICK ACTIONS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 bg-card border-border min-h-[180px] flex flex-col hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Browse Agentic Solutions
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                View and launch available chat and voice based Agentic AI workflows
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                onClick={() => navigate("/solutions")}
              >
                Go to Agentic Solutions
              </Button>
            </Card>

            <Card className="p-8 bg-card border-border min-h-[180px] flex flex-col hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                View Analytics
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                Track how agentic solutions are being used and monitor AI Agents performance
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                onClick={() => setShowAnalytics(true)}
              >
                Go to Analytics
              </Button>
            </Card>

            <Card className="p-8 bg-card border-border min-h-[180px] flex flex-col hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Platform Documentation
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                Learn about different BFSI products and access reference guides
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
              >
                View Documentation
              </Button>
            </Card>
          </div>
        </div>

        {/* Row 3: Security & Compliance */}
        <Card className="p-10 bg-card border-border mb-8 hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold text-foreground">
                Enterprise-grade Security and Compliance you can trust
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our platform is built with security at its core, ensuring your data is protected with industry-leading standards and certifications.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src={complianceBadges} 
                alt="Compliance certifications including ISO 27001, SOC 2, HIPAA, GDPR, PIMS, and CCPA" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </Card>

        {/* Footer CTA */}
        <div className="text-center py-6">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">
            HAVE A SPECIFIC AGENTIC AI USE-CASE IN MIND?
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Contact Us
          </Button>
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
              <Button
                onClick={() => setShowAnalytics(false)}
                className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Close
              </Button>
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
