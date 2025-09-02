import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-secondary to-background border-t border-border/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-gold">
              Sanskriti AR
            </h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Experience Odisha's rich cultural heritage through immersive AR technology. 
              Connecting past and present, tradition and innovation.
            </p>
            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold text-gold">
              Explore
            </h4>
            <nav className="space-y-2">
              <a href="#hero" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                Virtual Tours
              </a>
              <a href="#ar-experience" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                AR Experience
              </a>
              <a href="#artisans" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                Artisans & Crafts
              </a>
              <a href="#rewards" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                Rewards Program
              </a>
            </nav>
          </div>

          {/* Heritage Sites */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold text-gold">
              Heritage Sites
            </h4>
            <nav className="space-y-2">
              <a href="#" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                Konark Sun Temple
              </a>
              <a href="#" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                Jagannath Puri Temple
              </a>
              <a href="#" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                Chilika Lake
              </a>
              <a href="#" className="block text-foreground/80 hover:text-gold transition-colors text-sm">
                Udayagiri Caves
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold text-gold">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80">
                  Tourism Department<br />
                  Government of Odisha<br />
                  Bhubaneswar, Odisha
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-foreground/80">+91 674 2345678</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-foreground/80">info@sanskriti-ar.gov.in</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-foreground/80">www.odishatourism.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-foreground/60">
              © 2024 Sanskriti AR - Odisha Tourism Experience. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-foreground/60 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-foreground/60 hover:text-gold transition-colors">
                Accessibility
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-border/20">
            <p className="text-xs text-foreground/50">
              Proudly developed for promoting Odisha's cultural heritage through innovative technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};