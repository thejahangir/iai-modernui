import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import logo from "../assets/ing/Logo-IAmInterviewed-Trans.png";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight, Building2, Laptop, GraduationCap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2rem] pointer-events-auto overflow-hidden"
      >
        <div className="px-6 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={logo} alt="Logo" className="iami-logo" />
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary/5 font-bold px-5 h-10 rounded-xl transition-colors">Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-6 md:w-[600px] md:grid-cols-2 bg-white/95 backdrop-blur-2xl border-white/20 shadow-2xl rounded-3xl">
                        <ListItem title="For Employers" href="#employers" icon={Building2}>
                          Streamline your hiring with expert-led technical interviews.
                        </ListItem>
                        <ListItem title="For Interviewers" href="#interviewers" icon={Laptop}>
                          Join our elite panel of experts and conduct interviews.
                        </ListItem>
                        <ListItem title="For Candidates" href="#candidates" icon={GraduationCap}>
                          Get interviewed by experts and showcase your real skills.
                        </ListItem>
                        <ListItem title="Enterprise" href="#enterprise" icon={ShieldCheck}>
                          Custom solutions for large-scale recruitment needs.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-primary/5 font-bold px-5 h-10 rounded-xl transition-colors")} 
                      href="#how-it-works"
                    >
                      How it Works
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-primary/5 font-bold px-5 h-10 rounded-xl transition-colors")} 
                      href="#pricing"
                    >
                      Pricing
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="h-6 w-px bg-border/40 mx-2" />

              <div className="flex items-center gap-2">
                <Button onClick={() => navigate('/login')} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 px-6 h-10 rounded-xl font-black tracking-tight group">
                  Login
                  <ChevronRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl text-foreground hover:bg-primary/5 transition-colors"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/20 px-6 pb-8 pt-4 bg-white/80 backdrop-blur-xl"
          >
            <div className="space-y-1">
              <a href="#employers" className="block px-4 py-3 text-lg font-bold hover:bg-primary/5 rounded-xl transition-colors">For Employers</a>
              <a href="#interviewers" className="block px-4 py-3 text-lg font-bold hover:bg-primary/5 rounded-xl transition-colors">For Interviewers</a>
              <a href="#candidates" className="block px-4 py-3 text-lg font-bold hover:bg-primary/5 rounded-xl transition-colors">For Candidates</a>
              <a href="#how-it-works" className="block px-4 py-3 text-lg font-bold hover:bg-primary/5 rounded-xl transition-colors">How it Works</a>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <Button onClick={() => { setIsOpen(false); navigate('/login'); }} className="w-full h-12 justify-center bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20">
                Login
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </nav>
  );
};

const ListItem = ({ className, title, children, href, icon: Icon, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "group block select-none space-y-1 rounded-2xl p-4 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <div className="text-sm font-bold leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pt-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default Navbar;
