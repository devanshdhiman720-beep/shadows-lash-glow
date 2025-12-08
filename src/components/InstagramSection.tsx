import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const INSTAGRAM_HANDLE = "shadowsandlashes";
const INSTAGRAM_URL = "https://www.instagram.com/shadowsandlashes/";

// Instagram posts to display - add your post URLs here
const instagramPosts = [
  {
    id: "1",
    embedUrl: "https://www.instagram.com/p/EXAMPLE1/",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    alt: "Beauty content"
  },
  {
    id: "2", 
    embedUrl: "https://www.instagram.com/p/EXAMPLE2/",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    alt: "Skincare routine"
  },
  {
    id: "3",
    embedUrl: "https://www.instagram.com/p/EXAMPLE3/",
    thumbnail: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop",
    alt: "Product showcase"
  },
  {
    id: "4",
    embedUrl: "https://www.instagram.com/p/EXAMPLE4/",
    thumbnail: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&h=400&fit=crop",
    alt: "Lifestyle content"
  },
  {
    id: "5",
    embedUrl: "https://www.instagram.com/p/EXAMPLE5/",
    thumbnail: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop",
    alt: "Beauty tips"
  },
  {
    id: "6",
    embedUrl: "https://www.instagram.com/p/EXAMPLE6/",
    thumbnail: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
    alt: "Creative content"
  }
];

export const InstagramSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12 animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose/10 to-gold/10 border border-rose/20 mb-6">
            <Instagram className="w-4 h-4 text-rose" />
            <span className="text-sm font-medium text-foreground">Follow Along</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            @{INSTAGRAM_HANDLE}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join me on Instagram for behind-the-scenes content, beauty tips, and the latest collaborations
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square overflow-hidden rounded-lg hover-lift animate-in-delay-${Math.min(index + 1, 4)}`}
            >
              <img
                src={post.thumbnail}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
              {/* Decorative border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose/50 rounded-lg transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-in-delay-3">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
