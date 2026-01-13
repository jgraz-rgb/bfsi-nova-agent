import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/searchunify-logo.svg";
import complianceBadges from "@/assets/compliance-badges.png";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "solutions" | "analytics">("home");
  const [showAnalytics, setShowAnalytics] = useState(false);
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
        <div className="container flex h-24 items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-start">
            <img src={logoImage} alt="SearchUnify" className="h-8 w-auto" />
            <span className="text-base font-semibold text-foreground ml-8">Agentic AI Suite</span>
            <span className="text-lg font-bold text-primary">for BFSI</span>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </button>
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
          {/* Welcome Tile */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold text-foreground mb-3">Welcome</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Purpose-built enterprise-grade AI solutions built for Banking, Financial Services and Insurance.
            </p>
          </Card>

          {/* Platform Overview */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">
              PLATFORM OVERVIEW
            </p>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-5 bg-card border-border text-center">
                <p className="text-4xl font-bold text-foreground mb-1">8</p>
                <p className="text-xs text-muted-foreground">Agentic AI Solutions Available</p>
              </Card>
              <Card className="p-5 bg-card border-border text-center">
                <p className="text-4xl font-bold text-foreground mb-1">2</p>
                <p className="text-xs text-muted-foreground">Voice-based Agentic AI Solutions</p>
              </Card>
              <Card className="p-5 bg-card border-border text-center flex flex-col items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500 mb-1" />
                <p className="text-xs text-muted-foreground">System Health : ACTIVE</p>
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
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Browse Agentic Solutions
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                View and launch available chat and voice based Agentic AI workflows
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate("/solutions")}
              >
                Agentic Solutions
              </Button>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                View Analytics
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track how agentic solutions are being used and monitor AI Agents performance
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowAnalytics(true)}
              >
                Core Analytics
              </Button>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Platform Documentation
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about different BFSI products and access reference guides
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                View Documentation
              </Button>
            </Card>
          </div>
        </div>

        {/* Row 3: Security & Compliance */}
        <Card className="p-8 bg-card border-border mb-8">
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-xl font-semibold text-foreground text-center">
              Enterprise-grade Security and Compliance you can trust
            </h3>
            <img 
              src={complianceBadges} 
              alt="Compliance certifications including ISO 27001, SOC 2, HIPAA, GDPR, PIMS, and CCPA" 
              className="max-w-full h-auto"
            />
          </div>
        </Card>

        {/* Footer CTA */}
        <div className="text-center py-6">
          <p className="text-muted-foreground mb-4">
            Have a specific Agentic AI use-case in mind?
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
    </div>
  );
}
