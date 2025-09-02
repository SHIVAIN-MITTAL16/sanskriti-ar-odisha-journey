import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Maximize, Volume2, VolumeX, Award, Globe } from "lucide-react";

const languages = ["English", "Hindi", "Odia"];
const quizQuestions = [
  {
    question: "When was the Konark Sun Temple built?",
    options: ["13th century", "12th century", "14th century", "15th century"],
    correct: 0,
    fact: "The Konark Sun Temple was built in the 13th century CE by King Narasimhadeva I."
  },
  {
    question: "What is the main deity of Jagannath Temple?",
    options: ["Lord Shiva", "Lord Vishnu", "Lord Jagannath", "Lord Ganesha"],
    correct: 2,
    fact: "Lord Jagannath is considered a form of Lord Krishna and is the main deity."
  }
];

export const ARExperience = () => {
  const [timeSlider, setTimeSlider] = useState([50]);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [isMuted, setIsMuted] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [cultureCoins, setCultureCoins] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setCultureCoins(prev => prev + 10);
    }
    
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      setShowQuiz(false);
      setCurrentQuiz((prev) => (prev + 1) % quizQuestions.length);
    }, 3000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInScale">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gold mb-6">
            AR Heritage Experience
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Step into the past with our immersive AR technology. Witness ancient monuments come alive
            and explore their rich history through interactive experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* AR Viewer */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border/20 shadow-card overflow-hidden hover-lift">
              <div className="relative aspect-video bg-black/50 rounded-t-lg overflow-hidden">
                <img 
                  src="/images/konark-temple.jpg" 
                  alt="AR Monument View"
                  className="w-full h-full object-cover"
                  style={{
                    filter: `sepia(${timeSlider[0] > 50 ? (timeSlider[0] - 50) * 2 : 0}%) 
                             brightness(${100 - timeSlider[0] * 0.3}%)`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* AR Overlay Elements */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="outline" className="bg-primary/90 text-primary-foreground border-gold/20">
                    AR Active
                  </Badge>
                  <Badge variant="outline" className="bg-card/90 text-card-foreground border-gold/20">
                    {timeSlider[0] > 50 ? 'Ancient Era' : 'Modern Day'}
                  </Badge>
                </div>

                {/* Interactive Elements */}
                <div className="absolute bottom-4 right-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-black/50 border-gold/20 text-gold hover:bg-gold/10"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quiz Orb */}
                {!showQuiz && (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                             w-16 h-16 bg-gradient-gold rounded-full shadow-glow 
                             animate-pulse-glow hover:scale-110 transition-transform duration-300
                             flex items-center justify-center"
                  >
                    <Award className="w-8 h-8 text-gold-foreground" />
                  </button>
                )}
              </div>

              <div className="p-6 space-y-4">
                {/* Time Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time Period</span>
                    <span className="text-sm text-gold font-medium">
                      {timeSlider[0] > 50 ? `${13 + Math.floor((timeSlider[0] - 50) / 10)}th Century` : '2024 CE'}
                    </span>
                  </div>
                  <Slider
                    value={timeSlider}
                    onValueChange={setTimeSlider}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Present Day</span>
                    <span>Ancient Era</span>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsMuted(!isMuted)}
                      className="border-gold/20 text-gold hover:bg-gold/10"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <select 
                      value={currentLanguage}
                      onChange={(e) => setCurrentLanguage(e.target.value)}
                      className="bg-card border border-border rounded px-3 py-1 text-sm text-foreground"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gold" />
                    <span className="text-sm text-gold font-medium">{cultureCoins} Culture Coins</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Quiz */}
          <div className="space-y-6">
            {showQuiz && (
              <Card className="bg-gradient-card border-border/20 shadow-card p-6 animate-fadeInScale">
                <h3 className="text-xl font-serif font-semibold text-gold mb-4">
                  Heritage Quiz
                </h3>
                <p className="text-foreground mb-6">
                  {quizQuestions[currentQuiz].question}
                </p>
                
                <div className="space-y-3">
                  {quizQuestions[currentQuiz].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full justify-start text-left p-4 h-auto border-border/20 hover:border-gold/40 transition-colors ${
                        selectedAnswer === index 
                          ? index === quizQuestions[currentQuiz].correct
                            ? 'bg-emerald/20 border-emerald text-emerald-foreground'
                            : 'bg-destructive/20 border-destructive text-destructive-foreground'
                          : ''
                      }`}
                      onClick={() => !showResult && handleQuizAnswer(index)}
                      disabled={showResult}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {showResult && (
                  <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-foreground">
                      <strong>Did you know?</strong> {quizQuestions[currentQuiz].fact}
                    </p>
                    {selectedAnswer === quizQuestions[currentQuiz].correct && (
                      <p className="text-emerald text-sm mt-2">
                        ✨ +10 Culture Coins earned!
                      </p>
                    )}
                  </div>
                )}
              </Card>
            )}

            {/* AR Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-card border-border/20 p-4 hover-lift">
                <h4 className="font-semibold text-gold mb-2">3D Monument Reconstruction</h4>
                <p className="text-sm text-muted-foreground">
                  Experience monuments as they appeared centuries ago with detailed 3D models.
                </p>
              </Card>
              
              <Card className="bg-gradient-card border-border/20 p-4 hover-lift">
                <h4 className="font-semibold text-gold mb-2">Multi-language Narration</h4>
                <p className="text-sm text-muted-foreground">
                  Listen to rich historical narratives in English, Hindi, and Odia.
                </p>
              </Card>
              
              <Card className="bg-gradient-card border-border/20 p-4 hover-lift">
                <h4 className="font-semibold text-gold mb-2">Interactive Timeline</h4>
                <p className="text-sm text-muted-foreground">
                  Slide through time to see architectural evolution and historical changes.
                </p>
              </Card>
              
              <Card className="bg-gradient-card border-border/20 p-4 hover-lift">
                <h4 className="font-semibold text-gold mb-2">Gamified Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Earn Culture Coins by answering heritage questions and unlocking achievements.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};