import EffectsToggle from "./EffectsToggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-neutral-200/70 dark:border-neutral-800/70
                    bg-neutral-50/60 dark:bg-neutral-900/60 backdrop-blur
                    supports-[backdrop-filter]:bg-neutral-50/40 dark:supports-[backdrop-filter]:bg-neutral-900/40">
      {/* full width, responsive padding & height */}
      <div className="h-10 sm:h-11 md:h-12 flex items-center justify-between
                      px-3 sm:px-4 md:px-6 lg:px-8">
        {/* left: brand + tagline */}
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-semibold tracking-tight
                           text-sm sm:text-base md:text-lg">
            SpaceBio Atlas
          </span>
          <span className="hidden md:inline opacity-70
                           text-xs sm:text-sm truncate">
            • NASA Space Apps — Demo
          </span>
        </div>

        {/* right: helper text + effects toggle */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline opacity-70 text-[11px] sm:text-xs">
            Dark mode follows system
          </span>
          <EffectsToggle />
        </div>
      </div>
    </div>
  );
}
