import { motion } from "motion/react";
import { Clock, TrendingDown, BrainCircuit, Target, BarChart3, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ValueProposition = () => {
  const values = [
    {
      icon: Clock,
      title: "Faster Hiring",
      desc: "Reduce your time-to-hire by 50% with on-demand expert interviews that fit your schedule.",
      gradient: "from-blue-500/20 to-blue-600/10 text-blue-600",
      accent: "bg-blue-500"
    },
    {
      icon: TrendingDown,
      title: "Cost Efficiency",
      desc: "Save thousands in engineering hours by outsourcing the initial technical screening to our experts.",
      gradient: "from-emerald-500/20 to-emerald-600/10 text-emerald-600",
      accent: "bg-emerald-500"
    },
    {
      icon: BrainCircuit,
      title: "Expert Evaluation",
      desc: "Get insights from top-tier professionals who know exactly what to look for in candidates.",
      gradient: "from-purple-500/20 to-purple-600/10 text-purple-600",
      accent: "bg-purple-500"
    },
    {
      icon: Target,
      title: "Unbiased Results",
      desc: "Ensure fairness with structured interview formats and objective scoring rubrics.",
      gradient: "from-orange-500/20 to-orange-600/10 text-orange-600",
      accent: "bg-orange-500"
    },
    {
      icon: BarChart3,
      title: "Deep Insights",
      desc: "Receive comprehensive reports with skill-by-skill breakdowns and comparative analysis.",
      gradient: "from-pink-500/20 to-pink-600/10 text-pink-600",
      accent: "bg-pink-500"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      desc: "Our rigorous vetting ensures only the most qualified experts conduct your interviews.",
      gradient: "from-cyan-500/20 to-cyan-600/10 text-cyan-600",
      accent: "bg-cyan-500"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-sm font-bold mb-6">
                OUR IMPACT
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold font-heading mb-6 leading-tight tracking-tight">
                Why Choose <br />
                <span className="text-primary">IamInterviewed?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                We provide the infrastructure and expertise you need to scale your technical team without compromising on quality or speed.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: "10,000+ Interviews Conducted", color: "bg-primary" },
                  { label: "98% Client Satisfaction Rate", color: "bg-accent" },
                  { label: "Global Expert Network", color: "bg-info" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", item.color + "/10")}>
                      <div className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
                    </div>
                    <span className="font-bold text-lg">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Grid */}
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 perspective-1000">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 2, 
                  rotateX: 1,
                  transition: { duration: 0.2 } 
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2.5rem] border border-white/40 bg-white/40 backdrop-blur-md hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br shadow-inner group-hover:scale-110 transition-transform", value.gradient)}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                  {value.desc}
                </p>
                <div className={cn("absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity", value.accent)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
