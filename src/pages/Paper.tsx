import { useParams, Link } from "react-router-dom";
import { mockPaperDetails } from "../lib/mock";

export default function Paper() {
  const { uid = "" } = useParams();
  const p = mockPaperDetails[uid];
  if (!p) return <div>Paper not found.</div>;

  return (
    <div className="space-y-4">
      <div className="text-xs opacity-70">{p.source.toUpperCase()} • {p.year ?? "—"} • UID {p.uid}</div>
      <h1 className="text-2xl font-semibold">{p.title}</h1>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
        <div className="font-medium mb-1">Abstract</div>
        <p className="opacity-80">{p.abstract}</p>
      </div>
      <div className="flex gap-3 text-sm">
        <Link to={`/graph?focus=${encodeURIComponent(uid)}`} className="underline">View in Graph</Link>
        <Link to="/collections" className="underline">Add/see in Collections</Link>
      </div>
    </div>
  );
}
