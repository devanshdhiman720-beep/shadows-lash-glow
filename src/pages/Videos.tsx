import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  embed_url: string;
  duration: string | null;
  views: string | null;
}

const videoCategories = ["All", "Tutorials", "Ads", "Unboxings", "Testimonials", "Raw Clips"];

const fallbackVideos: VideoItem[] = [
  {
    id: "1",
    title: "5-Step Skincare Routine Tutorial",
    category: "Tutorials",
    thumbnail_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=640&h=360&fit=crop",
    duration: "4:32",
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "125K",
  },
  {
    id: "2",
    title: "Glow Serum Product Ad",
    category: "Ads",
    thumbnail_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=640&h=360&fit=crop",
    duration: "0:30",
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "2.1M",
  },
  {
    id: "3",
    title: "Luxury Beauty Haul Unboxing",
    category: "Unboxings",
    thumbnail_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=640&h=360&fit=crop",
    duration: "8:15",
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "89K",
  },
  {
    id: "4",
    title: "Client Testimonial - Pure Skin Lab",
    category: "Testimonials",
    thumbnail_url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=640&h=360&fit=crop",
    duration: "1:45",
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "45K",
  },
  {
    id: "5",
    title: "Natural Makeup Look Tutorial",
    category: "Tutorials",
    thumbnail_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=640&h=360&fit=crop",
    duration: "6:22",
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "210K",
  },
  {
    id: "6",
    title: "Behind the Scenes - Raw Footage",
    category: "Raw Clips",
    thumbnail_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=640&h=360&fit=crop",
    duration: "3:08",
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "32K",
  },
];

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos" as any)
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setVideos(data as unknown as VideoItem[]);
      } else {
        setVideos(fallbackVideos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos(fallbackVideos);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = activeCategory === "All"
    ? videos
    : videos.filter((video) => video.category === activeCategory);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-cream-dark">
        <div className="container-wide text-center">
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-rose mb-3">
            Video Gallery
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Watch My Content
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my video content including tutorials, product ads, unboxings, 
            and behind-the-scenes footage.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-[60px] z-40">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 justify-center">
            {videoCategories.map((category) => (
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

      {/* Video Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading videos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="relative overflow-hidden rounded-lg hover-lift">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center">
                        <Play size={24} className="ml-1" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-charcoal/80 text-cream text-xs rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-rose uppercase tracking-wider mb-1">
                      {video.category}
                    </p>
                    <h3 className="font-serif text-lg font-medium group-hover:text-rose transition-colors">
                      {video.title}
                    </h3>
                    {video.views && (
                      <p className="text-sm text-muted-foreground mt-1">{video.views} views</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-background rounded-lg max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              <iframe
                src={activeVideo.embed_url}
                title={activeVideo.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-rose uppercase tracking-wider mb-1">
                    {activeVideo.category}
                  </p>
                  <h3 className="font-serif text-2xl font-medium">
                    {activeVideo.title}
                  </h3>
                  {activeVideo.views && (
                    <p className="text-muted-foreground mt-1">{activeVideo.views} views</p>
                  )}
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
