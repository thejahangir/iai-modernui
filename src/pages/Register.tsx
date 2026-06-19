import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = "Full Name is required.";
    }
    if (!email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    setFieldErrors({});

    // Mock registration - route to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      
      {/* Left Column - Image & Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-primary/5 items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent z-0" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-[10%] -right-[10%] w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 p-12 max-w-2xl text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl" />
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
              alt="Join our community" 
              className="relative rounded-3xl shadow-2xl border-4 border-white/50 object-cover w-full h-[400px]"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold font-heading text-foreground mb-6">
              Join the Network
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started today and streamline your technical hiring or showcase your skills to top companies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative dark:bg-slate-950">
        <div className="w-full max-w-md mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 text-left">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <UserPlus className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold font-heading text-foreground tracking-tight mb-3">
                Create an Account
              </h1>
              <p className="text-muted-foreground text-lg">
                Fill in your details to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Full Name
                  </label>
                  <AnimatePresence>
                    {fieldErrors.name && (
                      <motion.span 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-[11px] text-destructive font-medium"
                      >
                        {fieldErrors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors({...fieldErrors, name: ""});
                  }}
                  className={`flex h-14 w-full rounded-xl border bg-background px-4 py-2 text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    fieldErrors.name 
                      ? "border-destructive/50 focus-visible:ring-destructive/20 focus-visible:border-destructive" 
                      : "border-input focus-visible:ring-primary focus-visible:border-primary"
                  }`}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address
                  </label>
                  <AnimatePresence>
                    {fieldErrors.email && (
                      <motion.span 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-[11px] text-destructive font-medium"
                      >
                        {fieldErrors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({...fieldErrors, email: ""});
                  }}
                  className={`flex h-14 w-full rounded-xl border bg-background px-4 py-2 text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    fieldErrors.email 
                      ? "border-destructive/50 focus-visible:ring-destructive/20 focus-visible:border-destructive" 
                      : "border-input focus-visible:ring-primary focus-visible:border-primary"
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Password
                  </label>
                  <AnimatePresence>
                    {fieldErrors.password && (
                      <motion.span 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs text-destructive font-bold"
                      >
                        {fieldErrors.password}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({...fieldErrors, password: ""});
                  }}
                  className={`flex h-14 w-full rounded-xl border bg-background px-4 py-2 text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    fieldErrors.password 
                      ? "border-destructive/50 focus-visible:ring-destructive/20 focus-visible:border-destructive" 
                      : "border-input focus-visible:ring-primary focus-visible:border-primary"
                  }`}
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold shadow-lg transition-all hover:scale-[1.02] bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                Register
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="text-center mt-6">
                <span className="text-muted-foreground text-sm">Already have an account? </span>
                <Link to="/login" className="text-primary font-bold text-sm hover:underline">Sign in</Link>
              </div>
            </form>

            <div className="mt-8 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">
                ← Back to homepage
              </Link>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
