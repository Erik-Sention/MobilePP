"use client";

import { useState } from "react";

export default function DesignDemoPage() {
  const [progress, setProgress] = useState(65);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen p-6 space-y-8 ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="glass-card-strong max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">
              Glassmorphism Design System
            </h1>
            <p className="text-muted-foreground">
              Test av glaseffekter och premiumteman
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="btn-pill-secondary"
          >
            {darkMode ? "🌙 Mörkt" : "☀️ Ljust"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Glass Cards Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Glass Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card hover-lift">
              <h3 className="font-bold text-lg mb-2">Standard Glass</h3>
              <p className="text-sm text-muted-foreground">
                Enkel glaseffekt med blur och transparens
              </p>
            </div>

            <div className="glass-card-compact hover-lift">
              <h3 className="font-bold text-lg mb-2">Compact Glass</h3>
              <p className="text-sm text-muted-foreground">
                Mindre padding för kompakta layouter
              </p>
            </div>

            <div className="glass-card-strong hover-lift">
              <h3 className="font-bold text-lg mb-2">Strong Glass</h3>
              <p className="text-sm text-muted-foreground">
                Starkare blur och högre opacitet
              </p>
            </div>
          </div>

          <div className="card-glass hover-lift">
            <h3 className="font-bold text-lg mb-2">Premium Glass Card</h3>
            <p className="text-muted-foreground">
              Avancerad glaseffekt med inset highlights och saturation boost
            </p>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Pill Buttons</h2>

          <div className="flex flex-wrap gap-4">
            <button className="btn-pill-primary">
              ✨ Primary Button
            </button>

            <button className="btn-pill-secondary">
              🎨 Secondary Button
            </button>

            <button className="btn-premium">
              🚀 Premium Button
            </button>
          </div>
        </section>

        {/* Macro Cards Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Macro Cards</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="macro-card macro-card-protein">
              <div className="text-2xl font-bold">85g</div>
              <div className="text-xs mt-1">Protein</div>
            </div>

            <div className="macro-card macro-card-carbs">
              <div className="text-2xl font-bold">120g</div>
              <div className="text-xs mt-1">Kolhydrater</div>
            </div>

            <div className="macro-card macro-card-fat">
              <div className="text-2xl font-bold">45g</div>
              <div className="text-xs mt-1">Fett</div>
            </div>

            <div className="macro-card macro-card-calories">
              <div className="text-2xl font-bold">1850</div>
              <div className="text-xs mt-1">Kalorier</div>
            </div>
          </div>
        </section>

        {/* Macro Blocks Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Macro Blocks</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="macro-block tap-effect">
              <div className="text-4xl mb-2">🍳</div>
              <h3 className="font-bold">Frukost</h3>
              <p className="text-sm text-muted-foreground mt-1">420 kcal</p>
            </div>

            <div className="macro-block tap-effect">
              <div className="text-4xl mb-2">🥗</div>
              <h3 className="font-bold">Lunch</h3>
              <p className="text-sm text-muted-foreground mt-1">650 kcal</p>
            </div>

            <div className="macro-block tap-effect">
              <div className="text-4xl mb-2">🍕</div>
              <h3 className="font-bold">Middag</h3>
              <p className="text-sm text-muted-foreground mt-1">780 kcal</p>
            </div>
          </div>
        </section>

        {/* Progress Bars Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Progress Bars</h2>

          <div className="glass-card-compact space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Dagligt mål</span>
                <span className="text-sm font-bold">{progress}%</span>
              </div>
              <div className="progress-container">
                <div
                  className="progress-fill-glass"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Premium Progress</span>
                <span className="text-sm font-bold">80%</span>
              </div>
              <div className="progress-premium">
                <div className="progress-bar-premium h-full rounded-full" style={{ width: "80%" }} />
              </div>
            </div>

            <button
              onClick={() => setProgress(Math.min(100, progress + 10))}
              className="btn-pill-secondary w-full"
            >
              Öka Progress (+10%)
            </button>
          </div>
        </section>

        {/* Input Fields Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Input Fields</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Small input field..."
              className="input-field-small"
            />

            <textarea
              placeholder="Large input field för längre text..."
              className="input-field-large"
            />
          </div>
        </section>

        {/* Effects Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Special Effects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card-compact hover-glow">
              <h3 className="font-bold mb-2">Hover Glow</h3>
              <p className="text-sm text-muted-foreground">
                Håll musen över för glow-effekt
              </p>
            </div>

            <div className="glass-card-compact shimmer">
              <h3 className="font-bold mb-2">Shimmer Effect</h3>
              <p className="text-sm text-muted-foreground">
                Animerad ljusreflektion
              </p>
            </div>

            <div className="glass-card-compact floating">
              <h3 className="font-bold mb-2">Floating</h3>
              <p className="text-sm text-muted-foreground">
                Svävande animation
              </p>
            </div>

            <div className="glass-card-compact ai-thinking">
              <h3 className="font-bold mb-2">AI Thinking</h3>
              <p className="text-sm text-muted-foreground">
                Pulsande effekt för AI-aktivitet
              </p>
            </div>
          </div>
        </section>

        {/* Metric Cards Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Metric Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="metric-card">
              <div className="relative z-10">
                <div className="text-sm text-muted-foreground mb-1">Vikt</div>
                <div className="text-3xl font-bold">72.5 kg</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="relative z-10">
                <div className="text-sm text-muted-foreground mb-1">BMI</div>
                <div className="text-3xl font-bold">23.4</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="relative z-10">
                <div className="text-sm text-muted-foreground mb-1">Steg</div>
                <div className="text-3xl font-bold">8,432</div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Typography</h2>

          <div className="glass-card-compact space-y-3">
            <h1 className="text-4xl text-gradient">
              Text Gradient Heading
            </h1>
            <p className="text-premium text-2xl">
              Premium Typography
            </p>
            <p className="text-luxury text-xl">
              Luxury Text with Shadow
            </p>
            <p className="text-glow text-lg">
              Glowing Text Effect
            </p>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Badges</h2>

          <div className="flex flex-wrap gap-3">
            <span className="badge-premium">NEW</span>
            <span className="badge-premium">PREMIUM</span>
            <span className="badge-premium">BETA</span>
            <span className="badge-premium">PRO</span>
          </div>
        </section>

        {/* Background Effects Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-premium">Background Effects</h2>

          <div className="glass-card-compact space-y-4">
            <div className="h-32 bg-gradient-premium rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Premium Gradient</span>
            </div>

            <div className="h-32 bg-gradient-success rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Success Gradient</span>
            </div>

            <div className="h-32 bg-mesh-gradient rounded-lg flex items-center justify-center border border-border">
              <span className="font-bold">Mesh Gradient</span>
            </div>

            <div className="h-32 bg-gradient-ambient rounded-lg flex items-center justify-center border border-border">
              <span className="font-bold">Ambient Gradient</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
