import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import logoImage from "@/assets/searchunify-logo.svg";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
type AuthView = "login" | "forgot-password" | "forgot-password-sent" | "forgot-password-email" | "reset-password" | "register-transition" | "register" | "register-verify";

// Tree ring style concave line with inner shadow effect
const TreeRing = ({
  size,
  delay = 0,
  thickness = 3,
  opacity = 0.3
}: {
  size: number;
  delay?: number;
  thickness?: number;
  opacity?: number;
}) => <motion.div className="absolute rounded-full" style={{
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
      `
}} initial={{
  scale: 0,
  opacity: 0
}} animate={{
  scale: 1,
  opacity
}} transition={{
  scale: {
    duration: 0.6,
    delay,
    ease: "easeOut"
  },
  opacity: {
    duration: 0.3,
    delay
  }
}} />;

// Curved arc segment for organic feel
const ArcSegment = ({
  radius,
  rotation,
  delay = 0,
  arcLength = 120
}: {
  radius: number;
  rotation: number;
  delay?: number;
  arcLength?: number;
}) => <motion.div className="absolute" style={{
  width: radius * 2,
  height: radius * 2,
  left: '50%',
  top: '50%',
  marginLeft: -radius,
  marginTop: -radius,
  rotate: rotation
}} initial={{
  scale: 0,
  opacity: 0
}} animate={{
  scale: 1,
  opacity: 1
}} transition={{
  scale: {
    duration: 0.8,
    delay,
    ease: "easeOut"
  },
  opacity: {
    duration: 0.4,
    delay
  }
}}>
    <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="overflow-visible">
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
      <motion.path d={describeArc(radius, radius, radius - 4, 0, arcLength)} fill="none" stroke="hsl(28, 70%, 78%)" strokeWidth="4" strokeLinecap="round" filter={`url(#concave-${radius}-${rotation})`} initial={{
      pathLength: 0
    }} animate={{
      pathLength: 1
    }} transition={{
      duration: 0.8,
      delay: delay + 0.2,
      ease: "easeOut"
    }} />
    </svg>
  </motion.div>;

// Helper function to create arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
export default function LoginPage() {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/home");
    }, 800);
  };
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView("forgot-password-email");
  };
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      resetForm();
      setCurrentView("login");
    }, 800);
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView("register-verify");
  };
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/home");
    }, 800);
  };
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
  };
  const goToLogin = () => {
    resetForm();
    setCurrentView("login");
  };

  // Generate tree ring configurations
  const rings = [{
    size: 200,
    delay: 0,
    thickness: 2,
    opacity: 0.15
  }, {
    size: 320,
    delay: 0.05,
    thickness: 3,
    opacity: 0.2
  }, {
    size: 480,
    delay: 0.1,
    thickness: 2,
    opacity: 0.18
  }, {
    size: 640,
    delay: 0.15,
    thickness: 4,
    opacity: 0.22
  }, {
    size: 820,
    delay: 0.2,
    thickness: 2,
    opacity: 0.15
  }, {
    size: 1000,
    delay: 0.25,
    thickness: 3,
    opacity: 0.2
  }, {
    size: 1200,
    delay: 0.3,
    thickness: 2,
    opacity: 0.12
  }, {
    size: 1450,
    delay: 0.35,
    thickness: 4,
    opacity: 0.18
  }, {
    size: 1700,
    delay: 0.4,
    thickness: 2,
    opacity: 0.1
  }];

  // Arc segments for organic texture
  const arcs = [{
    radius: 260,
    rotation: 30,
    delay: 0.1,
    arcLength: 90
  }, {
    radius: 400,
    rotation: 150,
    delay: 0.15,
    arcLength: 110
  }, {
    radius: 560,
    rotation: 280,
    delay: 0.2,
    arcLength: 85
  }, {
    radius: 720,
    rotation: 45,
    delay: 0.25,
    arcLength: 100
  }, {
    radius: 900,
    rotation: 200,
    delay: 0.3,
    arcLength: 75
  }, {
    radius: 1100,
    rotation: 320,
    delay: 0.35,
    arcLength: 95
  }, {
    radius: 1300,
    rotation: 100,
    delay: 0.4,
    arcLength: 80
  }];
  const renderLoginView = () => <motion.div key="login" initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: 20
  }} transition={{
    duration: 0.3
  }} className="flex flex-col items-center w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-lg md:text-xl text-muted-foreground mb-2">
          Welcome to
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold whitespace-nowrap">
          <span className="text-foreground">SearchUnify's Agentic AI Suite for </span>
          <span className="text-primary">BFSI</span>
        </h1>
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
          <Input id="email" type="email" placeholder="Enter your email ID" value={email} onChange={e => setEmail(e.target.value)} className="h-10 bg-background border-border/60 focus:border-primary text-sm" />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs text-muted-foreground font-normal">
            Password
          </Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="" value={password} onChange={e => setPassword(e.target.value)} className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Keep me logged in */}
        <div className="flex items-center space-x-2 pt-1">
          <Checkbox id="keep-logged-in" checked={keepLoggedIn} onCheckedChange={checked => setKeepLoggedIn(checked === true)} className="h-4 w-4 border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
          <Label htmlFor="keep-logged-in" className="text-xs text-muted-foreground font-normal cursor-pointer">
            Keep me logged in
          </Label>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-4">
          Log In
        </Button>

        {/* Forgot Password & Not an existing user */}
        <div className="flex flex-col items-center gap-3 pt-3">
          <button type="button" onClick={() => setCurrentView("forgot-password")} className="text-xs text-primary hover:text-primary/80 transition-colors">
            Forgot Password
          </button>
          <p className="text-xs text-muted-foreground">
            Not an existing user?{" "}
            <button type="button" onClick={() => setCurrentView("register-transition")} className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Create Account
            </button>
          </p>
        </div>
      </form>
    </motion.div>;
  const renderForgotPasswordView = () => <motion.div key="forgot-password" initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} transition={{
    duration: 0.3
  }} className="flex flex-col items-center w-full">
      {/* Back Button */}
      <button type="button" onClick={goToLogin} className="self-start flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-3 w-3" />
        Back to Login
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Forgot Password
        </h1>
        <p className="text-sm text-muted-foreground mt-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Forgot Password Form */}
      <form onSubmit={handleForgotPassword} className="w-full space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="reset-email" className="text-xs text-muted-foreground font-normal">
            Email
          </Label>
          <Input id="reset-email" type="email" placeholder="Enter your email ID" value={email} onChange={e => setEmail(e.target.value)} className="h-10 bg-background border-border/60 focus:border-primary text-sm" />
        </div>

        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-4">
          Send Reset Link
        </Button>
      </form>
    </motion.div>;
  const renderForgotPasswordSentView = () => <motion.div key="forgot-password-sent" initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0.95
  }} transition={{
    duration: 0.3
  }} className="flex flex-col items-center w-full text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
        Check Your Email
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        We've sent a password reset link to<br />
        <span className="text-foreground font-medium">{email}</span>
      </p>

      <Button type="button" onClick={goToLogin} className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm">
        Back to Login
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        Didn't receive the email?{" "}
        <button type="button" onClick={() => setCurrentView("forgot-password")} className="text-primary hover:text-primary/80 transition-colors">
          Resend
        </button>
      </p>
    </motion.div>;

  const renderForgotPasswordEmailView = () => <motion.div key="forgot-password-email" initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0.95
  }} transition={{
    duration: 0.3
  }} className="flex flex-col items-center w-full">
      {/* Back Button */}
      <button type="button" onClick={() => setCurrentView("forgot-password")} className="self-start flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-3 w-3" />
        Back
      </button>

      {/* Email Mockup Container */}
      <div className="w-full bg-muted/30 rounded-xl border border-border/60 overflow-hidden">
        {/* Email Header */}
        <div className="bg-muted/50 px-4 py-3 border-b border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">SearchUnify</p>
              <p className="text-[10px] text-muted-foreground">noreply@searchunify.com</p>
            </div>
          </div>
          <p className="text-sm font-medium text-foreground">Reset Your Password</p>
        </div>

        {/* Email Body */}
        <div className="px-4 py-6 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Password Reset Request</h2>
          <p className="text-sm text-muted-foreground mb-1">Hello,</p>
          <p className="text-sm text-muted-foreground mb-4">
            We received a request to reset the password for your account associated with <span className="text-foreground font-medium">{email}</span>.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Click the button below to create a new password:
          </p>

          <Button 
            type="button" 
            onClick={() => setCurrentView("reset-password")} 
            className="w-full max-w-[200px] h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
          >
            Reset Password
          </Button>

          <p className="text-xs text-muted-foreground mt-6">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This link will expire in 24 hours.
          </p>
        </div>

        {/* Email Footer */}
        <div className="bg-muted/30 px-4 py-3 border-t border-border/40">
          <p className="text-[10px] text-muted-foreground text-center">
            © 2024 SearchUnify. All rights reserved.
          </p>
        </div>
      </div>
    </motion.div>;

  const renderResetPasswordView = () => <motion.div key="reset-password" initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} transition={{
    duration: 0.3
  }} className="flex flex-col items-center w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Create New Password
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your new password below.
        </p>
      </div>

      {/* Reset Password Form */}
      <form onSubmit={handleResetPassword} className="w-full space-y-4">
        {/* Email Field - Read Only */}
        <div className="space-y-1.5">
          <Label htmlFor="reset-email-readonly" className="text-xs text-muted-foreground font-normal">
            Email
          </Label>
          <Input 
            id="reset-email-readonly" 
            type="email" 
            value={email} 
            readOnly 
            className="h-10 bg-muted/50 border-border/60 text-sm text-muted-foreground cursor-not-allowed" 
          />
        </div>

        {/* New Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="new-password" className="text-xs text-muted-foreground font-normal">
            New Password
          </Label>
          <div className="relative">
            <Input 
              id="new-password" 
              type={showNewPassword ? "text" : "password"} 
              placeholder="Enter new password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10" 
            />
            <button 
              type="button" 
              onClick={() => setShowNewPassword(!showNewPassword)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm New Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="confirm-new-password" className="text-xs text-muted-foreground font-normal">
            Confirm Password
          </Label>
          <div className="relative">
            <Input 
              id="confirm-new-password" 
              type={showConfirmNewPassword ? "text" : "password"} 
              placeholder="Confirm new password" 
              value={confirmNewPassword} 
              onChange={e => setConfirmNewPassword(e.target.value)} 
              className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10" 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-4">
          Change Password
        </Button>
      </form>
    </motion.div>;

  // Auto-transition from register-transition to register
  useEffect(() => {
    if (currentView === "register-transition") {
      const timer = setTimeout(() => {
        setCurrentView("register");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);
  const renderRegisterTransitionView = () => <motion.div key="register-transition" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.5
  }} className="flex flex-col items-center justify-center w-full py-20">
      <motion.img src={logoImage} alt="SearchUnify" className="h-12 w-auto" initial={{
      opacity: 0,
      scale: 0.8
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.8,
      ease: "easeOut"
    }} />
      <motion.p className="text-sm text-muted-foreground mt-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.5
    }}>
        Welcome to the Team
      </motion.p>
    </motion.div>;
  const renderRegisterView = () => <motion.div key="register" initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} transition={{
    duration: 0.3
  }} className="flex flex-col items-center w-full">
      {/* Back Button */}
      <button type="button" onClick={goToLogin} className="self-start flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-3 w-3" />
        Back to Login
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Create Account
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Fill in your details to get started.
        </p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="w-full space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-email" className="text-xs text-muted-foreground font-normal">
            Email
          </Label>
          <Input id="reg-email" type="email" placeholder="Enter your email ID" value={email} onChange={e => setEmail(e.target.value)} className="h-10 bg-background border-border/60 focus:border-primary text-sm" />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-password" className="text-xs text-muted-foreground font-normal">
            Password
          </Label>
          <div className="relative">
            <Input id="reg-password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-confirm-password" className="text-xs text-muted-foreground font-normal">
            Confirm Password
          </Label>
          <div className="relative">
            <Input id="reg-confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-4">
          Verify to Proceed
        </Button>
      </form>
    </motion.div>;
  const renderVerifyView = () => <motion.div key="register-verify" initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} transition={{
    duration: 0.3
  }} className="flex flex-col items-center w-full">
      {/* Back Button */}
      <button type="button" onClick={() => setCurrentView("register")} className="self-start flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-3 w-3" />
        Back
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Verify Your Email
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          We've sent a 6-digit code to your email
        </p>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleVerifyCode} className="w-full space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="verification-code" className="text-xs text-muted-foreground font-normal">
            Verification Code
          </Label>
          <Input id="verification-code" type="text" placeholder="Enter 6-digit code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} className="h-10 bg-background border-border/60 focus:border-primary text-sm text-center tracking-widest" maxLength={6} />
        </div>

        <Button type="submit" className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-4">
          Verify and Create Account
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Didn't receive the code?{" "}
          <button type="button" className="text-primary hover:text-primary/80 transition-colors">
            Resend
          </button>
        </p>
      </form>
    </motion.div>;
  return <div className="min-h-screen bg-background overflow-hidden relative flex items-center justify-center">
      {/* Tree ring blossom effect - only appears after sign in */}
      {isSubmitting && <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.3
    }}>
          {rings.map((ring, i) => <TreeRing key={`ring-${i}`} {...ring} />)}
          {arcs.map((arc, i) => <ArcSegment key={`arc-${i}`} {...arc} />)}
        </motion.div>}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm px-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: isSubmitting ? 0 : 1,
        y: isSubmitting ? -20 : 0
      }} transition={{
        duration: 0.4
      }}>
          <AnimatePresence mode="wait">
            {currentView === "login" && renderLoginView()}
            {currentView === "forgot-password" && renderForgotPasswordView()}
            {currentView === "forgot-password-sent" && renderForgotPasswordSentView()}
            {currentView === "forgot-password-email" && renderForgotPasswordEmailView()}
            {currentView === "reset-password" && renderResetPasswordView()}
            {currentView === "register-transition" && renderRegisterTransitionView()}
            {currentView === "register" && renderRegisterView()}
            {currentView === "register-verify" && renderVerifyView()}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>;
}