import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Play, Users, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-bounce-slow" />
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-info/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/5 text-primary border-primary/10">
              <Zap className="w-3.5 h-3.5 mr-2 fill-primary" />
              The Future of Technical Hiring
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight font-heading leading-[1.1] mb-6 text-balance">
              Hire <span className="text-primary">Faster</span>. <br />
              Hire <span className="text-primary">Smarter</span>. <br />
              With Experts.
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Leverage expert-led, structured interviews to find top talent in half the time. 
              Fair, objective, and data-driven hiring decisions start here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20">
                Start Hiring Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 font-bold">
                <Play className="mr-2 w-5 h-5 fill-current" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="mt-12 pt-12 border-t border-border/50">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center group cursor-default">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-black text-xl tracking-tight text-foreground/80">GLOBALTECH</span>
                </div>
                <div className="flex items-center group cursor-default">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent/20 transition-colors">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-black text-xl tracking-tight text-foreground/80">FINRA</span>
                </div>
                <div className="flex items-center group cursor-default">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-black text-xl tracking-tight text-foreground/80">AETHER</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className="relative z-10 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 min-h-[420px] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-8 border-b border-border/20 h-16 bg-primary/5 -mx-8 -mt-8 px-8 backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-90 shadow-sm" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold text-foreground/60 tracking-tight">Interview Dashboard / Engineering Lead</span>
                </div>
                <div className="w-12" /> {/* Spacer to balance dots */}
              </div>

              {/* Dashboard Content */}
              <div className="flex-grow flex flex-col">
                {/* Mock Search Bar */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground/40 text-xs">🔍</span>
                  </div>
                  <div className="w-full h-9 bg-secondary/30 rounded-lg border border-border/20 px-9 flex items-center">
                    <span className="text-xs text-muted-foreground/50">Search candidates or roles...</span>
                  </div>
                </div>

                {/* Candidate List */}
                <div className="space-y-3">
                  {[
                    { name: "Alex Rivera", role: "Sr. Frontend Lead", score: "9.4", status: "Accepted", color: "bg-emerald-500", initials: "AR", active: true },
                    { name: "Sophia Chen", role: "System Architect", score: "8.8", status: "In Review", color: "bg-amber-500", initials: "SC" },
                    { name: "Marcus Thorne", role: "Fullstack Engineer", score: "9.1", status: "Technical", color: "bg-indigo-500", initials: "MT" },
                  ].map((candidate, i) => (
                    <motion.div 
                      key={candidate.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className={cn(
                        "group h-16 rounded-xl flex items-center px-4 gap-4 transition-all duration-300 cursor-default",
                        candidate.active 
                          ? "bg-white border-2 border-primary shadow-lg scale-[1.02] ring-4 ring-primary/5" 
                          : "bg-secondary/40 hover:bg-secondary/60 hover:translate-x-1"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm",
                        candidate.color
                      )}>
                        {candidate.initials}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <h4 className="text-sm font-bold truncate pr-2">{candidate.name}</h4>
                          <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full">{candidate.score}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium truncate uppercase tracking-tighter opacity-70">
                          {candidate.role}
                        </p>
                      </div>

                      <div className={cn(
                        "px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest hidden sm:block",
                        candidate.active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {candidate.status}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Stats Summary */}
                <div className="mt-auto pt-6 border-t border-border/40">
                  <div className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-muted-foreground">3 Sessions Active</span>
                    </div>
                    <span className="font-black text-primary hover:underline cursor-pointer">View All Sessions</span>
                  </div>
                </div>
              </div>



            </div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -top-6 -right-6 bg-accent p-4 rounded-2xl shadow-xl shadow-accent/20 z-20"
            >
              <p className="text-sm font-black text-foreground">+82% Faster Placement</p>
            </motion.div>

            {/* Decorative Shapes */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/30 rounded-full blur-[100px] -z-10 animate-bounce-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-info/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
