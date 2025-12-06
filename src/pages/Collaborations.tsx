import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Collaboration {
  id: string;
  brand: string;
  logo: string | null;
  description: string | null;
  testimonial: string | null;
  testimonial_author: string | null;
  collaboration_type: string | null;
}

const fallbackCollaborations: Collaboration[] = [
  {
    id: "1",
    brand: "Glow Beauty Co.",
    logo: "G",
    description: "Long-term partnership creating educational skincare content and product launches.",
    testimonial: "ShadowsAndLashes brought our products to life in a way we never imagined. Her content drove real results.",
    testimonial_author: "Sarah M., Marketing Director",
    collaboration_type: "Ongoing Partnership",
  },
  {
    id: "2",
    brand: "Luxe Cosmetics",
    logo: "L",
    description: "Luxury makeup campaign featuring high-end product photography and tutorials.",
    testimonial: "The quality and aesthetic of her work perfectly aligned with our brand. A true professional.",
    testimonial_author: "James K., Brand Manager",
    collaboration_type: "Campaign",
  },
  {
    id: "3",
    brand: "Pure Skin Lab",
    logo: "P",
    description: "Clean beauty education series focusing on ingredient transparency and skincare science.",
    testimonial: null,
    testimonial_author: null,
    collaboration_type: "Content Series",
  },
  {
    id: "4",
    brand: "Essence Perfumery",
    logo: "E",
    description: "Lifestyle fragrance content capturing the essence of each scent through storytelling.",
    testimonial: "She understood our vision immediately and created content that truly captured our brand's soul.",
    testimonial_author: "Marie L., Creative Director",
    collaboration_type: "Campaign",
  },
  {
    id: "5",
    brand: "SkinFirst",
    logo: "S",
    description: "Viral product texture content that generated millions of views across platforms.",
    testimonial: null,
    testimonial_author: null,
    collaboration_type: "Viral Campaign",
  },
  {
    id: "6",
    brand: "Natural Glow",
    logo: "N",
    description: "Sustainable beauty campaign highlighting eco-friendly products and practices.",
    testimonial: "Her authenticity and passion for clean beauty made this collaboration incredibly successful.",
    testimonial_author: "David R., Founder",
    collaboration_type: "Brand Ambassador",
  },
];

const brandLogos = [
  "Glow Beauty", "Luxe Cosmetics", "Pure Skin Lab", "Essence", "SkinFirst", "Natural Glow",
  "Beauty Box", "Radiant", "Clean Co", "Bloom Beauty",
];

const Collaborations = () => {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      const { data, error } = await supabase
        .from("collaborations" as any)
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setCollaborations(data as unknown as Collaboration[]);
      } else {
        setCollaborations(fallbackCollaborations);
      }
    } catch (error) {
      console.error("Error fetching collaborations:", error);
      setCollaborations(fallbackCollaborations);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-cream-dark">
        <div className="container-wide text-center">
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
            Brand Work
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Collaborations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proud to have partnered with incredible brands across the beauty, skincare, 
            and lifestyle industries.
          </p>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-wide">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by Leading Brands
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {brandLogos.map((brand) => (
              <div
                key={brand}
                className="text-muted-foreground/50 font-serif text-lg md:text-xl hover:text-foreground transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading collaborations...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collaborations.map((collab) => (
                <div
                  key={collab.id}
                  className="glass-card rounded-lg p-8 hover-lift"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-rose/10 flex items-center justify-center font-serif text-xl text-rose">
                      {collab.logo || collab.brand.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium">{collab.brand}</h3>
                      <p className="text-sm text-rose">{collab.collaboration_type}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{collab.description}</p>

                  {collab.testimonial && (
                    <div className="border-l-2 border-rose/30 pl-4">
                      <Quote size={20} className="text-rose/50 mb-2" />
                      <p className="text-sm italic mb-2">{collab.testimonial}</p>
                      <p className="text-xs text-muted-foreground">— {collab.testimonial_author}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Ready to join the list?
          </h2>
          <p className="text-cream-dark/70 max-w-xl mx-auto mb-8">
            I'm always looking for new brands to collaborate with. If you think 
            we'd be a great fit, let's connect.
          </p>
          <Button 
            variant="default"
            size="lg"
            className="bg-background text-foreground hover:bg-cream-dark"
            asChild
          >
            <Link to="/contact">
              Start a Collaboration
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Collaborations;
