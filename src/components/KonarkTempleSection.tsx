import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Sun } from "lucide-react";

export const KonarkTempleSection = () => {
  const handleArView = () => {
    window.open('https://mywebar.com/qr/759642', '_blank');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-card/50 to-saffron/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="floating-particles">
        <div className="particle w-2 h-2 top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }} />
        <div className="particle w-1 h-1 top-3/4 left-3/4 animate-float" style={{ animationDelay: '2s' }} />
        <div className="particle w-3 h-3 top-1/2 left-1/3 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInScale">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gold mb-6 flex items-center justify-center gap-4">
            <Sun className="w-12 h-12 text-saffron animate-pulse-glow" />
            Explore the Konark Sun Temple in AR
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Step back into history and witness the grandeur of the Konark Sun Temple. 
            Experience 3D heritage, ancestor avatars, and narrated stories — all in Augmented Reality.
          </p>
        </div>

        {/* AR Experience Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden bg-gradient-card border-gold/20 shadow-card hover-lift group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/images/konark-temple.jpg" 
                alt="Konark Sun Temple - UNESCO World Heritage Site"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 via-transparent to-gold/20" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
              {/* Temple Info Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-2">
                  <span className="text-gold font-semibold text-sm">UNESCO World Heritage Site</span>
                </div>
              </div>

              {/* Heritage Details */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-gold">
                    Konark Sun Temple
                  </h3>
                  <p className="text-lg text-foreground/90 max-w-2xl">
                    Built in the 13th century CE, this architectural marvel represents the chariot of 
                    the Sun God Surya with 24 intricately carved wheels and pulled by seven horses.
                  </p>
                </div>

                {/* AR Experience Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-card/30 backdrop-blur-sm border border-gold/20 rounded-lg p-4">
                    <h4 className="text-gold font-semibold mb-2">3D Heritage</h4>
                    <p className="text-sm text-foreground/80">Explore detailed 3D reconstructions</p>
                  </div>
                  <div className="bg-card/30 backdrop-blur-sm border border-gold/20 rounded-lg p-4">
                    <h4 className="text-gold font-semibold mb-2">Time Travel</h4>
                    <p className="text-sm text-foreground/80">Witness ancient glory restored</p>
                  </div>
                  <div className="bg-card/30 backdrop-blur-sm border border-gold/20 rounded-lg p-4">
                    <h4 className="text-gold font-semibold mb-2">Interactive Stories</h4>
                    <p className="text-sm text-foreground/80">Listen to rich historical narratives</p>
                  </div>
                </div>

                {/* AR View Button */}
                <div className="flex justify-center">
                  <Button 
                    onClick={handleArView}
                    size="lg"
                    className="bg-gradient-gold text-gold-foreground border-0 shadow-glow 
                             hover:shadow-[0_0_60px_hsl(var(--gold)_/_0.6)] 
                             transform hover:scale-105 transition-all duration-300 
                             text-lg px-8 py-6 font-semibold group glow-on-hover"
                  >
                    <Sun className="w-6 h-6 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    🔍 View in AR
                    <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="text-center pt-4">
                  <p className="text-sm text-foreground/60">
                    Experience works best on mobile devices with camera access
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-saffron/30 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold/20 to-transparent rounded-tr-full" />
          </Card>
        </div>

        {/* Cultural Context */}
        <div className="text-center mt-12 animate-fadeInScale">
          <div className="bg-card/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 max-w-3xl mx-auto">
            <h4 className="text-xl font-serif font-semibold text-saffron mb-3">
              Why Konark Sun Temple?
            </h4>
            <p className="text-foreground/80">
              This magnificent temple showcases the zenith of Kalinga architecture and represents 
              one of India's most iconic monuments. The AR experience brings to life the temple's 
              original grandeur, complete with missing sections and vibrant colors as they appeared 
              800 years ago.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};