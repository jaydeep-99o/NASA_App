import { Link } from "react-router-dom";
import type { SearchResult } from "../lib/types";

export default function ResultCard({ r }: { r: SearchResult }) {
    return (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-sm transition">
            <div className="flex items-center justify-between gap-3">
                <Link to={`/paper/${encodeURIComponent(r.uid)}`} className="font-medium hover:underline">
                    {r.title}
                </Link>
                <div className="text-xs opacity-70">{r.source.toUpperCase()} • {r.year ?? "—"}</div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
                {r.entities?.mission?.map(m => <span key={m} className="px-2 py-0.5 text-xs rounded-full bg-blue-100/60 dark:bg-blue-900/30">{m}</span>)}
                {r.entities?.organisms?.map(o => <span key={o} className="px-2 py-0.5 text-xs rounded-full bg-emerald-100/60 dark:bg-emerald-900/30">{o}</span>)}
                {r.entities?.tissues?.map(t => <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-fuchsia-100/60 dark:bg-fuchsia-900/30">{t}</span>)}
            </div>
            <div className="mt-3 flex gap-3 text-sm">
                <Link to={`/graph?focus=${encodeURIComponent(r.uid)}`} className="underline">View in Graph</Link>
                <button className="underline">Save</button>
            </div>
        </div>
    );
}
