import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head of Talent at TechFlow",
      content: "IamInterviewed has completely transformed our technical hiring. We've cut our time-to-hire by 60% and the quality of candidates reaching the final round is significantly higher.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "David Chen",
      role: "Senior Engineering Manager",
      content: "As an interviewer on the platform, I love the structured format. It allows me to focus on the candidate's actual skills rather than administrative tasks. The compensation is great too!",
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    {
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      content: "The interview process was incredibly fair and professional. Getting feedback from a real expert was invaluable, even before I got the job offer. Highly recommend for any serious developer.",
      avatar: "https://i.pravatar.cc/150?u=michael"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 uppercase tracking-widest"
          >
            TESTIMONIALS
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-extrabold font-heading mb-6 tracking-tight">What People Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Hear from the companies and professionals who use IamInterviewed every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
              <div className="h-full bg-white/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/40 shadow-xl group-hover:shadow-2xl transition-all flex flex-col items-start gap-6 relative overflow-hidden">
                <Quote className="absolute top-6 right-8 w-20 h-20 text-primary/5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                
                <div className="flex gap-1.5 relative">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent shadow-accent/20 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  ))}
                </div>
                
                <p className="text-lg font-medium italic leading-relaxed text-foreground/80 flex-grow relative">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-5 mt-4 relative">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent rounded-full blur-[2px] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <Avatar className="w-14 h-14 border-2 border-white relative z-10 shadow-lg">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight group-hover:text-primary transition-colors">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-tighter opacity-70 italic">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
