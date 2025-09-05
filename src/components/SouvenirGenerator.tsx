import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, User, Calendar, Mail, Phone, Sparkles, Palette, Building, Eye } from "lucide-react";

interface UserDetails {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  photo: File | null;
  style: string;
  monument: string;
  includeLogo: boolean;
}

const SouvenirGenerator = () => {
  console.log("SouvenirGenerator component is rendering...");
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    photo: null,
    style: "",
    monument: "",
    includeLogo: false,
  });
  
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const styleOptions = [
    "Cinematic",
    "Watercolor",
    "Anime", 
    "Oil Painting",
    "Vintage Poster",
    "Futuristic"
  ];

  const monumentOptions = [
    {
      value: "konark-sun-temple",
      label: "Konark Sun Temple (Odisha)",
      description: "UNESCO World Heritage Site, chariot-shaped Black Pagoda with intricate stone carvings"
    },
    {
      value: "jagannath-temple",
      label: "Jagannath Temple (Puri)", 
      description: "One of the Char Dham pilgrimage sites, famous for Rath Yatra and spiritual aura"
    },
    {
      value: "lingaraj-temple",
      label: "Lingaraj Temple (Bhubaneswar)",
      description: "A masterpiece of Kalinga architecture dedicated to Lord Shiva, with a towering spire"
    }
  ];

  const handleInputChange = (field: keyof UserDetails, value: string | boolean) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

  // Auto-generate expert AI prompt
  useEffect(() => {
    if (userDetails.fullName && userDetails.style && userDetails.monument) {
      const monumentData = monumentOptions.find(m => m.value === userDetails.monument);
      const prompt = `Create a stunning ${userDetails.style.toLowerCase()} style digital artwork featuring ${userDetails.fullName}, age ${userDetails.age}, standing majestically in front of the iconic ${monumentData?.label || userDetails.monument}. ${monumentData?.description || ""}. The composition should be cinematic with perfect lighting, capturing the grandeur of this UNESCO World Heritage site. High resolution, professional photography style, vibrant colors, cultural authenticity, masterpiece quality. ${userDetails.includeLogo ? "Include a subtle heritage tourism logo in the corner." : ""}`;
      setGeneratedPrompt(prompt);
    } else {
      setGeneratedPrompt("");
    }
  }, [userDetails]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUserDetails(prev => ({ ...prev, photo: file }));
    toast.success("Photo uploaded successfully!");
  };

  const generateSouvenir = async () => {
    console.log("=== Generate Souvenir Started ===");
    console.log("User details:", userDetails);
    
    if (!userDetails.fullName || !userDetails.age) {
      console.log("Missing required fields - name or age");
      toast.error("Please fill in your name and age");
      return;
    }

    console.log("Starting generation process...");
    setLoading(true);
    setShowResult(false);

    try {
      console.log("Preparing JSON data for webhook...");
      
      let photoBase64 = "";
      if (userDetails.photo) {
        console.log("Converting image to base64...");
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        photoBase64 = await new Promise<string>((resolve, reject) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const base64 = canvas.toDataURL('image/png');
            console.log("Image converted to base64, size:", base64.length);
            resolve(base64);
          };
          img.onerror = reject;
          img.src = URL.createObjectURL(userDetails.photo);
        });
      }

      const payload = {
        name: userDetails.fullName,
        age: parseInt(userDetails.age),
        email: userDetails.email,
        phone: userDetails.phone,
        photo_base64: photoBase64,
        style: userDetails.style,
        monument: userDetails.monument,
        include_logo: userDetails.includeLogo
      };

      console.log("Sending JSON to webhook...");
      
      const response = await fetch(
        "https://rudra-narayan16.app.n8n.cloud/webhook-test/ec5985e8-546d-41ea-8a70-70e913e9cb78",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Webhook response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Webhook error response:", errorText);
        throw new Error(`Webhook Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Webhook response data:", responseData);

      // Handle the case where webhook just confirms workflow started
      if (responseData.image_url) {
        setGeneratedImage(responseData.image_url);
      } else if (responseData.message === "Workflow was started") {
        // Use a placeholder for now since webhook is asynchronous
        setGeneratedImage("https://via.placeholder.com/512x512/f59e0b/ffffff?text=Heritage+Souvenir+Generated");
        console.log("Workflow started - using placeholder image");
      } else {
        throw new Error("Unexpected response from webhook");
      }
      console.log("Generation completed successfully!");
      setShowResult(true);
      toast.success("✨ Your heritage souvenir data has been sent successfully!");
    } catch (err) {
      console.error("=== WEBHOOK ERROR ===");
      console.error("Error details:", err);
      console.error("Error message:", err instanceof Error ? err.message : 'Unknown error');
      console.error("========================");
      toast.error("❌ Oops! Something went wrong. Try again later.");
    } finally {
      console.log("=== Generate Souvenir Finished ===");
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `${userDetails.fullName.replace(/\s+/g, '_')}_Heritage_Souvenir.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloading your souvenir!");
  };

  const resetForm = () => {
    setUserDetails({
      fullName: "",
      age: "",
      email: "",
      phone: "",
      photo: null,
      style: "",
      monument: "",
      includeLogo: false,
    });
    setGeneratedImage(null);
    setShowResult(false);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/30 via-gold/20 to-saffron/40 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/60" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 hero-text">
            ✨ Personalised AI Souvenir Generator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Turn your photo into a one-of-a-kind digital souvenir. Choose your style, background, and let our AI craft a cinematic portrait just for you.
          </p>
        </div>

        {!showResult ? (
          /* Form Section */
          <Card className="max-w-2xl mx-auto bg-card/90 backdrop-blur-sm border-border/50 shadow-float hover-lift">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-gold animate-pulse-glow" />
                <h2 className="text-3xl font-serif font-bold text-foreground">Heritage Studio</h2>
                <Sparkles className="h-8 w-8 text-gold animate-pulse-glow" />
              </div>
              <p className="text-muted-foreground">Enter your details below to begin crafting your personalized souvenir</p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-gold" />
                    Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={userDetails.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border-border/50 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="age" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Calendar className="h-4 w-4 text-gold" />
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={userDetails.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Your age"
                    className="h-12 rounded-xl border-border/50 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Mail className="h-4 w-4 text-gold" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-12 rounded-xl border-border/50 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Phone className="h-4 w-4 text-gold" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-12 rounded-xl border-border/50 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-3">
                <Label htmlFor="photo" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Upload className="h-4 w-4 text-gold" />
                  Upload Photo
                </Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="h-12 rounded-xl border-border/50 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-card/50 backdrop-blur-sm file:bg-gold file:text-gold-foreground file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium hover:file:bg-gold-light cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                />
                {userDetails.photo && (
                  <p className="text-sm text-emerald font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald rounded-full"></span>
                    {userDetails.photo.name} uploaded successfully
                  </p>
                )}
              </div>

              {/* Style Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Palette className="h-4 w-4 text-gold" />
                    Select Style *
                  </Label>
                  <Select value={userDetails.style} onValueChange={(value) => handleInputChange("style", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-border/50 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                      <SelectValue placeholder="Choose your artistic style" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/50 bg-popover/95 backdrop-blur-md">
                      {styleOptions.map((style) => (
                        <SelectItem key={style} value={style.toLowerCase()} className="rounded-lg hover:bg-accent/80 focus:bg-accent/80">
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building className="h-4 w-4 text-gold" />
                    Choose Monument / Background *
                  </Label>
                  <Select value={userDetails.monument} onValueChange={(value) => handleInputChange("monument", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-border/50 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                      <SelectValue placeholder="Select heritage monument" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/50 bg-popover/95 backdrop-blur-md">
                      {monumentOptions.map((monument) => (
                        <SelectItem key={monument.value} value={monument.value} className="rounded-lg hover:bg-accent/80 focus:bg-accent/80">
                          <div className="space-y-1">
                            <div className="font-medium">{monument.label}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">{monument.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Brand Logo Option */}
              <div className="flex items-center space-x-3 p-4 bg-gradient-card rounded-xl border border-border/30">
                <Checkbox 
                  id="includeLogo" 
                  checked={userDetails.includeLogo}
                  onCheckedChange={(checked) => handleInputChange("includeLogo", checked as boolean)}
                  className="data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <Label htmlFor="includeLogo" className="text-sm font-medium text-foreground cursor-pointer">
                  Include Brand Logo (place logo subtly on souvenir)
                </Label>
              </div>

              {/* AI Prompt Preview */}
              {generatedPrompt && (
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Eye className="h-4 w-4 text-gold" />
                    AI Prompt Preview
                  </Label>
                  <div className="p-4 bg-muted/30 rounded-xl border border-border/30 text-sm text-muted-foreground">
                    {generatedPrompt}
                  </div>
                </div>
              )}

              <Button
                onClick={generateSouvenir}
                disabled={loading || !userDetails.fullName || !userDetails.age || !userDetails.style || !userDetails.monument}
                className="w-full h-16 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  if (!loading && userDetails.fullName && userDetails.age && userDetails.style && userDetails.monument) {
                    e.currentTarget.style.backgroundColor = '#1e40af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && userDetails.fullName && userDetails.age && userDetails.style && userDetails.monument) {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Your Souvenir...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6" />
                    Generate Souvenir
                    <Sparkles className="h-6 w-6" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Result Section */
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeInScale">
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-float">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                    🎉 Your Heritage Souvenir is Ready!
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    A timeless masterpiece featuring {userDetails.fullName} at the Konark Sun Temple
                  </p>
                </div>

                {generatedImage && (
                  <div className="space-y-6">
                    <div className="relative group">
                      <img
                        src={generatedImage}
                        alt="Generated Heritage Souvenir"
                        className="w-full max-w-2xl mx-auto rounded-xl shadow-float border-4 border-gold/30 group-hover:border-gold/60 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/20 rounded-xl" />
                    </div>

                    <div className="bg-gradient-card rounded-xl p-6 border border-border/30">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-gold font-semibold">Visitor</p>
                          <p className="text-foreground font-medium">{userDetails.fullName}</p>
                        </div>
                        <div>
                          <p className="text-gold font-semibold">Age</p>
                          <p className="text-foreground font-medium">{userDetails.age} years</p>
                        </div>
                        <div>
                          <p className="text-gold font-semibold">Heritage Site</p>
                          <p className="text-foreground font-medium">Konark Sun Temple</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={downloadImage}
                        className="flex items-center gap-3 bg-emerald text-emerald-foreground hover:bg-emerald-light shadow-lg hover:shadow-glow transition-all duration-300 h-12 px-8"
                      >
                        <Download className="h-5 w-5" />
                        Download Souvenir
                      </Button>
                      
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="h-12 px-8 border-border/50 hover:bg-card/80 transition-all duration-300"
                      >
                        Create Another
                      </Button>
                    </div>

                    <p className="text-center text-muted-foreground text-sm">
                      Thank you for visiting our heritage gallery! Share your beautiful souvenir with friends and family.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default SouvenirGenerator;