import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Upload, User, Calendar, Mail, Phone, Sparkles } from "lucide-react";

interface UserDetails {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  photo: File | null;
}

const SouvenirGenerator = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    photo: null,
  });
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const HF_TOKEN = "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";

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

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
    if (!userDetails.fullName || !userDetails.age) {
      toast.error("Please fill in your name and age");
      return;
    }

    setLoading(true);
    setShowResult(false);

    try {
      console.log("Preparing form data for webhook...");
      
      // Use FormData instead of JSON since webhook might expect multipart/form-data
      const formData = new FormData();
      formData.append("status", "success");
      formData.append("user_name", userDetails.fullName);
      formData.append("age", userDetails.age);
      formData.append("email", userDetails.email);
      formData.append("phone", userDetails.phone);
      
      if (userDetails.photo) {
        console.log("Converting image to base64...");
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        const photoBase64 = await new Promise<string>((resolve, reject) => {
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
        
        formData.append("photo_base64", photoBase64);
      }

      console.log("Sending FormData to webhook...");
      
      const response = await fetch(
        "https://rudra-narayan16.app.n8n.cloud/webhook-test/0f43a0cf-30a1-4224-8404-7321a95e510a",
        {
          method: "POST",
          body: formData, // Send as FormData, not JSON
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
      setShowResult(true);
      toast.success("✨ Your heritage souvenir data has been sent successfully!");
    } catch (err) {
      console.error("Webhook error:", err);
      toast.error("❌ Oops! Something went wrong. Try again later.");
    } finally {
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
            🎨 Personalized AI Souvenir Generator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create a magical heritage artwork of yourself at the magnificent Konark Sun Temple. 
            Premium AI artistry meets ancient Odisha heritage.
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
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-gold" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={userDetails.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="border-border/50 focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-gold" />
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={userDetails.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Your age"
                    className="border-border/50 focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-gold" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="border-border/50 focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-gold" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="border-border/50 focus:border-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo" className="flex items-center gap-2 text-sm font-medium">
                  <Upload className="h-4 w-4 text-gold" />
                  Upload Your Photo (Optional)
                </Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="border-border/50 file:bg-gold file:text-gold-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-gold-light cursor-pointer"
                />
                {userDetails.photo && (
                  <p className="text-sm text-emerald font-medium">
                    ✓ {userDetails.photo.name} uploaded
                  </p>
                )}
              </div>

              <Button
                onClick={generateSouvenir}
                disabled={loading || !userDetails.fullName || !userDetails.age}
                className="w-full h-14 text-lg font-semibold bg-gradient-gold text-gold-foreground hover:shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gold-foreground border-t-transparent rounded-full animate-spin" />
                    ✨ Crafting your heritage souvenir... please wait!
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    Generate My Souvenir
                    <Sparkles className="h-5 w-5" />
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