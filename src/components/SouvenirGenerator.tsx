import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface FormData {
  name: string;
  age: string;
  email: string;
  phone: string;
  photo: File | null;
}

const SouvenirGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    email: '',
    phone: '',
    photo: null
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const generateSouvenir = async () => {
    if (!formData.name || !formData.age) {
      toast.error('Please fill in name and age fields');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const prompt = `A beautiful artistic portrait of ${formData.name} (age ${formData.age}), standing in front of the majestic Konark Sun Temple, heritage style, golden sunset, cinematic digital painting, highly detailed, 4k resolution`;

      const formDataToSend = new FormData();
      formDataToSend.append('inputs', prompt);

      if (formData.photo) {
        formDataToSend.append('init_image', formData.photo);
        formDataToSend.append('strength', '0.7');
      }

      const response = await fetch('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
        },
        body: formData.photo ? formDataToSend : JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
      toast.success('Your heritage souvenir has been generated!');
    } catch (err) {
      console.error('Generation error:', err);
      setError('❌ Oops! Something went wrong. Try again later.');
      toast.error('Failed to generate souvenir');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `konark-heritage-souvenir-${formData.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Souvenir downloaded successfully!');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-saffron/20 via-gold/10 to-saffron-light/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            🎨 Create Your Personalized Heritage Souvenir
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your details below and generate a stunning AI artwork of your visit to Konark Temple!
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-card hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-center text-card-foreground">
              Heritage Memory Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-card-foreground font-medium">
                  Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-card-foreground font-medium">
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-card-foreground font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="text-card-foreground font-medium">
                Upload Your Photo (Optional)
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-input border-border text-foreground file:bg-saffron file:text-saffron-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-saffron-light"
              />
              <p className="text-sm text-muted-foreground">
                Max size: 5MB. Supports JPG, PNG, WebP formats.
              </p>
            </div>

            <Button
              onClick={generateSouvenir}
              disabled={isGenerating || !formData.name || !formData.age}
              className="w-full bg-gradient-gold hover:bg-gradient-to-r hover:from-saffron hover:to-gold text-gold-foreground font-semibold py-3 rounded-lg shadow-glow hover:shadow-float transition-all duration-300 glow-on-hover"
            >
              {isGenerating ? (
                <>
                  🎨 Generating your souvenir… Please wait ⏳
                </>
              ) : (
                <>
                  ✨ Generate My Souvenir
                </>
              )}
            </Button>

            {error && (
              <div className="text-center p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}

            {generatedImage && (
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <img
                    src={generatedImage}
                    alt="Generated Heritage Souvenir"
                    className="max-w-full h-auto rounded-lg shadow-card border border-border/50"
                    style={{ maxHeight: '500px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
                <Button
                  onClick={downloadImage}
                  className="bg-emerald hover:bg-emerald-light text-emerald-foreground font-semibold px-6 py-2 rounded-lg shadow-glow transition-all duration-300"
                >
                  ⬇️ Download Souvenir
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SouvenirGenerator;