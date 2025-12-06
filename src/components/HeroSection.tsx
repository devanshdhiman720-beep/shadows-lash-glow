import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Beauty and skincare flatlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center pt-20">
        <div className="max-w-4xl mx-auto">
          <p className="animate-in text-sm md:text-base font-sans uppercase tracking-[0.3em] text-muted-foreground mb-6">
            UGC Creator • Beauty • Lifestyle • Product Storytelling
          </p>
          
          <h1 className="animate-in-delay-1 font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8">
            ShadowsAndLashes
          </h1>
          
          <p className="animate-in-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Creating authentic, scroll-stopping content that transforms products into stories 
            and brands into experiences.
          </p>
          
          <div className="animate-in-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/portfolio">
                View Portfolio
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="elegant" size="lg" asChild>
              <Link to="/videos">
                <Play size={18} />
                Watch Videos
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-in-delay-4 absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-foreground/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
