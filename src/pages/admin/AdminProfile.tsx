import { User, Mail, Phone, MapPin, Building, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function AdminProfile() {
  const adminData = {
    firstName: "Admin",
    lastName: "User",
    email: "admin@iami.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    department: "System Administration",
    role: "Super Admin",
    joinDate: "August 2023"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">My Profile</h2>
        <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative" />
        
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-12 left-8 w-24 h-24 rounded-full bg-white p-1.5 shadow-md">
            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-3xl font-bold text-primary">
              {adminData.firstName[0]}{adminData.lastName[0]}
            </div>
          </div>
          
          <div className="pt-16 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-foreground">{adminData.firstName} {adminData.lastName}</h3>
              <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                <Shield className="w-4 h-4 text-primary" />
                {adminData.role}
              </p>
            </div>
            <button className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mt-10">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email Address</label>
                <div className="flex items-center gap-3 mt-2 text-foreground font-medium">
                  <Mail className="w-5 h-5 text-muted-foreground/50" />
                  {adminData.email}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Phone Number</label>
                <div className="flex items-center gap-3 mt-2 text-foreground font-medium">
                  <Phone className="w-5 h-5 text-muted-foreground/50" />
                  {adminData.phone}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Location</label>
                <div className="flex items-center gap-3 mt-2 text-foreground font-medium">
                  <MapPin className="w-5 h-5 text-muted-foreground/50" />
                  {adminData.location}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Department</label>
                <div className="flex items-center gap-3 mt-2 text-foreground font-medium">
                  <Building className="w-5 h-5 text-muted-foreground/50" />
                  {adminData.department}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Member Since</label>
                <div className="flex items-center gap-3 mt-2 text-foreground font-medium">
                  <User className="w-5 h-5 text-muted-foreground/50" />
                  {adminData.joinDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
