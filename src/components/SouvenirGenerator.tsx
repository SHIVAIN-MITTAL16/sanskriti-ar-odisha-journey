import React, { useState } from "react";
import { toast } from 'sonner';

const SouvenirGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Your Hugging Face API token
  const HF_TOKEN = "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";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setLoading(true);

    const prompt =
      "Transform this photo into a stunning heritage-style portrait of the visitor standing in front of the Konark Sun Temple, Odisha, with golden sunset lighting and ancient vibes.";

    const formData = new FormData();
    formData.append("inputs", file);
    formData.append(
      "parameters",
      JSON.stringify({
        prompt,
      })
    );

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-Kontext-dev",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
      toast.success('Your heritage souvenir has been generated!');
    } catch (err) {
      console.error('Generation error:', err);
      toast.error("⚠️ Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-saffron/20 via-gold/10 to-saffron-light/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            ✨ Heritage Souvenir Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your photo and get a personalized AI art souvenir in front of the Konark Sun Temple.
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-card rounded-xl p-6 text-center hover-lift">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mb-6 w-full bg-input border border-border text-foreground rounded-lg p-3 file:bg-saffron file:text-saffron-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-saffron-light"
          />

          {loading && (
            <p className="mt-4 text-primary font-medium">
              ⏳ Generating your souvenir, please wait...
            </p>
          )}

          {image && (
            <div className="mt-6">
              <img
                src={image}
                alt="Generated Souvenir"
                className="rounded-lg shadow-card mx-auto border border-border/50"
                style={{ maxHeight: '500px' }}
              />
              <p className="mt-4 text-sm text-muted-foreground">🎉 Your AI souvenir is ready!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SouvenirGenerator;