import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, Gift, Trophy, Star, Coins } from "lucide-react";

const achievements = [
  { id: 1, title: "Heritage Explorer", description: "Visit 3 AR monuments", progress: 100, total: 3, completed: true, coins: 50 },
  { id: 2, title: "Quiz Master", description: "Answer 10 heritage questions correctly", progress: 70, total: 10, completed: false, coins: 30 },
  { id: 3, title: "Culture Enthusiast", description: "Spend 30 minutes exploring", progress: 85, total: 30, completed: false, coins: 25 },
  { id: 4, title: "Artisan Supporter", description: "Purchase from local artisans", progress: 0, total: 1, completed: false, coins: 100 }
];

const souvenirs = [
  {
    id: 1,
    title: "Digital Heritage Certificate",
    description: "Personalized certificate of your Odisha heritage journey",
    image: "/api/placeholder/300/200",
    cost: 50,
    type: "certificate"
  },
  {
    id: 2,
    title: "AR Monument Collection",
    description: "Downloadable 3D models of visited monuments",
    image: "/api/placeholder/300/200",
    cost: 75,
    type: "3d-model"
  },
  {
    id: 3,
    title: "Cultural Wallpaper Pack",
    description: "High-resolution Odisha heritage wallpapers",
    image: "/api/placeholder/300/200",
    cost: 25,
    type: "wallpaper"
  },
  {
    id: 4,
    title: "Virtual Museum Pass",
    description: "Access to exclusive virtual exhibitions",
    image: "/api/placeholder/300/200",
    cost: 100,
    type: "pass"
  }
];

export const RewardsSection = () => {
  const [totalCoins, setTotalCoins] = useState(155);
  const [ownedSouvenirs, setOwnedSouvenirs] = useState<Set<number>>(new Set([1]));

  const handlePurchase = (souvenir: typeof souvenirs[0]) => {
    if (totalCoins >= souvenir.cost) {
      setTotalCoins(prev => prev - souvenir.cost);
      setOwnedSouvenirs(prev => new Set([...prev, souvenir.id]));
    }
  };

  const handleDownload = (souvenirId: number) => {
    // Simulate download - in real app, this would trigger actual file download
    console.log(`Downloading souvenir ${souvenirId}`);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInScale">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gold mb-6">
            Rewards & Digital Souvenirs
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Earn Culture Coins through your heritage journey and unlock exclusive digital souvenirs 
            to commemorate your exploration of Odisha's rich cultural legacy.
          </p>
        </div>

        {/* Coins Display */}
        <div className="flex justify-center mb-12">
          <Card className="bg-gradient-gold p-6 text-gold-foreground shadow-glow inline-flex items-center gap-4">
            <Coins className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{totalCoins}</div>
              <div className="text-sm opacity-90">Culture Coins</div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Achievements */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gold mb-6 text-center">
              Your Achievements
            </h3>
            
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.id}
                className="bg-gradient-card border-border/20 shadow-card p-6 hover-lift transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      achievement.completed 
                        ? 'bg-gradient-gold' 
                        : 'bg-muted'
                    }`}>
                      <Trophy className={`w-5 h-5 ${
                        achievement.completed 
                          ? 'text-gold-foreground' 
                          : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <Badge 
                    className={`${
                      achievement.completed 
                        ? 'bg-emerald text-emerald-foreground' 
                        : 'bg-saffron text-saffron-foreground'
                    }`}
                  >
                    {achievement.completed ? 'Completed' : `${Math.floor(achievement.progress)}%`}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Progress 
                    value={achievement.progress} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progress: {Math.floor(achievement.progress * achievement.total / 100)}/{achievement.total}
                    </span>
                    <span className="text-gold font-medium">
                      +{achievement.coins} coins
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Digital Souvenirs */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-gold mb-6 text-center">
              Digital Souvenirs
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {souvenirs.map((souvenir, index) => {
                const isOwned = ownedSouvenirs.has(souvenir.id);
                const canAfford = totalCoins >= souvenir.cost;
                
                return (
                  <Card 
                    key={souvenir.id}
                    className="bg-gradient-card border-border/20 shadow-card overflow-hidden hover-lift transition-all duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-saffron/20 flex items-center justify-center relative overflow-hidden">
                      {/* Placeholder for souvenir preview */}
                      <div className="text-6xl opacity-30">
                        {souvenir.type === 'certificate' && <Star />}
                        {souvenir.type === '3d-model' && <Trophy />}
                        {souvenir.type === 'wallpaper' && <Gift />}
                        {souvenir.type === 'pass' && <Badge />}
                      </div>
                      
                      {isOwned && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-emerald text-emerald-foreground">
                            Owned
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">
                          {souvenir.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {souvenir.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-gold text-sm font-medium">
                          <Coins className="w-3 h-3" />
                          {souvenir.cost}
                        </div>
                        
                        {isOwned ? (
                          <Button 
                            size="sm"
                            className="bg-gradient-emerald text-emerald-foreground hover:shadow-glow"
                            onClick={() => handleDownload(souvenir.id)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            disabled={!canAfford}
                            className={`transition-all duration-300 ${
                              canAfford 
                                ? 'bg-gradient-gold text-gold-foreground hover:shadow-glow' 
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                            onClick={() => canAfford && handlePurchase(souvenir)}
                          >
                            Purchase
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            {/* Special Offers */}
            <Card className="bg-gradient-emerald text-emerald-foreground p-6 text-center shadow-glow">
              <Gift className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Complete Heritage Explorer Achievement</h4>
              <p className="text-sm opacity-90 mb-4">
                Visit all AR monuments to unlock the exclusive "Master Explorer" digital badge!
              </p>
              <Badge className="bg-white/20 text-emerald-foreground">
                Limited Time Offer
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};