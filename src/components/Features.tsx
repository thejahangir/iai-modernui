import { motion } from "motion/react";
import { 
  ClipboardCheck, 
  Users2, 
  FilePieChart, 
  CalendarClock, 
  ShieldCheck, 
  Globe2 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: ClipboardCheck,
      title: "Structured Interviews",
      desc: "Standardized evaluation criteria and question sets ensure every candidate is assessed fairly and consistently.",
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Users2,
      title: "Expert Panel",
      desc: "Access a global network of vetted technical experts from top companies like Google, Meta, and Amazon.",
      color: "from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400"
    },
    {
      icon: FilePieChart,
      title: "Detailed Reports",
      desc: "Receive comprehensive technical assessment reports with scorecards, feedback, and video highlights.",
      color: "from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400"
    },
    {
      icon: CalendarClock,
      title: "Scheduling Automation",
      desc: "Our platform handles the complex coordination between candidates and interviewers automatically.",
      color: "from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400"
    },
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      desc: "Every interview is monitored and reviewed to maintain the highest standards of technical evaluation.",
      color: "from-rose-500/20 to-rose-500/5 text-rose-600 dark:text-rose-400"
    },
    {
      icon: Globe2,
      title: "Global Reach",
      desc: "Interview candidates across any timezone with our distributed network of multi-lingual experts.",
      color: "from-cyan-500/20 to-cyan-500/5 text-cyan-600 dark:text-cyan-400"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
          >
            CORE CAPABILITIES
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-extrabold font-heading mb-6 tracking-tight">Powerful Features for Modern Teams</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
            Everything you need to build a world-class technical hiring process, all in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2rem] bg-white/40 border border-white/40 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-inner`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
