import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Videos", path: "/videos" },
  { name: "Collaborations", path: "/collaborations" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
  { name: "TikTok", icon: ArrowUpRight, url: "https://tiktok.com" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com" },
  { name: "Email", icon: Mail, url: "mailto:hello@shadowsandlashes.com" },
];

export const Footer = () => {
  return (
    <footer className="bg-cream-dark border-t border-border">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl md:text-3xl font-medium mb-4">
              ShadowsAndLashes
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              UGC Creator specializing in beauty, skincare, lifestyle, and product storytelling. 
              Crafting authentic content that connects brands with their audience.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Let's Connect
            </h4>
            <div className="space-y-3 text-muted-foreground">
              <p>For collaborations and inquiries:</p>
              <a
                href="mailto:hello@shadowsandlashes.com"
                className="text-foreground hover:text-rose transition-colors block"
              >
                hello@shadowsandlashes.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShadowsAndLashes. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
