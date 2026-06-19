import { motion } from "motion/react";
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/ing/Logo-IAmInterviewed-Trans.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-secondary/20 border-t border-border/40 pt-24 pb-12 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="text-2xl font-black tracking-tighter font-heading text-foreground group-hover:text-primary transition-colors">
                <img src={logo} alt="Logo" className="iami-logo-footer" />
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs text-base font-medium opacity-80">
              The world's leading interview-as-a-service platform. We help companies hire better through expert-led technical assessments.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Facebook, Instagram, Github].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl border border-border/60 bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all text-muted-foreground"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black mb-8 text-foreground uppercase tracking-[0.2em] font-heading opacity-60">Solutions</h4>
            <ul className="space-y-4 text-muted-foreground text-base">
              {["For Employers", "For Interviewers", "For Candidates", "Enterprise Solutions", "Pricing Plans"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block font-bold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-black mb-8 text-foreground uppercase tracking-[0.2em] font-heading opacity-60">Company</h4>
            <ul className="space-y-4 text-muted-foreground text-base">
              {["About Us", "Our Experts", "Careers", "Blog & News", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block font-bold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black mb-8 text-foreground uppercase tracking-[0.2em] font-heading opacity-60">Get in Touch</h4>
            <ul className="space-y-6 text-muted-foreground text-sm">
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-bold">hello@iaminterviewed.com</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-bold">+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-bold">123 Tech Plaza, Silicon Valley, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-muted-foreground font-bold">
          <p>© {currentYear} IamInterviewed. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
