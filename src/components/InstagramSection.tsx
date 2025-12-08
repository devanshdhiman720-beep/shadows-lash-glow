import { useEffect } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const INSTAGRAM_HANDLE = "shadowsandlashes";
const INSTAGRAM_URL = "https://www.instagram.com/shadowsandlashes/";

// Add your Instagram post URLs here
const instagramPostUrls = [
  "https://www.instagram.com/p/DKjGvgOSIWU/",
];

export const InstagramSection = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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

        {/* Instagram Embeds Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {instagramPostUrls.map((url, index) => (
            <div 
              key={index} 
              className="w-full max-w-[540px] animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "hsl(var(--card))",
                  border: 0,
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-md)",
                  margin: "0 auto",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: 0,
                  width: "100%",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <a
                    href={url}
                    style={{
                      background: "hsl(var(--card))",
                      lineHeight: 0,
                      padding: 0,
                      textAlign: "center",
                      textDecoration: "none",
                      width: "100%",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center justify-center py-8">
                      <Instagram className="w-12 h-12 text-muted-foreground animate-pulse" />
                    </div>
                    <div className="text-primary font-medium">View this post on Instagram</div>
                  </a>
                </div>
              </blockquote>
            </div>
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
