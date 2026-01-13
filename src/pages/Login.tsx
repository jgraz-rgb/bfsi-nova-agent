import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImage from "@/assets/searchunify-logo.svg";

const BrushStroke = ({ 
  className, 
  delay = 0,
  duration = 1.2,
}: { 
  className?: string;
  delay?: number;
  duration?: number;
}) => (
  <motion.svg
    viewBox="0 0 200 60"
    className={className}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ 
      pathLength: { duration, delay, ease: "easeInOut" },
      opacity: { duration: 0.3, delay }
    }}
  >
    <motion.path
      d="M10 30 Q 50 10, 100 30 T 190 30"
      fill="none"
      stroke="hsl(28, 100%, 50%)"
      strokeWidth="8"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration, delay, ease: "easeInOut" }}
      style={{ filter: "blur(1px)" }}
    />
  </motion.svg>
);

const SwirlingBrush = ({ 
  className, 
  delay = 0,
}: { 
  className?: string;
  delay?: number;
}) => (
  <motion.svg
    viewBox="0 0 100 100"
    className={className}
    initial={{ rotate: -180, scale: 0, opacity: 0 }}
    animate={{ rotate: 0, scale: 1, opacity: 0.6 }}
    transition={{ 
      duration: 1.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
  >
    <motion.path
      d="M20 50 Q 50 20, 80 50 Q 50 80, 20 50"
      fill="none"
      stroke="hsl(28, 100%, 55%)"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeInOut" }}
    />
  </motion.svg>
);

const AccentBlob = ({ 
  className, 
  delay = 0,
}: { 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial={{ scale: 0, opacity: 0, rotate: -45 }}
    animate={{ scale: 1, opacity: 0.15, rotate: 0 }}
    transition={{ 
      duration: 1,
      delay,
      ease: "easeOut"
    }}
    style={{
      background: "radial-gradient(circle, hsl(28, 100%, 50%) 0%, transparent 70%)",
    }}
  />
);

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home after login
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative flex items-center justify-center">
      {/* Background brush strokes - always visible but subtle */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showLogin ? 1 : 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <BrushStroke 
          className="absolute top-[10%] left-[-5%] w-[40%] opacity-20" 
          delay={showLogin ? 0.2 : 0}
          duration={1.5}
        />
        <BrushStroke 
          className="absolute top-[25%] right-[-10%] w-[50%] opacity-15 rotate-12" 
          delay={showLogin ? 0.4 : 0.2}
          duration={1.8}
        />
        <BrushStroke 
          className="absolute bottom-[20%] left-[10%] w-[35%] opacity-20 -rotate-6" 
          delay={showLogin ? 0.6 : 0.4}
          duration={1.4}
        />
        <BrushStroke 
          className="absolute bottom-[35%] right-[5%] w-[30%] opacity-15 rotate-[-15deg]" 
          delay={showLogin ? 0.8 : 0.6}
          duration={1.6}
        />
      </motion.div>

      {/* Swirling accents - appear on login click */}
      <AnimatePresence>
        {showLogin && (
          <>
            <SwirlingBrush 
              className="absolute top-[15%] left-[15%] w-32 h-32" 
              delay={0.1}
            />
            <SwirlingBrush 
              className="absolute top-[20%] right-[20%] w-24 h-24" 
              delay={0.3}
            />
            <SwirlingBrush 
              className="absolute bottom-[25%] left-[20%] w-28 h-28" 
              delay={0.5}
            />
            <SwirlingBrush 
              className="absolute bottom-[15%] right-[15%] w-36 h-36" 
              delay={0.2}
            />
            <AccentBlob 
              className="absolute top-[5%] right-[25%] w-64 h-64 rounded-full" 
              delay={0.4}
            />
            <AccentBlob 
              className="absolute bottom-[10%] left-[10%] w-48 h-48 rounded-full" 
              delay={0.6}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          {!showLogin ? (
            /* Splash Screen */
            <motion.div
              key="splash"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8"
              >
                <img 
                  src={logoImage} 
                  alt="SearchUnify" 
                  className="h-10 mx-auto mb-6" 
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold text-foreground mb-4"
              >
                Agentic AI Suite
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-muted-foreground mb-3"
              >
                for <span className="text-primary font-semibold">BFSI</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-muted-foreground mb-10 max-w-sm mx-auto"
              >
                Purpose-built enterprise-grade AI solutions for Banking, Financial Services and Insurance
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Button
                  size="lg"
                  onClick={() => setShowLogin(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            /* Login Form */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-center mb-8"
              >
                <img 
                  src={logoImage} 
                  alt="SearchUnify" 
                  className="h-8 mx-auto mb-4" 
                />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome Back
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sign in to access your AI solutions
                </p>
              </motion.div>

              <form onSubmit={handleLogin} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border focus:border-primary"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border focus:border-primary"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex items-center justify-between text-sm"
                >
                  <button 
                    type="button"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 font-medium"
                  >
                    Sign In
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="text-center"
                >
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    ← Back to welcome
                  </button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </div>
  );
}
