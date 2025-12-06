import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  Image,
  Video,
  Users,
  Mail,
  Eye,
  EyeOff,
  Home,
  Save,
  X,
} from "lucide-react";

type TabType = "portfolio" | "videos" | "collaborations" | "messages";

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
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
}

interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  embed_url: string;
  duration: string | null;
  views: string | null;
  display_order: number;
  is_published: boolean;
}

interface Collaboration {
  id: string;
  brand: string;
  logo: string | null;
  description: string | null;
  testimonial: string | null;
  testimonial_author: string | null;
  collaboration_type: string | null;
  display_order: number;
  is_published: boolean;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("portfolio");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "portfolio") {
        const { data } = await supabase
          .from("portfolio_items" as any)
          .select("*")
          .order("display_order", { ascending: true });
        setPortfolioItems((data as unknown as PortfolioItem[]) || []);
      } else if (activeTab === "videos") {
        const { data } = await supabase
          .from("videos" as any)
          .select("*")
          .order("display_order", { ascending: true });
        setVideos((data as unknown as VideoItem[]) || []);
      } else if (activeTab === "collaborations") {
        const { data } = await supabase
          .from("collaborations" as any)
          .select("*")
          .order("display_order", { ascending: true });
        setCollaborations((data as unknown as Collaboration[]) || []);
      } else if (activeTab === "messages") {
        const { data } = await supabase
          .from("contact_submissions" as any)
          .select("*")
          .order("created_at", { ascending: false });
        setMessages((data as unknown as ContactSubmission[]) || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase.from(table as any).delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Deleted", description: "Item deleted successfully." });
      fetchData();
    }
  };

  const handleSave = async (data: any, table: string, isNew: boolean) => {
    let error;
    if (isNew) {
      const { error: insertError } = await supabase.from(table as any).insert([data]);
      error = insertError;
    } else {
      const { error: updateError } = await supabase
        .from(table as any)
        .update(data)
        .eq("id", data.id);
      error = updateError;
    }

    if (error) {
      toast({
        title: "Error",
        description: `Failed to save: ${error.message}`,
        variant: "destructive",
      });
    } else {
      toast({ title: "Saved", description: "Changes saved successfully." });
      setEditingItem(null);
      setIsCreating(false);
      fetchData();
    }
  };

  const togglePublished = async (id: string, table: string, current: boolean) => {
    const { error } = await supabase
      .from(table as any)
      .update({ is_published: !current })
      .eq("id", id);

    if (!error) {
      fetchData();
    }
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from("contact_submissions" as any)
      .update({ is_read: true })
      .eq("id", id);
    fetchData();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: "portfolio" as TabType, label: "Portfolio", icon: Image },
    { id: "videos" as TabType, label: "Videos", icon: Video },
    { id: "collaborations" as TabType, label: "Collaborations", icon: Users },
    { id: "messages" as TabType, label: "Messages", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-cream-dark pt-24 pb-12">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolio content
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home size={16} />
                View Site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-foreground text-background"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.id === "messages" && messages.filter((m) => !m.is_read).length > 0 && (
                <span className="w-5 h-5 bg-rose text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {messages.filter((m) => !m.is_read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-background rounded-lg p-6 shadow-sm">
          {/* Add New Button */}
          {activeTab !== "messages" && !isCreating && !editingItem && (
            <Button
              variant="hero"
              size="sm"
              className="mb-6"
              onClick={() => {
                setIsCreating(true);
                setEditingItem(getEmptyItem(activeTab));
              }}
            >
              <Plus size={16} />
              Add New
            </Button>
          )}

          {/* Edit/Create Form */}
          {(isCreating || editingItem) && activeTab !== "messages" && (
            <div className="mb-8 p-6 bg-cream-dark rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-xl font-medium">
                  {isCreating ? "Add New Item" : "Edit Item"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                >
                  <X size={18} />
                </Button>
              </div>
              <ItemForm
                item={editingItem}
                type={activeTab}
                onSave={(data) =>
                  handleSave(
                    data,
                    activeTab === "portfolio"
                      ? "portfolio_items"
                      : activeTab,
                    isCreating
                  )
                }
                onCancel={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
              />
            </div>
          )}

          {/* Items List */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading...
            </div>
          ) : (
            <>
              {activeTab === "portfolio" && (
                <ItemsList
                  items={portfolioItems}
                  onEdit={setEditingItem}
                  onDelete={(id) => handleDelete(id, "portfolio_items")}
                  onTogglePublish={(id, current) =>
                    togglePublished(id, "portfolio_items", current)
                  }
                  type="portfolio"
                />
              )}

              {activeTab === "videos" && (
                <ItemsList
                  items={videos}
                  onEdit={setEditingItem}
                  onDelete={(id) => handleDelete(id, "videos")}
                  onTogglePublish={(id, current) =>
                    togglePublished(id, "videos", current)
                  }
                  type="videos"
                />
              )}

              {activeTab === "collaborations" && (
                <ItemsList
                  items={collaborations}
                  onEdit={setEditingItem}
                  onDelete={(id) => handleDelete(id, "collaborations")}
                  onTogglePublish={(id, current) =>
                    togglePublished(id, "collaborations", current)
                  }
                  type="collaborations"
                />
              )}

              {activeTab === "messages" && (
                <MessagesList messages={messages} onMarkRead={markAsRead} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const getEmptyItem = (type: TabType) => {
  if (type === "portfolio") {
    return {
      title: "",
      category: "Beauty",
      image_url: "",
      description: "",
      brand: "",
      objective: "",
      approach: "",
      results: "",
      display_order: 0,
      is_featured: false,
      is_published: true,
    };
  } else if (type === "videos") {
    return {
      title: "",
      category: "Tutorials",
      thumbnail_url: "",
      embed_url: "",
      duration: "",
      views: "",
      display_order: 0,
      is_published: true,
    };
  } else {
    return {
      brand: "",
      logo: "",
      description: "",
      testimonial: "",
      testimonial_author: "",
      collaboration_type: "",
      display_order: 0,
      is_published: true,
    };
  }
};

const ItemForm = ({
  item,
  type,
  onSave,
  onCancel,
}: {
  item: any;
  type: TabType;
  onSave: (data: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: inputType === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const portfolioCategories = ["Beauty", "Skincare", "Lifestyle", "Product Demo"];
  const videoCategories = ["Tutorials", "Ads", "Unboxings", "Testimonials", "Raw Clips"];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
      className="space-y-4"
    >
      {type === "portfolio" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                {portfolioCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL *</label>
            <Input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <Input name="brand" value={formData.brand || ""} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Results</label>
              <Input name="results" value={formData.results || ""} onChange={handleChange} placeholder="e.g., 2.5M+ views" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea name="description" value={formData.description || ""} onChange={handleChange} rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Objective</label>
            <Textarea name="objective" value={formData.objective || ""} onChange={handleChange} rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approach</label>
            <Textarea name="approach" value={formData.approach || ""} onChange={handleChange} rows={2} />
          </div>
        </>
      )}

      {type === "videos" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                {videoCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail URL *</label>
            <Input name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Embed URL *</label>
            <Input name="embed_url" value={formData.embed_url} onChange={handleChange} required placeholder="https://youtube.com/embed/..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <Input name="duration" value={formData.duration || ""} onChange={handleChange} placeholder="4:32" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Views</label>
              <Input name="views" value={formData.views || ""} onChange={handleChange} placeholder="125K" />
            </div>
          </div>
        </>
      )}

      {type === "collaborations" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand *</label>
              <Input name="brand" value={formData.brand} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Input name="collaboration_type" value={formData.collaboration_type || ""} onChange={handleChange} placeholder="Campaign, Partnership, etc." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo (single letter)</label>
            <Input name="logo" value={formData.logo || ""} onChange={handleChange} maxLength={1} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea name="description" value={formData.description || ""} onChange={handleChange} rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Testimonial</label>
            <Textarea name="testimonial" value={formData.testimonial || ""} onChange={handleChange} rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Testimonial Author</label>
            <Input name="testimonial_author" value={formData.testimonial_author || ""} onChange={handleChange} />
          </div>
        </>
      )}

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_published"
            checked={formData.is_published}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Published
        </label>
        {type === "portfolio" && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Featured on Homepage
          </label>
        )}
        <div>
          <label className="text-sm mr-2">Display Order:</label>
          <Input
            type="number"
            name="display_order"
            value={formData.display_order}
            onChange={handleChange}
            className="w-20 inline-block"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="hero">
          <Save size={16} />
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const ItemsList = ({
  items,
  onEdit,
  onDelete,
  onTogglePublish,
  type,
}: {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, current: boolean) => void;
  type: string;
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No items yet. Add your first one!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 bg-cream-dark rounded-lg"
        >
          {(type === "portfolio" || type === "videos") && (item.image_url || item.thumbnail_url) ? (
            <img
              src={type === "videos" ? item.thumbnail_url : item.image_url}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center font-serif text-xl">
              {item.logo || item.brand?.charAt(0) || "?"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">
              {item.title || item.brand}
            </h4>
            <p className="text-sm text-muted-foreground">
              {item.category || item.collaboration_type || "—"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onTogglePublish(item.id, item.is_published)}
              className={`p-2 rounded hover:bg-secondary ${
                item.is_published ? "text-foreground" : "text-muted-foreground"
              }`}
              title={item.is_published ? "Published" : "Draft"}
            >
              {item.is_published ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <button
              onClick={() => onEdit(item)}
              className="p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const MessagesList = ({
  messages,
  onMarkRead,
}: {
  messages: ContactSubmission[];
  onMarkRead: (id: string) => void;
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            msg.is_read ? "bg-cream-dark" : "bg-rose/10 border border-rose/20"
          }`}
          onClick={() => {
            setExpandedId(expandedId === msg.id ? null : msg.id);
            if (!msg.is_read) onMarkRead(msg.id);
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{msg.name}</h4>
                {!msg.is_read && (
                  <span className="px-2 py-0.5 bg-rose text-primary-foreground text-xs rounded">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {msg.subject}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {new Date(msg.created_at).toLocaleDateString()}
            </span>
          </div>

          {expandedId === msg.id && (
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <p className="text-sm">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${msg.email}`} className="text-rose hover:underline">
                  {msg.email}
                </a>
              </p>
              {msg.company && (
                <p className="text-sm">
                  <strong>Company:</strong> {msg.company}
                </p>
              )}
              <p className="text-sm">
                <strong>Message:</strong>
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Admin;
