import { useCollections } from "../lib/CollectionsContext";
import { exportBibTeX, exportCSV } from "../lib/collections";
import { Link } from "react-router-dom";

export default function Collections() {
  const { saved, toggleSave } = useCollections();

  if (!saved.length) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 text-center">
        <div className="text-lg font-medium mb-2">No items saved yet</div>
        <p className="opacity-70">Go to <Link className="underline" to="/results?q=microgravity">Results</Link> and click “Save”.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm opacity-70">{saved.length} saved item(s)</div>
        <div className="flex gap-2">
          <button onClick={()=>exportCSV(saved)} className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700">Export CSV</button>
          <button onClick={()=>exportBibTeX(saved)} className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700">Export BibTeX</button>
        </div>
      </div>

      <ul className="space-y-3">
        {saved.map(i => (
          <li key={i.uid} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex justify-between gap-3">
              <Link to={`/paper/${encodeURIComponent(i.uid)}`} className="font-medium hover:underline">{i.title}</Link>
              <div className="text-xs opacity-70">{i.source.toUpperCase()} • {i.year ?? "—"}</div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {i.entities?.mission?.map(m => <span key={m} className="px-2 py-0.5 text-xs rounded-full bg-blue-100/60 dark:bg-blue-900/30">{m}</span>)}
              {i.entities?.organisms?.map(o => <span key={o} className="px-2 py-0.5 text-xs rounded-full bg-emerald-100/60 dark:bg-emerald-900/30">{o}</span>)}
              {i.entities?.tissues?.map(t => <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-fuchsia-100/60 dark:bg-fuchsia-900/30">{t}</span>)}
            </div>
            <div className="mt-3 text-sm">
              <button onClick={()=>toggleSave(i)} className="underline">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
