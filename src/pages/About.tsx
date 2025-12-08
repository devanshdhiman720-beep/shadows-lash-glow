import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import creatorPortrait from "@/assets/creator-portrait-new.png";

const skills = [
  { name: "UGC Content Creation", level: 95 },
  { name: "Product Photography", level: 90 },
  { name: "Video Production", level: 88 },
  { name: "Brand Storytelling", level: 92 },
  { name: "Social Media Strategy", level: 85 },
  { name: "Content Editing", level: 90 },
];

const timeline = [
  {
    year: "2024",
    title: "Full-time UGC Creator",
    description: "Transitioned to full-time content creation, working with 50+ brands across beauty and lifestyle.",
  },
  {
    year: "2023",
    title: "Brand Partnerships",
    description: "Secured long-term partnerships with major beauty and skincare brands.",
  },
  {
    year: "2022",
    title: "Started Content Journey",
    description: "Began creating content on social media, focusing on authentic product reviews and tutorials.",
  },
  {
    year: "2021",
    title: "Beauty Industry Experience",
    description: "Worked in the beauty industry, gaining deep product knowledge and industry insights.",
  },
];

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={creatorPortrait}
                  alt="ShadowsAndLashes - UGC Creator"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose/20 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
                About Me
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                ShadowsAndLashes
              </h1>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p className="text-lg">
                  I'm a passionate UGC creator specializing in beauty, skincare, and lifestyle content. 
                  My mission is to create authentic, visually stunning content that resonates with 
                  audiences and drives real results for brands.
                </p>
                <p>
                  With a background in the beauty industry and years of experience creating engaging 
                  content, I understand what makes audiences stop scrolling. I combine creative vision 
                  with strategic thinking to craft content that not only looks beautiful but also 
                  converts.
                </p>
                <p>
                  Whether it's a product demo, skincare routine, or lifestyle vlog, I bring authenticity 
                  and artistry to every piece of content I create. I believe in the power of genuine 
                  storytelling to build lasting connections between brands and their audiences.
                </p>
              </div>
              <Button variant="hero" asChild>
                <a href="#" download>
                  <Download size={16} />
                  Download Media Kit
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
              Expertise
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              Skills & Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
              My Journey
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              Experience Timeline
            </h2>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-rose flex items-center justify-center text-primary-foreground font-serif text-sm">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-serif text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Ready to work together?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            I'm always excited to collaborate with brands that share my passion for 
            authentic, beautiful content. Let's create something amazing together.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get in Touch
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
