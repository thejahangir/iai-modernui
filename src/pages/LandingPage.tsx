import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ValueProposition from "../components/ValueProposition";
import Features from "../components/Features";
import UserSegments from "../components/UserSegments";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-primary p-12 lg:p-24 text-center text-white"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-extrabold font-heading mb-8 leading-tight">
              Ready to transform your hiring process?
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Join hundreds of companies that trust IamInterviewed to find and hire top technical talent with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="h-16 px-10 text-xl bg-white text-primary hover:bg-white/90 font-bold shadow-2xl">
                Get Started Now
                <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl border-2 border-white/30 text-white font-bold hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ValueProposition />
        <Features />
        <UserSegments />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
