import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container-narrow relative z-10 text-center">
        <p className="text-sm font-sans uppercase tracking-[0.3em] text-rose-light mb-4">
          Let's Create Together
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 max-w-3xl mx-auto">
          Ready to bring your brand's story to life?
        </h2>
        <p className="text-lg text-cream-dark/70 max-w-2xl mx-auto mb-10">
          I'm always excited to collaborate with brands that share a passion for 
          authentic storytelling and beautiful content. Let's discuss your next project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-background text-foreground hover:bg-cream-dark"
            asChild
          >
            <Link to="/contact">
              <Mail size={18} />
              Get in Touch
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-cream-dark/30 text-background hover:bg-cream-dark/10"
            asChild
          >
            <Link to="/collaborations">
              View Collaborations
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
