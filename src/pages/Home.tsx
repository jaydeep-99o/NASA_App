import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mockSearch } from "../lib/mock";

function calcCounts(w: number) {
  if (w < 640) return { stars: 80, particles: 10 };       // phones
  if (w < 1024) return { stars: 120, particles: 16 };     // tablets
  return { stars: 170, particles: 22 };                    // laptops/desktop
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [{ stars: starCount, particles: particleCount }, setCounts] = useState(() => calcCounts(window.innerWidth));

  // update densities on resize (light debounce)
  useEffect(() => {
    setMounted(true);
    let t: number | undefined;
    const onResize = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => setCounts(calcCounts(window.innerWidth)), 120);
    };
    window.addEventListener("resize", onResize);
    return () => { if (t) window.clearTimeout(t); window.removeEventListener("resize", onResize); };
  }, []);

  // stable-ish randoms per render of counts
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }).map((_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        variant: i % 3,
      })),
    [starCount]
  );
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 4,
      })),
    [particleCount]
  );

  const trending = useMemo(() => (mockSearch?.facets?.organism ?? []).slice(0, 5), []);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((s, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full ${
              s.variant === 0 ? "animate-twinkle" : s.variant === 1 ? "animate-twinkle-slow" : "animate-twinkle-fast"
            }`}
            style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
          />
        ))}
      </div>

      {/* Floaty particles (hidden on very small screens if you want): */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-particle"
            style={{ left: `${p.left}%`, top: `100%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
          />
        ))}
      </div>

      {/* Nebula glows — only on large screens so phones stay clean */}
      <div className="hidden lg:block absolute top-10 -left-20 w-[800px] h-[600px] bg-gradient-to-r from-purple-500/5 via-blue-500/10 to-transparent rounded-full blur-3xl animate-nebula" />
      <div className="hidden lg:block absolute bottom-10 -right-20 w-[700px] h-[500px] bg-gradient-to-l from-teal-500/8 via-blue-500/6 to-transparent rounded-full blur-3xl animate-nebula stagger-3" />
      <div className="hidden lg:block absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-purple-400/5 to-transparent rounded-full blur-2xl animate-aurora" />

      {/* Tiny orbiters — hide on small */}
      <div className="hidden md:block absolute top-20 right-32 pointer-events-none">
        <div className="relative w-32 h-32">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-orbit shadow-cosmic" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-orbit-reverse" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-1 bg-teal-400 rounded-full animate-orbit-fast" />
          </div>
        </div>
      </div>

      {/* Content wrapper: full-width paddings that scale by breakpoint */}
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          {/* Hero */}
          <div className={`text-center space-y-6 sm:space-y-8 ${mounted ? "animate-slide-up opacity-0" : "opacity-0"}`}>
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cosmic animate-gradient-x bg-[length:300%_300%] leading-tight">
                Google Maps for
                <br />
                <span className="relative text-cosmic animate-gradient-x bg-[length:300%_300%]">
                  Space Bioscience
                  <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 animate-cosmic-pulse" />
                </span>
              </h1>

              {/* floating dots */}
              <div className="absolute -top-8 -left-8 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400/60 rounded-full animate-float" />
              <div className="absolute -top-4 -right-12 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-400/60 rounded-full animate-float-delay-1" />
              <div className="absolute -bottom-8 -right-8 w-2 h-2 bg-teal-400/60 rounded-full animate-float-delay-2" />
              <div className="absolute -bottom-4 -left-16 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-400/60 rounded-full animate-float-delay-3" />
            </div>

            <p
              className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed ${
                mounted ? "animate-slide-up opacity-0 stagger-2" : "opacity-0"
              }`}
            >
              Explore how missions, datasets, and papers connect. Search topics, visualize graphs, and ask questions with citations.
            </p>
          </div>

          {/* Quick search cards */}
          <div className={`${mounted ? "animate-slide-up opacity-0 stagger-3" : "opacity-0"} space-y-6 sm:space-y-8`}>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center justify-center gap-3">
                <div className="hidden sm:flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-twinkle" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-twinkle stagger-1" />
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-twinkle stagger-2" />
                </div>
                Try a quick search
                <div className="hidden sm:flex space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-twinkle stagger-3" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-twinkle stagger-4" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-twinkle stagger-5" />
                </div>
              </h2>
              <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {["microgravity bone mouse", "plant roots spaceflight", "immune changes ISS"].map((term, i) => (
                <Link
                  key={term}
                  to={`/results?q=${encodeURIComponent(term)}`}
                  className={`group relative p-5 sm:p-6 rounded-2xl bg-cosmic-glass hover:bg-cosmic-hover transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-cosmic hover:shadow-cosmic-lg animate-float ${
                    i === 1 ? "animate-float-delay-1" : i === 2 ? "animate-float-delay-2" : ""
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-white text-base sm:text-lg font-medium group-hover:text-blue-200 transition-colors duration-300">
                      {term}
                    </div>
                    <div className="mt-1.5 sm:mt-2 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      Explore research →
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400/40 rounded-full group-hover:bg-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400/40 rounded-full group-hover:bg-purple-400 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Trending organisms */}
          <div className={`${mounted ? "animate-slide-up opacity-0 stagger-4" : "opacity-0"} space-y-6 sm:space-y-8`}>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center justify-center gap-3">
                <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-transparent to-teal-400" />
                Trending organisms
                <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-l from-transparent to-teal-400" />
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-4xl mx-auto">
              {trending.map((o: any, idx: number) => (
                <Link
                  key={o.key}
                  to={`/results?q=${encodeURIComponent(o.key)}&organism=${encodeURIComponent(o.key)}`}
                  className={`group px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 hover:border-teal-400/60 hover:from-teal-500/30 hover:to-emerald-500/30 transition-all duration-300 hover:scale-110 hover:shadow-teal-glow backdrop-blur-sm animate-float ${
                    idx % 2 ? "animate-float-delay-1" : ""
                  }`}
                >
                  <span className="text-teal-100 group-hover:text-white font-medium text-sm sm:text-base transition-colors duration-300">
                    {o.key}
                  </span>
                  <span className="ml-2 text-teal-400 text-xs sm:text-sm group-hover:text-teal-2 00 transition-colors duration-300">
                    ({o.count ?? o.doc_count})
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer tag */}
          <div className={`${mounted ? "animate-slide-up opacity-0 stagger-5" : "opacity-0"} text-center pt-10 sm:pt-12`}>
            <div className="inline-flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-400" />
              <span>Powered by NASA Space Biology</span>
              <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
