import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const featuredWork = [
  {
    id: 1,
    title: "Glow Serum Campaign",
    category: "Skincare",
    image: portfolio1,
  },
  {
    id: 2,
    title: "Morning Routine",
    category: "Lifestyle",
    image: portfolio2,
  },
  {
    id: 3,
    title: "Luxury Lip Collection",
    category: "Beauty",
    image: portfolio3,
  },
  {
    id: 4,
    title: "Clean Beauty Edit",
    category: "Skincare",
    image: portfolio4,
  },
  {
    id: 5,
    title: "Texture & Touch",
    category: "Product Demo",
    image: portfolio5,
  },
  {
    id: 6,
    title: "Fragrance Story",
    category: "Lifestyle",
    image: portfolio6,
  },
];

export const FeaturedWorkSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
              Featured Work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
              Selected Projects
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/portfolio">
              View All Work
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWork.map((work, index) => (
            <Link
              key={work.id}
              to={`/portfolio#${work.id}`}
              className="group relative overflow-hidden rounded-lg hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-sm text-rose-light uppercase tracking-wider mb-1">
                  {work.category}
                </p>
                <h3 className="font-serif text-xl text-cream">{work.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
