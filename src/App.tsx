import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { CollectionsProvider } from "./lib/CollectionsContext";
import "./index.css";
import StarfieldBG from "./components/StarfieldBG"; 

export default function App() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  return (
    <CollectionsProvider>
      <div className="min-h-screen">
        {/* LIVE BACKGROUND */}
        <StarfieldBG />
        <Navbar />
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="container mx-auto max-w-6xl py-4 flex gap-4 items-center">
            <Link to="/" className="font-semibold text-lg">SpaceBio Atlas</Link>
            <div className="flex-1 max-w-2xl">
              <SearchBar onSubmit={(q) => nav(`/results?q=${encodeURIComponent(q)}`)} />
            </div>
            <nav className="flex gap-4 text-sm">
              <Link to="/graph" className={pathname==="/graph" ? "font-medium" : ""}>Graph</Link>
              <Link to="/qa" className={pathname==="/qa" ? "font-medium" : ""}>QA</Link>
              <Link to="/collections" className={pathname==="/collections" ? "font-medium" : ""}>Collections</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto max-w-6xl py-6">
          <Outlet />
        </main>
      </div>
    </CollectionsProvider>
  );
}
