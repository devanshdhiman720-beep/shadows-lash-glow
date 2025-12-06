import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string | null;
  brand: string | null;
  objective: string | null;
  approach: string | null;
  results: string | null;
  is_featured: boolean;
}

const fallbackWork = [
  { id: "1", title: "Glow Serum Campaign", category: "Skincare", image_url: portfolio1 },
  { id: "2", title: "Morning Routine", category: "Lifestyle", image_url: portfolio2 },
  { id: "3", title: "Luxury Lip Collection", category: "Beauty", image_url: portfolio3 },
  { id: "4", title: "Clean Beauty Edit", category: "Skincare", image_url: portfolio4 },
  { id: "5", title: "Texture & Touch", category: "Product Demo", image_url: portfolio5 },
  { id: "6", title: "Fragrance Story", category: "Lifestyle", image_url: portfolio6 },
];

const categories = ["All", "Beauty", "Skincare", "Lifestyle", "Product Demo"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from("portfolio_items" as any)
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setPortfolioItems(data as unknown as PortfolioItem[]);
      } else {
        setPortfolioItems(fallbackWork as PortfolioItem[]);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setPortfolioItems(fallbackWork as PortfolioItem[]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-cream-dark">
        <div className="container-wide text-center">
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            UGC Portfolio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of my work across beauty, skincare, lifestyle, and product content. 
            Each project tells a unique story.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-[60px] z-40">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-sans transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading portfolio...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  id={String(item.id)}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden rounded-lg hover-lift">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-sm text-rose-light uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-xl text-cream">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <p className="text-sm text-rose uppercase tracking-wider mb-2">
                  {selectedItem.category}
                </p>
                <h2 className="font-serif text-3xl font-medium mb-4">
                  {selectedItem.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {selectedItem.description || "Beautiful content crafted with care."}
                </p>

                <div className="space-y-4 mb-8">
                  {selectedItem.brand && (
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Brand</h4>
                      <p className="text-muted-foreground">{selectedItem.brand}</p>
                    </div>
                  )}
                  {selectedItem.objective && (
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Objective</h4>
                      <p className="text-muted-foreground">{selectedItem.objective}</p>
                    </div>
                  )}
                  {selectedItem.approach && (
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Approach</h4>
                      <p className="text-muted-foreground">{selectedItem.approach}</p>
                    </div>
                  )}
                  {selectedItem.results && (
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Results</h4>
                      <p className="text-rose font-medium">{selectedItem.results}</p>
                    </div>
                  )}
                </div>

                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="section-padding bg-cream-dark">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Want to see more?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Check out my video gallery for more dynamic content, or get in touch 
            to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link to="/videos">
                View Videos
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Contact Me
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
