import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Small delay to show the animation before navigating
    setTimeout(() => {
      navigate("/home");
    }, 800);
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
      {/* Tree ring blossom effect - only appears after sign in */}
      {isSubmitting && (
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {rings.map((ring, i) => (
            <TreeRing key={`ring-${i}`} {...ring} />
          ))}
          {arcs.map((arc, i) => (
            <ArcSegment key={`arc-${i}`} {...arc} />
          ))}
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isSubmitting ? 0 : 1, y: isSubmitting ? -20 : 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
              Welcome to
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold">
              <span className="text-foreground">SearchUnify's </span>
              <span className="text-primary">AI Agent Suite</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-4">
              Please login to continue to your account.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-muted-foreground font-normal">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-background border-border/60 focus:border-primary text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-muted-foreground font-normal">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Keep me logged in */}
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="keep-logged-in"
                checked={keepLoggedIn}
                onCheckedChange={(checked) => setKeepLoggedIn(checked === true)}
                className="h-4 w-4 border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label 
                htmlFor="keep-logged-in" 
                className="text-xs text-muted-foreground font-normal cursor-pointer"
              >
                Keep me logged in
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-4"
            >
              Log In
            </Button>

            {/* Forgot Password */}
            <div className="text-center pt-2">
              <button
                type="button"
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Forgot Password
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
