import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImage from "@/assets/searchunify-logo.svg";

// Tree ring style concave line with inner shadow effect
const TreeRing = ({ 
  size,
  delay = 0,
  thickness = 3,
  opacity = 0.3,
}: { 
  size: number;
  delay?: number;
  thickness?: number;
  opacity?: number;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
      border: `${thickness}px solid hsl(28, 80%, 75%)`,
      boxShadow: `
        inset 2px 2px 4px hsl(28, 60%, 60%),
        inset -1px -1px 3px hsl(28, 100%, 90%),
        0 0 8px hsl(28, 80%, 80% / 0.3)
      `,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity }}
    transition={{ 
      scale: { duration: 0.6, delay, ease: "easeOut" },
      opacity: { duration: 0.3, delay }
    }}
  />
);

// Curved arc segment for organic feel
const ArcSegment = ({
  radius,
  rotation,
  delay = 0,
  arcLength = 120,
}: {
  radius: number;
  rotation: number;
  delay?: number;
  arcLength?: number;
}) => (
  <motion.div
    className="absolute"
    style={{
      width: radius * 2,
      height: radius * 2,
      left: '50%',
      top: '50%',
      marginLeft: -radius,
      marginTop: -radius,
      rotate: rotation,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ 
      scale: { duration: 0.8, delay, ease: "easeOut" },
      opacity: { duration: 0.4, delay },
    }}
  >
    <svg 
      width={radius * 2} 
      height={radius * 2} 
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      className="overflow-visible"
    >
      <defs>
        <filter id={`concave-${radius}-${rotation}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
          <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
          <feFlood floodColor="hsl(28, 60%, 55%)" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
          <feOffset in="blur" dx="-0.5" dy="-0.5" result="offsetBlur2" />
          <feFlood floodColor="hsl(28, 100%, 92%)" floodOpacity="0.8" result="color2" />
          <feComposite in="color2" in2="offsetBlur2" operator="in" result="highlight" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="highlight" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d={describeArc(radius, radius, radius - 4, 0, arcLength)}
        fill="none"
        stroke="hsl(28, 70%, 78%)"
        strokeWidth="4"
        strokeLinecap="round"
        filter={`url(#concave-${radius}-${rotation})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
      />
    </svg>
  </motion.div>
);

// Helper function to create arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  // Generate tree ring configurations
  const rings = [
    { size: 200, delay: 0, thickness: 2, opacity: 0.15 },
    { size: 320, delay: 0.05, thickness: 3, opacity: 0.2 },
    { size: 480, delay: 0.1, thickness: 2, opacity: 0.18 },
    { size: 640, delay: 0.15, thickness: 4, opacity: 0.22 },
    { size: 820, delay: 0.2, thickness: 2, opacity: 0.15 },
    { size: 1000, delay: 0.25, thickness: 3, opacity: 0.2 },
    { size: 1200, delay: 0.3, thickness: 2, opacity: 0.12 },
    { size: 1450, delay: 0.35, thickness: 4, opacity: 0.18 },
    { size: 1700, delay: 0.4, thickness: 2, opacity: 0.1 },
  ];

  // Arc segments for organic texture
  const arcs = [
    { radius: 260, rotation: 30, delay: 0.1, arcLength: 90 },
    { radius: 400, rotation: 150, delay: 0.15, arcLength: 110 },
    { radius: 560, rotation: 280, delay: 0.2, arcLength: 85 },
    { radius: 720, rotation: 45, delay: 0.25, arcLength: 100 },
    { radius: 900, rotation: 200, delay: 0.3, arcLength: 75 },
    { radius: 1100, rotation: 320, delay: 0.35, arcLength: 95 },
    { radius: 1300, rotation: 100, delay: 0.4, arcLength: 80 },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative flex items-center justify-center">
      {/* Tree ring blossom effect - only appears after Get Started */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Full circle rings */}
            {rings.map((ring, i) => (
              <TreeRing key={`ring-${i}`} {...ring} />
            ))}
            
            {/* Partial arc segments for organic feel */}
            {arcs.map((arc, i) => (
              <ArcSegment key={`arc-${i}`} {...arc} />
            ))}
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
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/95 backdrop-blur-md border border-border rounded-2xl p-8 shadow-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
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
                  transition={{ delay: 0.4, duration: 0.4 }}
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
                  transition={{ delay: 0.5, duration: 0.4 }}
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
                  transition={{ delay: 0.6, duration: 0.4 }}
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
                  transition={{ delay: 0.7, duration: 0.4 }}
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
                  transition={{ delay: 0.8, duration: 0.4 }}
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
    </div>
  );
}
