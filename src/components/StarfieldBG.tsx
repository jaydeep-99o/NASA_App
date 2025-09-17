import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; s: number; tw: number };

export default function StarfieldBG({ density = 320 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const motionOK = useRef<boolean>(true);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionOK.current = !m.matches;
    const onChange = (e: MediaQueryListEvent) => (motionOK.current = !e.matches);
    m.addEventListener?.("change", onChange);

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, dpr = Math.max(1, window.devicePixelRatio || 1);

    const stars: Star[] = [];
    const makeStar = (): Star => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,    // radius
      s: Math.random() * 0.12 + 0.02,  // speed
      tw: Math.random() * Math.PI * 2, // twinkle phase
    });

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // re-seed a proportional number of stars
      const count = Math.floor(density * (w * h) / (1440 * 900));
      stars.length = 0;
      for (let i = 0; i < count; i++) stars.push(makeStar());
    }

    let raf = 0;
    let last = performance.now();

    function frame(t: number) {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      // background: subtle deep-space gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(3,7,18,1)");     // slate-950-ish
      g.addColorStop(1, "rgba(2,6,23,1)");     // slightly darker
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // parallax from mouse
      const px = (mouse.current.x - 0.5) * 12;
      const py = (mouse.current.y - 0.5) * 8;

      // stars
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // drift downward; wrap to top
        s.y += s.s * (motionOK.current ? 1 : 0);
        if (s.y > 1) s.y = 0;

        const x = s.x * w + px;
        const y = s.y * h + py;
        const twinkle = 0.65 + 0.35 * Math.sin(s.tw + t * 0.002);
        ctx.globalAlpha = Math.max(0.25, Math.min(1, twinkle));

        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // slight colored glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, s.r * 4);
        glow.addColorStop(0, "rgba(255,255,255,0.9)");
        glow.addColorStop(1, "rgba(99,102,241,0.05)"); // indigo glow
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // subtle vignette for readability
      const v = ctx.createRadialGradient(w * 0.5, h * 0.4, Math.min(w, h) * 0.2, w * 0.5, h * 0.6, Math.max(w, h) * 0.7);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX / (ref.current?.clientWidth || 1);
      mouse.current.y = e.clientY / (ref.current?.clientHeight || 1);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      m.removeEventListener?.("change", onChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
