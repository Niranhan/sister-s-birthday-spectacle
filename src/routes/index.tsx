import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BirthdaySong } from "@/components/BirthdaySong";
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
      { name: "description", content: "A 3D birthday tribute to my beloved sister." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

const photos = [photo7, photo5, photo4, photo8, photo6, photo3, photo2, photo1];

const wishes = [
  { from: "Your Brother", text: "You light up every room you walk into. May this year bring you everything your heart whispers for." },
  { from: "Forever", text: "From little hands holding mine to today — you remain my favorite person in the world." },
  { from: "A Promise", text: "No matter how far life takes us, I will always be one call away. Happy Birthday, sis." },
];

/* ---------- 3D Confetti / Particles ---------- */
function Particles3D() {
  const pieces = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0" style={{ perspective: "800px" }}>
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const dur = 10 + Math.random() * 14;
        const size = 6 + Math.random() * 14;
        const z = -200 + Math.random() * 400;
        const colors = ["#e94f6a", "#f4c25b", "#b75ec4", "#7cc6f0", "#f49ec4"];
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute animate-float-3d"
            style={{
              left: `${left}%`,
              bottom: `-${size}px`,
              width: size,
              height: size,
              background: color,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              transform: `translateZ(${z}px)`,
              boxShadow: `0 0 12px ${color}80`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- 3D Rotating Carousel ---------- */
function Carousel3D() {
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const auto = useRef(true);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (auto.current) setAngle((a) => a + dt * 0.012);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (x: number) => {
    dragging.current = true;
    auto.current = false;
    lastX.current = x;
  };
  const onMove = (x: number) => {
    if (!dragging.current) return;
    const dx = x - lastX.current;
    lastX.current = x;
    setAngle((a) => a + dx * 0.4);
  };
  const onUp = () => {
    dragging.current = false;
    setTimeout(() => (auto.current = true), 2500);
  };

  const [dim, setDim] = useState({ radius: 220, w: 160, h: 220 });
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 480) setDim({ radius: 180, w: 150, h: 210 });
      else if (w < 768) setDim({ radius: 240, w: 180, h: 250 });
      else setDim({ radius: 320, w: 220, h: 300 });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const step = 360 / photos.length;

  return (
    <div
      className="relative w-full h-[440px] sm:h-[540px] md:h-[640px] select-none cursor-grab active:cursor-grabbing touch-pan-y"
      style={{ perspective: "1400px" }}
      onMouseDown={(e) => onDown(e.clientX)}
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={(e) => onDown(e.touches[0].clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={onUp}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${angle}deg) rotateX(-6deg)`,
            width: dim.w,
            height: dim.h,
          }}
        >
          {photos.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                transform: `rotateY(${i * step}deg) translateZ(${dim.radius}px)`,
                backfaceVisibility: "hidden",
                boxShadow: "0 30px 60px -20px rgba(180, 40, 90, 0.55), 0 0 0 1px rgba(255,255,255,0.2)",
              }}
            >
              <img
                src={src}
                alt={`memory ${i + 1}`}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        ← drag to spin →
      </p>
    </div>
  );
}

/* ---------- 3D Tilt Photo Card ---------- */
function TiltCard({ src, caption, index }: { src: string; caption: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ ry: (x - 0.5) * 22, rx: -(y - 0.5) * 22, mx: x * 100, my: y * 100 });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, mx: 50, my: 50 });

  return (
    <div
      className="relative animate-fade-up"
      style={{ perspective: "1200px", animationDelay: `${index * 0.08}s` }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative rounded-3xl overflow-hidden transition-transform duration-200 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          boxShadow: "0 30px 60px -20px rgba(120, 30, 80, 0.45)",
        }}
      >
        <img src={src} alt={caption} className="w-full h-[340px] sm:h-[400px] object-cover" />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-70"
          style={{
            background: `radial-gradient(circle at ${t.mx}% ${t.my}%, rgba(255,255,255,0.55), transparent 45%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 p-5 text-white"
          style={{
            background: "linear-gradient(0deg, rgba(0,0,0,0.7), transparent)",
            transform: "translateZ(40px)",
          }}
        >
          <p className="font-script text-3xl">{caption}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cake (CSS 3D) ---------- */
function Cake3D() {
  const [spin, setSpin] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const t = (n: number) => {
      const dt = n - last;
      last = n;
      setSpin((s) => s + dt * 0.02);
      raf = requestAnimationFrame(t);
    };
    raf = requestAnimationFrame(t);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="relative h-[360px]" style={{ perspective: "1000px" }}>
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translate(-50%, -50%) rotateX(60deg) rotateZ(${spin}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* tiers */}
        {[
          { r: 130, h: 60, y: 0, c1: "#ffd9e4", c2: "#e94f6a" },
          { r: 100, h: 50, y: -55, c1: "#fff2d6", c2: "#f4c25b" },
          { r: 70, h: 40, y: -100, c1: "#f7e1ff", c2: "#b75ec4" },
        ].map((tier, i) => (
          <div key={i} style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute rounded-full"
              style={{
                width: tier.r * 2,
                height: tier.r * 2,
                left: -tier.r,
                top: -tier.r,
                transform: `translateZ(${tier.y}px)`,
                background: `radial-gradient(circle, ${tier.c1}, ${tier.c2})`,
                boxShadow: `inset 0 -${tier.h}px 0 ${tier.c2}, 0 20px 40px rgba(0,0,0,0.2)`,
              }}
            />
          </div>
        ))}
        {/* candle */}
        <div
          className="absolute"
          style={{
            width: 14, height: 80, left: -7, top: -40,
            transform: "translateZ(-150px) rotateX(-90deg)",
            background: "linear-gradient(#fff, #f4c25b)",
            borderRadius: 4,
          }}
        />
        <div
          className="absolute animate-flame"
          style={{
            width: 18, height: 28, left: -9, top: -56,
            transform: "translateZ(-180px) rotateX(-90deg)",
            background: "radial-gradient(circle, #fff7c2, #f49b1c 60%, transparent 70%)",
            borderRadius: "50% 50% 20% 20%",
            filter: "blur(1px)",
          }}
        />
      </div>
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const captions = ["Radiant", "Sisterhood", "Wanderer", "Celebration", "Grace", "Mountains call", "Blessings", "Quiet moments"];

  if (!opened) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <Particles3D />
        <div
          className="relative z-10 text-center max-w-xl"
          style={{ perspective: "1000px" }}
        >
          <p className="font-script text-3xl md:text-4xl text-[var(--plum)] mb-4 animate-fade-up">to my dearest sister</p>
          <h1
            className="font-display text-6xl md:text-8xl font-bold leading-tight animate-shimmer animate-fade-up"
            style={{ animationDelay: "0.2s", transform: "rotateX(8deg)" }}
          >
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
    <div className="relative overflow-hidden">
      <div className="aurora" />
      <Particles3D />
      <BirthdaySong />

      {/* Hero with parallax photo stack */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ perspective: "1500px" }}
        >
          <div style={{ transformStyle: "preserve-3d", transform: `rotateY(${scrollY * 0.05}deg)` }}>
            {[photo7, photo6, photo3].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="absolute rounded-2xl object-cover w-[120px] h-[160px] sm:w-[180px] sm:h-[240px]"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: "-60px",
                  marginTop: "-80px",
                  transform: `rotateY(${i * 120}deg) translateZ(220px)`,
                  opacity: 0.3,
                  filter: "blur(1px)",
                  boxShadow: "0 20px 50px rgba(180,40,90,0.4)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <p className="font-script text-3xl md:text-5xl text-[var(--plum)] animate-fade-up">Happy Birthday</p>
          <h1
            className="font-display text-6xl sm:text-7xl md:text-[10rem] font-bold leading-[0.95] mt-2 animate-shimmer animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Dear Sister
          </h1>
          <p
            className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-foreground/75 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Today the world celebrates the kindest, brightest soul I know. ✨
          </p>
          <a
            href="#carousel"
            className="mt-16 inline-block text-sm uppercase tracking-[0.3em] text-[var(--plum)] hover:text-[var(--rose)] animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            ↓ enter the world
          </a>
        </div>
      </section>

      {/* 3D Carousel */}
      <section id="carousel" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-script text-2xl text-[var(--rose)]">spin through memories</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-2">Moments in 3D</h2><div className="divider-bloom" />
        </div>
        <Carousel3D />
      </section>

      {/* Tilt cards */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-[var(--rose)]">a glimpse of you</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-2">Memories in Bloom</h2><div className="divider-bloom" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((src, i) => (
            <TiltCard key={i} src={src} caption={captions[i]} index={i} />
          ))}
        </div>
      </section>

      {/* Wishes */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-script text-2xl text-[var(--rose)]">straight from the heart</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-2">My Birthday Wishes</h2><div className="divider-bloom" />
          </div>
          <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {wishes.map((w, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/70 backdrop-blur p-8 animate-fade-up hover:[transform:rotateY(-6deg)_rotateX(4deg)_translateZ(20px)] transition-transform duration-500"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  boxShadow: "var(--shadow-card)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="text-4xl mb-4" style={{ transform: "translateZ(30px)" }}>💌</div>
                <p className="font-display italic text-lg leading-relaxed text-foreground/80">"{w.text}"</p>
                <p className="mt-6 font-script text-2xl text-[var(--plum)]">— {w.from}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Cake finale */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 text-center">
        <Cake3D />
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold animate-shimmer mt-8">Make a Wish</h2>
        <p className="mt-6 font-script text-3xl text-[var(--plum)]">…and may every single one come true.</p>
        <p className="mt-12 text-sm uppercase tracking-[0.3em] text-foreground/50">
          with all my love, always
        </p>
      </section>
    </div>
  );
}
