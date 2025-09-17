import { useState } from "react";

export default function SearchBar({ onSubmit }: { onSubmit: (q: string) => void }) {
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(q.trim()); }}
      className="w-full"
    >
      <div className="search-shell group">
        {/* search icon */}
        <svg
          className="pointer-events-none absolute left-3 sm:left-4 top-1/2 -translate-y-1/2
                     h-4 w-4 sm:h-5 sm:w-5 opacity-70 group-focus-within:opacity-100 transition-opacity"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>

        {/* clear button */}
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2
                       h-6 w-6 rounded-full grid place-items-center
                       border border-neutral-300/60 dark:border-neutral-700/60
                       hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60
                       text-xs"
          >
            ×
          </button>
        )}

        {/* input */}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search microgravity bone mouse..."
          className="
            search-input w-full
            h-10 sm:h-11 md:h-12
            rounded-2xl
            pl-9 sm:pl-11 pr-9
            text-sm md:text-base
            border border-neutral-300 dark:border-neutral-700
            bg-white/70 dark:bg-neutral-900/70
            outline-none focus:ring-2 ring-blue-500/60
            caret-blue-500
            transition-all duration-300
            shadow-sm hover:shadow
          "
        />
      </div>
    </form>
  );
}
