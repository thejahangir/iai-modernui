import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, GraduationCap, Laptop, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const UserSegments = () => {
  const segments = [
    {
      type: "Employers",
      icon: Building2,
      title: "Build Your Dream Team",
      desc: "Stop wasting time on unqualified candidates. Get expert technical assessments and hire the best talent faster.",
      features: ["Expert-led screenings", "Detailed skill reports", "Seamless ATS integration"],
      cta: "Hire Faster",
      theme: "hover:border-blue-500 hover:shadow-blue-500/20 shadow-blue-500/5",
      iconTheme: "text-blue-600 bg-blue-500/10",
      accent: "bg-blue-600"
    },
    {
      type: "Interviewers",
      icon: Laptop,
      title: "Monetize Your Expertise",
      desc: "Join an elite community of technical experts. Conduct interviews on your own schedule and earn extra income.",
      features: ["Flexible scheduling", "Global network", "Professional growth"],
      cta: "Become an Expert",
      theme: "hover:border-amber-500 hover:shadow-amber-500/20 shadow-amber-500/5",
      iconTheme: "text-amber-600 bg-amber-500/10",
      accent: "bg-amber-600"
    },
    {
      type: "Candidates",
      icon: GraduationCap,
      title: "Showcase Your Real Skills",
      desc: "Get interviewed by industry experts. Receive constructive feedback and get noticed by top employers.",
      features: ["Fair evaluation", "Expert feedback", "Job opportunities"],
      cta: "Get Interviewed",
      theme: "hover:border-emerald-500 hover:shadow-emerald-500/20 shadow-emerald-500/5",
      iconTheme: "text-emerald-600 bg-emerald-500/10",
      accent: "bg-emerald-600"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-secondary/10">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
          >
            WHO WE SERVE
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-extrabold font-heading mb-6 tracking-tight">Tailored Solutions for Every Role</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Whether you're looking to hire, conduct interviews, or land your next big role, we have the tools to help you succeed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -12 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className={`h-full border-2 border-white/40 transition-all duration-500 flex flex-col bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden group ${segment.theme}`}>
                <CardHeader className="pt-10 px-8 relative">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform ${segment.iconTheme}`}>
                    <segment.icon className="w-8 h-8" />
                  </div>
                  <Badge variant="outline" className="w-fit mb-4 uppercase tracking-[0.2em] font-black text-[10px] px-3 py-1 bg-white/50 backdrop-blur-sm border-white/20">
                    {segment.type}
                  </Badge>
                  <CardTitle className="text-3xl font-bold font-heading tracking-tight group-hover:text-primary transition-colors">{segment.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-10 flex-grow">
                  <p className="text-muted-foreground mb-8 text-base font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {segment.desc}
                  </p>
                  <ul className="space-y-4">
                    {segment.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-bold group/item">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover/item:scale-125", segment.iconTheme)}>
                          <div className={cn("w-2 h-2 rounded-full", segment.accent)} />
                        </div>
                        <span className="group-hover/item:translate-x-1 transition-transform">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 bg-black/5 flex flex-col items-center">
                  <Button className="w-full h-14 text-lg font-black group shadow-xl hover:shadow-none transition-all rounded-2xl">
                    {segment.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserSegments;
