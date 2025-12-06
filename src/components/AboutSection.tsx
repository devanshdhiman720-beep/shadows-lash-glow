import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import creatorPortrait from "@/assets/creator-portrait.jpg";

const skills = [
  "UGC Content Creation",
  "Product Photography",
  "Video Production",
  "Brand Storytelling",
  "Social Media Strategy",
  "Content Editing",
];

export const AboutSection = () => {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src={creatorPortrait}
                alt="ShadowsAndLashes - UGC Creator"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
              About Me
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
              Hi, I'm ShadowsAndLashes
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                I'm a UGC creator passionate about crafting authentic, visually stunning content 
                that brings products to life. With a keen eye for aesthetics and deep understanding 
                of what makes content resonate, I help brands tell their story in ways that captivate 
                and convert.
              </p>
              <p>
                Specializing in beauty, skincare, and lifestyle content, I blend creativity with 
                strategy to create scroll-stopping visuals that drive engagement and build 
                genuine connections with audiences.
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-secondary rounded-full text-sm font-sans"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" asChild>
                <Link to="/about">
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="#" download>
                  <Download size={16} />
                  Download Media Kit
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
