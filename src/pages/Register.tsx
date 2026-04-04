import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import logoImage from "@/assets/searchunify-logo.svg";
import { Eye, EyeOff } from "lucide-react";

const LOGIN_API_URL = "/admin/userManagement/check";
const REGISTER_API_URL = "/admin/userManagement/registerUser";

type AdminConfig = {
  adminId: string;
  adminPassword: string;
  backendSessionId: string;
  backendSessionPassword: string;
};

const loadAdminConfig = async (): Promise<AdminConfig> => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const res = await fetch(`${base}/admin-config.json`);
  if (!res.ok) throw new Error("Failed to load admin config");
  return res.json();
};

type RegisterApiResponse = {
  flag: number;
  message?: string;
};

type View = "admin-login" | "register" | "success";

export default function Register() {
  const [view, setView] = useState<View>("admin-login");

  // Admin login fields
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // New user fields
  const [newUserId, setNewUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let config: AdminConfig;
    try {
      config = await loadAdminConfig();
    } catch {
      toast({
        title: "Configuration error",
        description: "Could not load admin config. Ensure admin-config.json is present.",
        variant: "destructive",
      });
      return;
    }

    if (adminId !== config.adminId || adminPassword !== config.adminPassword) {
      toast({
        title: "Access denied",
        description: "Invalid admin credentials.",
        variant: "destructive",
      });
      return;
    }

    setView("register");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUserId.trim() || !newPassword) {
      toast({
        title: "Missing fields",
        description: "Enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Make sure both password fields are identical.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    let config: AdminConfig;
    try {
      config = await loadAdminConfig();
    } catch {
      toast({
        title: "Configuration error",
        description: "Could not load admin config. Ensure admin-config.json is present.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Establish backend session to obtain cookies required for registration
      const sessionResponse = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json, text/plain, */*",
        },
        credentials: "include",
        body: JSON.stringify({ userid: config.backendSessionId, password: config.backendSessionPassword }),
      });

      const sessionData = await sessionResponse.json();
      if (sessionData.flag !== 1) {
        toast({
          title: "Session error",
          description: "Could not establish backend session. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json, text/plain, */*",
        },
        credentials: "include",
        body: JSON.stringify({ userid: newUserId.trim(), password: newPassword }),
      });

      const data: RegisterApiResponse = await response.json();

      if (data.flag === 1) {
        setView("success");
      } else {
        toast({
          title: "Registration failed",
          description: data.message || "Unable to register user. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Unable to reach the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndRegisterAnother = () => {
    setNewUserId("");
    setNewPassword("");
    setConfirmPassword("");
    setView("register");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <div className="flex flex-col items-center mb-8">
          <img src={logoImage} alt="SearchUnify" className="h-10 w-auto mb-6" />
        </div>

        <AnimatePresence mode="wait">
          {view === "admin-login" && (
            <motion.div
              key="admin-login"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-foreground">Admin Access</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Enter admin credentials to register a new user.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="admin-id" className="text-xs text-muted-foreground font-normal">
                    Admin ID
                  </Label>
                  <Input
                    id="admin-id"
                    type="email"
                    placeholder="Enter admin email"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="h-10 bg-background border-border/60 focus:border-primary text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="admin-password" className="text-xs text-muted-foreground font-normal">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showAdminPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-2"
                >
                  Continue
                </Button>
              </form>
            </motion.div>
          )}

          {view === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-foreground">Register User</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Create a new user account.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="new-userid" className="text-xs text-muted-foreground font-normal">
                    User Email
                  </Label>
                  <Input
                    id="new-userid"
                    type="email"
                    placeholder="Enter user email"
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                    className="h-10 bg-background border-border/60 focus:border-primary text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="new-password" className="text-xs text-muted-foreground font-normal">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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

                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password" className="text-xs text-muted-foreground font-normal">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10 bg-background border-border/60 focus:border-primary text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm mt-2"
                >
                  {isSubmitting ? "Registering..." : "Register User"}
                </Button>
              </form>
            </motion.div>
          )}

          {view === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-foreground">User Registered</h1>
              <p className="text-sm text-muted-foreground mt-2 mb-8">
                <span className="font-medium text-foreground">{newUserId}</span> has been successfully registered.
              </p>
              <Button
                onClick={resetAndRegisterAnother}
                className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
              >
                Register Another User
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
