import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImage from "@/assets/searchunify-logo.svg";

// Hand-painted brush stroke with organic, broken edges
const BrushStroke = ({ 
  className, 
  delay = 0,
  duration = 1.5,
  variant = 1,
}: { 
  className?: string;
  delay?: number;
  duration?: number;
  variant?: number;
}) => {
  // Different organic brush stroke paths with broken, hand-painted edges
  const paths = [
    // Variant 1: Wide sweep with texture
    "M5 28 C12 24, 18 32, 28 26 C38 20, 45 35, 58 28 C71 21, 78 33, 92 27 C106 21, 115 34, 128 26 C141 18, 152 32, 168 25 C184 18, 192 30, 195 28",
    // Variant 2: More irregular with gaps
    "M8 32 C15 22, 25 38, 35 28 C42 20, 48 18, 55 30 C65 42, 75 20, 88 28 C98 34, 108 22, 122 30 C138 40, 148 18, 165 28 C178 36, 188 24, 195 30",
    // Variant 3: Swooping with broken sections
    "M3 35 C18 18, 32 42, 48 30 C58 22, 62 38, 78 28 C88 20, 95 36, 112 28 C128 20, 138 38, 155 26 C168 16, 182 38, 197 28",
    // Variant 4: Thick textured stroke
    "M6 30 C20 20, 30 40, 45 28 C55 18, 65 35, 82 25 C95 17, 105 38, 125 28 C142 20, 155 36, 172 24 C185 14, 195 32, 198 28",
  ];

  const selectedPath = paths[(variant - 1) % paths.length];

  return (
    <motion.svg
      viewBox="0 0 200 60"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      preserveAspectRatio="none"
    >
      {/* Main stroke with organic feel */}
      <motion.path
        d={selectedPath}
        fill="none"
        stroke="hsl(28, 100%, 52%)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ 
          pathLength: { duration, delay, ease: "easeOut" },
          opacity: { duration: 0.3, delay }
        }}
        style={{ 
          filter: "url(#brush-texture)",
        }}
      />
      {/* Secondary thinner overlay for texture */}
      <motion.path
        d={selectedPath}
        fill="none"
        stroke="hsl(28, 100%, 60%)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 4 12 6 4 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ 
          pathLength: { duration: duration * 0.8, delay: delay + 0.2, ease: "easeOut" },
          opacity: { duration: 0.3, delay: delay + 0.2 }
        }}
      />
      {/* Brush texture filter */}
      <defs>
        <filter id="brush-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </motion.svg>
  );
};

// Swirling accent brush with hand-painted feel
const SwirlingBrush = ({ 
  className, 
  delay = 0,
  variant = 1,
}: { 
  className?: string;
  delay?: number;
  variant?: number;
}) => {
  const paths = [
    "M25 50 C30 25, 55 20, 75 35 C90 48, 85 70, 60 75 C40 78, 25 65, 30 50",
    "M30 55 C35 30, 60 28, 72 42 C82 54, 78 72, 55 76 C38 79, 28 68, 32 55",
    "M22 48 C28 22, 58 18, 78 38 C92 52, 82 75, 58 78 C35 80, 20 62, 25 48",
  ];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial={{ rotate: -90, scale: 0, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 0.5 }}
      transition={{ 
        duration: 1.2,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      <motion.path
        d={paths[(variant - 1) % paths.length]}
        fill="none"
        stroke="hsl(28, 100%, 55%)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        style={{ filter: "url(#swirl-texture)" }}
      />
      <motion.path
        d={paths[(variant - 1) % paths.length]}
        fill="none"
        stroke="hsl(28, 100%, 65%)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5 8 3 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 0.8, delay: delay + 0.5, ease: "easeOut" }}
      />
      <defs>
        <filter id="swirl-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </motion.svg>
  );
};

// Soft accent blob
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
    animate={{ scale: 1, opacity: 0.12, rotate: 0 }}
    transition={{ 
      duration: 1.2,
      delay,
      ease: "easeOut"
    }}
    style={{
      background: "radial-gradient(ellipse at center, hsl(28, 100%, 55%) 0%, hsl(28, 100%, 50%) 30%, transparent 70%)",
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
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative flex items-center justify-center">
      {/* Brush strokes - ONLY appear after clicking Get Started */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Large sweeping strokes */}
            <BrushStroke 
              className="absolute top-[8%] left-[-8%] w-[55%] h-auto" 
              delay={0.1}
              duration={1.4}
              variant={1}
            />
            <BrushStroke 
              className="absolute top-[22%] right-[-12%] w-[50%] h-auto rotate-[8deg]" 
              delay={0.3}
              duration={1.6}
              variant={2}
            />
            <BrushStroke 
              className="absolute bottom-[18%] left-[5%] w-[45%] h-auto -rotate-[5deg]" 
              delay={0.5}
              duration={1.3}
              variant={3}
            />
            <BrushStroke 
              className="absolute bottom-[32%] right-[2%] w-[40%] h-auto rotate-[-12deg]" 
              delay={0.7}
              duration={1.5}
              variant={4}
            />
            <BrushStroke 
              className="absolute top-[45%] left-[-5%] w-[35%] h-auto rotate-[15deg]" 
              delay={0.4}
              duration={1.2}
              variant={2}
            />

            {/* Swirling accents */}
            <SwirlingBrush 
              className="absolute top-[12%] left-[18%] w-28 h-28" 
              delay={0.2}
              variant={1}
            />
            <SwirlingBrush 
              className="absolute top-[18%] right-[22%] w-24 h-24" 
              delay={0.4}
              variant={2}
            />
            <SwirlingBrush 
              className="absolute bottom-[22%] left-[22%] w-32 h-32" 
              delay={0.6}
              variant={3}
            />
            <SwirlingBrush 
              className="absolute bottom-[12%] right-[18%] w-28 h-28" 
              delay={0.3}
              variant={1}
            />

            {/* Soft accent blobs */}
            <AccentBlob 
              className="absolute top-[3%] right-[28%] w-72 h-72 rounded-full" 
              delay={0.5}
            />
            <AccentBlob 
              className="absolute bottom-[8%] left-[8%] w-56 h-56 rounded-full" 
              delay={0.7}
            />
          </motion.div>
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
              className="bg-card/90 backdrop-blur-md border border-border rounded-2xl p-8 shadow-2xl"
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
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
