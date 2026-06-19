import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, UserPlus, Calendar, FileText, Award, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = {
    employers: [
      { icon: UserPlus, title: "Post a Job", desc: "Define your requirements and technical stack for the role." },
      { icon: Calendar, title: "Schedule Interviews", desc: "Our system automatically matches candidates with the right experts." },
      { icon: FileText, title: "Get Reports", desc: "Receive detailed technical assessment reports and insights." },
      { icon: CheckCircle2, title: "Hire with Confidence", desc: "Make data-driven hiring decisions based on expert evaluations." },
    ],
    interviewers: [
      { icon: Award, title: "Apply as Expert", desc: "Join our elite panel after a rigorous vetting process." },
      { icon: Calendar, title: "Set Availability", desc: "Choose when you want to conduct interviews on your own terms." },
      { icon: FileText, title: "Conduct Interviews", desc: "Use our structured platform to evaluate candidate skills." },
      { icon: CheckCircle2, title: "Earn & Grow", desc: "Get paid for your expertise and help shape the industry." },
    ],
    candidates: [
      { icon: UserPlus, title: "Apply to Jobs", desc: "Connect with top companies looking for your specific skills." },
      { icon: Calendar, title: "Book Interview", desc: "Pick a time that works for you to meet with a domain expert." },
      { icon: FileText, title: "Showcase Skills", desc: "Demonstrate your abilities in a fair, technical environment." },
      { icon: CheckCircle2, title: "Get Hired", desc: "Land your dream job based on your actual performance." },
    ],
  };

  const colorMap = {
    employers: {
      primary: "text-blue-600",
      bg: "bg-blue-600",
      lightBg: "bg-blue-500/10",
      border: "border-blue-500/20",
      glow: "shadow-blue-500/20",
    },
    interviewers: {
      primary: "text-amber-600",
      bg: "bg-amber-600",
      lightBg: "bg-amber-500/10",
      border: "border-amber-500/20",
      glow: "shadow-amber-500/20",
    },
    candidates: {
      primary: "text-emerald-600",
      bg: "bg-emerald-600",
      lightBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "shadow-emerald-500/20",
    },
  };

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-secondary/20">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 uppercase tracking-widest"
          >
            THE PROCESS
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-extrabold font-heading mb-6 tracking-tight">How it Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A streamlined process designed for efficiency and fairness at every stage of the recruitment journey.
          </p>
        </div>

        <Tabs defaultValue="employers" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-white/50 backdrop-blur-md border border-white/40 p-1.5 h-16 rounded-[2rem] shadow-xl">
              <TabsTrigger 
                value="employers" 
                className="rounded-2xl px-10 text-lg font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                Employers
              </TabsTrigger>
              <TabsTrigger 
                value="interviewers" 
                className="rounded-2xl px-10 text-lg font-bold data-[state=active]:bg-amber-600 data-[state=active]:text-white transition-all"
              >
                Interviewers
              </TabsTrigger>
              <TabsTrigger 
                value="candidates" 
                className="rounded-2xl px-10 text-lg font-bold data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
              >
                Candidates
              </TabsTrigger>
            </TabsList>
          </div>

          {(Object.keys(steps) as Array<keyof typeof steps>).map((key) => (
            <TabsContent key={key} value={key} className="relative">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps[key].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="relative group"
                  >
                    <Card className={`h-full border-2 border-white/40 bg-white/40 backdrop-blur-md shadow-xl transition-all duration-300 rounded-[2.5rem] overflow-hidden hover:shadow-2xl ${colorMap[key].glow}`}>
                      <CardContent className="pt-12 pb-10 px-8 text-center flex flex-col items-center">
                        <div className={`w-18 h-18 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:rotate-6 ${colorMap[key].lightBg} ${colorMap[key].primary}`}>
                          <step.icon className="w-9 h-9" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-primary transition-colors leading-tight">{step.title}</h3>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed opacity-80">
                          {step.desc}
                        </p>
                        
                        {/* Step Badge */}
                        <div className={`mt-8 w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg ${colorMap[key].bg}`}>
                          {index + 1}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Connecting Arrow (Desktop) */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 opacity-20 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className={`w-8 h-8 ${colorMap[key].primary}`} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorks;
