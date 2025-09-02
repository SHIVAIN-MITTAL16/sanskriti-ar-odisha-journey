import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, MapPin, Camera } from "lucide-react";
import konarkTemple from "@/assets/konark-temple.jpg";
import jagannathTemple from "@/assets/jagannath-temple.jpg";
import chilikaLake from "@/assets/chilika-lake.jpg";

const monuments = [
  { image: konarkTemple, name: "Konark Sun Temple" },
  { image: jagannathTemple, name: "Jagannath Puri Temple" },
  { image: chilikaLake, name: "Chilika Lake" }
];

export const Hero = () => {
  const [currentMonument, setCurrentMonument] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentMonument((prev) => (prev + 1) % monuments.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const createParticles = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
        }}
      />
    ));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 parallax-container">
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-element transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `linear-gradient(rgba(12, 24, 20, 0.7), rgba(12, 24, 20, 0.5)), url(${monuments[currentMonument].image})`,
            transform: `scale(1.1) translateY(${currentMonument * -10}px)`
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {createParticles()}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />

      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
        {/* Monument Indicator */}
        <div className="mb-6 flex items-center justify-center gap-2 text-gold/80">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{monuments[currentMonument].name}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 hero-text leading-tight">
          Sanskriti AR
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gold mb-4 font-light">
          Experience Odisha Like Never Before
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Travel through time, culture, and heritage with AR magic. Discover ancient monuments, meet traditional artisans, and immerse yourself in Odisha's rich cultural tapestry.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-gold text-gold-foreground hover:shadow-glow transition-all duration-300 hover:scale-105 text-lg px-8 py-4 rounded-full border-2 border-gold/20"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Virtual Tour
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-gold text-gold hover:bg-gold/10 hover:shadow-glow transition-all duration-300 hover:scale-105 text-lg px-8 py-4 rounded-full"
          >
            <Camera className="w-5 h-5 mr-2" />
            Explore Artisans
          </Button>
        </div>

        {/* Monument Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {monuments.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMonument(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentMonument 
                  ? 'bg-gold shadow-glow scale-125' 
                  : 'bg-gold/30 hover:bg-gold/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-glow">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};