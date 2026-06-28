import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AnternClientPassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert("Password updated successfully!");
  };

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Change Password</h2>
        <p className="text-muted-foreground mt-1">Ensure your account is using a long, random password to stay secure.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Password Requirements</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Minimum 8 characters, at least one uppercase letter, one number, and one special character.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Current Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <input
                  type={showPassword.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                  className="w-full pl-11 pr-12 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility('current')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="h-px bg-border/50 my-6" />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                  className="w-full pl-11 pr-12 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Create new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility('new')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-11 pr-12 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility('confirm')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

