import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo5 from "@/assets/photo-5.jpg";
import photo6 from "@/assets/photo-6.jpg";
import photo7 from "@/assets/photo-7.jpg";
import photo8 from "@/assets/photo-8.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Dear Sister 💖" },
      { name: "description", content: "A heartfelt birthday tribute to my beloved sister." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

const photos = [
  { src: photo7, caption: "Radiant" },
  { src: photo5, caption: "Sisterhood" },
  { src: photo4, caption: "Wanderer" },
  { src: photo8, caption: "Celebration" },
  { src: photo6, caption: "Grace" },
  { src: photo3, caption: "Mountains call" },
  { src: photo2, caption: "Blessings" },
  { src: photo1, caption: "Quiet moments" },
];

const wishes = [
  { from: "Your Brother", text: "You light up every room you walk into. May this year bring you everything your heart whispers for." },
  { from: "Forever", text: "From little hands holding mine to today — you remain my favorite person in the world." },
  { from: "A Promise", text: "No matter how far life takes us, I will always be one call away. Happy Birthday, sis." },
];

function Confetti() {
  const pieces = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const dur = 8 + Math.random() * 10;
        const size = 8 + Math.random() * 12;
        const colors = ["oklch(0.72 0.18 12)", "oklch(0.82 0.14 75)", "oklch(0.65 0.18 340)", "oklch(0.7 0.15 200)"];
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute animate-float"
            style={{
              left: `${left}%`,
              bottom: `-${size}px`,
              width: size,
              height: size,
              background: color,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              opacity: 0.7,
            }}
          />
        );
      })}
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [active]);

  if (!opened) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <Confetti />
        <div className="relative z-10 text-center max-w-xl">
          <p className="font-script text-3xl md:text-4xl text-[var(--plum)] mb-4 animate-fade-up">to my dearest sister</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight animate-shimmer animate-fade-up" style={{ animationDelay: "0.2s" }}>
            A Little Surprise
          </h1>
          <p className="mt-6 text-lg text-foreground/70 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Tap the gift to unwrap your birthday surprise ✨
          </p>
          <button
            onClick={() => setOpened(true)}
            className="mt-12 group relative animate-fade-up animate-glow rounded-full bg-[var(--rose)] text-white w-32 h-32 text-6xl transition-transform hover:scale-110 active:scale-95"
            style={{ animationDelay: "0.6s" }}
            aria-label="Open gift"
          >
            🎁
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Confetti />

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-script text-3xl md:text-5xl text-[var(--plum)] animate-fade-up">Happy Birthday</p>
        <h1
          className="font-display text-7xl md:text-[10rem] font-bold leading-[0.95] mt-2 animate-shimmer animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Dear Sister
        </h1>
        <div
          className="mt-8 max-w-2xl text-lg md:text-xl text-foreground/75 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          Today the world celebrates the kindest, brightest soul I know.
          Here's a little corner of the internet, made just for you —
          full of memories, wishes, and all my love. 💖
        </div>
        <div className="mt-12 flex gap-3 text-4xl animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <span>🎂</span><span>🌸</span><span>✨</span><span>🎈</span><span>💝</span>
        </div>
        <a
          href="#gallery"
          className="mt-16 text-sm uppercase tracking-[0.3em] text-[var(--plum)] hover:text-[var(--rose)] transition-colors animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          ↓ scroll for memories
        </a>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-[var(--rose)]">a glimpse of you</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold mt-2">Memories in Bloom</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white animate-fade-up text-left"
              style={{ animationDelay: `${i * 0.08}s`, boxShadow: "var(--shadow-card)" }}
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="font-script text-2xl text-white">{p.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Wishes */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-script text-2xl text-[var(--rose)]">straight from the heart</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mt-2">My Birthday Wishes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {wishes.map((w, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/70 backdrop-blur p-8 animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s`, boxShadow: "var(--shadow-card)" }}
              >
                <div className="text-4xl mb-4">💌</div>
                <p className="font-display italic text-lg leading-relaxed text-foreground/80">"{w.text}"</p>
                <p className="mt-6 font-script text-2xl text-[var(--plum)]">— {w.from}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cake finale */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="text-8xl md:text-9xl mb-8 animate-fade-up">🎂</div>
        <h2 className="font-display text-5xl md:text-7xl font-bold animate-shimmer">Make a Wish</h2>
        <p className="mt-6 font-script text-3xl text-[var(--plum)]">…and may every single one come true.</p>
        <p className="mt-12 text-sm uppercase tracking-[0.3em] text-foreground/50">
          with all my love, always
        </p>
      </section>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-[var(--rose)] transition-colors"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={photos[active].src}
            alt={photos[active].caption}
            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
