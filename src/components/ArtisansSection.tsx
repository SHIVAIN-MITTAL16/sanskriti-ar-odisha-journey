import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";
import pattachitraArt from "@/assets/pattachitra-art.jpg";
import silverFiligree from "@/assets/silver-filigree.jpg";
import stoneCarving from "@/assets/stone-carving.jpg";

const artisanWorks = [
  {
    id: 1,
    title: "Traditional Pattachitra Painting",
    artist: "Raghurajpur Artisan Collective",
    description: "Hand-painted on cloth depicting Lord Krishna's divine leelas with natural pigments and traditional techniques passed down through generations.",
    image: pattachitraArt,
    price: "₹2,500",
    rating: 4.9,
    category: "Painting",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    title: "Silver Filigree Jewelry Set",
    artist: "Cuttack Master Craftsmen",
    description: "Intricate silver filigree work showcasing the delicate artistry of Cuttack's renowned metalwork tradition.",
    image: silverFiligree,
    price: "₹8,900",
    rating: 4.8,
    category: "Jewelry",
    inStock: true,
    featured: false
  },
  {
    id: 3,
    title: "Temple Stone Sculpture",
    artist: "Konark Stone Carvers Guild",
    description: "Hand-carved stone sculpture inspired by Konark temple architecture, featuring intricate traditional motifs.",
    image: stoneCarving,
    price: "₹15,000",
    rating: 5.0,
    category: "Sculpture",
    inStock: false,
    featured: true
  }
];

export const ArtisansSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const categories = ["All", "Painting", "Jewelry", "Sculpture"];

  const filteredWorks = selectedCategory === "All" 
    ? artisanWorks 
    : artisanWorks.filter(work => work.category === selectedCategory);

  const toggleLike = (id: number) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInScale">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gold mb-6">
            Master Artisans & Handicrafts
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Discover the timeless beauty of Odisha's traditional crafts. Each piece tells a story of heritage, 
            skill, and artistic passion passed down through generations.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gradient-gold text-gold-foreground shadow-glow' 
                    : 'border-gold/20 text-gold hover:bg-gold/10'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Artisan Works Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => (
            <Card 
              key={work.id} 
              className="bg-gradient-card border-border/20 shadow-card overflow-hidden hover-lift group transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {work.featured && (
                    <Badge className="bg-gold text-gold-foreground shadow-glow">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                    {work.category}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-black/50 border-white/20 text-white hover:bg-white/10 w-10 h-10 p-0"
                    onClick={() => toggleLike(work.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${likedItems.has(work.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-black/50 border-white/20 text-white hover:bg-white/10 w-10 h-10 p-0"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Out of Stock Overlay */}
                {!work.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-6 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-gold mb-2 line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="text-sm text-saffron font-medium mb-2">
                    by {work.artist}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {work.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(work.rating) 
                            ? 'fill-gold text-gold' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {work.rating}
                  </span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/20">
                  <span className="text-2xl font-bold text-gold">
                    {work.price}
                  </span>
                  <Button 
                    size="sm"
                    disabled={!work.inStock}
                    className={`transition-all duration-300 ${
                      work.inStock 
                        ? 'bg-gradient-emerald text-emerald-foreground hover:shadow-glow hover:scale-105' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {work.inStock ? 'Purchase' : 'Sold Out'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Meet the Artisans CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-card border-border/20 shadow-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-semibold text-gold mb-4">
              Meet the Master Artisans
            </h3>
            <p className="text-foreground/80 mb-6">
              Visit our artisan villages and witness the creation of these masterpieces firsthand. 
              Learn traditional techniques and support local craftspeople directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-gold text-gold-foreground hover:shadow-glow transition-all duration-300">
                Schedule Village Visit
              </Button>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                Virtual Workshop Tour
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};