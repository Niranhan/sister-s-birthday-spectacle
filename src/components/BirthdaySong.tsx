import { useEffect, useRef, useState } from "react";

// Happy Birthday melody — (note, beats)
const NOTES: Record<string, number> = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0,
  A4: 440.0, Bb4: 466.16, B4: 493.88, C5: 523.25, D5: 587.33,
  E5: 659.25, F5: 698.46, G5: 783.99,
};
const MELODY: Array<[string, number]> = [
  ["C4", 0.75], ["C4", 0.25], ["D4", 1], ["C4", 1], ["F4", 1], ["E4", 2],
  ["C4", 0.75], ["C4", 0.25], ["D4", 1], ["C4", 1], ["G4", 1], ["F4", 2],
  ["C4", 0.75], ["C4", 0.25], ["C5", 1], ["A4", 1], ["F4", 1], ["E4", 1], ["D4", 2],
  ["Bb4", 0.75], ["Bb4", 0.25], ["A4", 1], ["F4", 1], ["G4", 1], ["F4", 3],
];

export function BirthdaySong() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const play = async () => {
    if (playing) {
      stopRef.current?.();
      return;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    const beat = 0.42; // seconds per beat
    let t = ctx.currentTime + 0.1;
    const oscs: OscillatorNode[] = [];

    MELODY.forEach(([note, beats]) => {
      const dur = beats * beat;
      const freq = NOTES[note];
      // lead
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.5, t + 0.02);
      g.gain.linearRampToValueAtTime(0.4, t + dur * 0.7);
      g.gain.linearRampToValueAtTime(0, t + dur - 0.02);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + dur);
      oscs.push(o);
      // soft harmony octave below
      const o2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      o2.type = "sine";
      o2.frequency.value = freq / 2;
      g2.gain.setValueAtTime(0, t);
      g2.gain.linearRampToValueAtTime(0.25, t + 0.05);
      g2.gain.linearRampToValueAtTime(0, t + dur - 0.02);
      o2.connect(g2).connect(master);
      o2.start(t);
      o2.stop(t + dur);
      oscs.push(o2);

      t += dur;
    });

    setPlaying(true);
    const endTimer = setTimeout(() => {
      setPlaying(false);
      ctx.close().catch(() => {});
    }, (t - ctx.currentTime + 0.2) * 1000);

    stopRef.current = () => {
      clearTimeout(endTimer);
      oscs.forEach((o) => { try { o.stop(); } catch {} });
      ctx.close().catch(() => {});
      setPlaying(false);
    };
  };

  return (
    <button
      onClick={play}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 rounded-full bg-white/80 backdrop-blur px-5 py-3 shadow-[0_10px_30px_-10px_rgba(180,40,90,0.45)] hover:scale-105 active:scale-95 transition-transform"
      aria-label={playing ? "Stop song" : "Play birthday song"}
    >
      <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--rose)] text-white text-lg">
        {playing ? "❚❚" : "♪"}
        {playing && (
          <span className="absolute inset-0 rounded-full border-2 border-[var(--rose)] animate-ping" />
        )}
      </span>
      <span className="font-script text-xl text-[var(--plum)] pr-1">
        {playing ? "playing…" : "play song"}
      </span>
    </button>
  );
}
