import type { FacetBucket } from "../lib/types";

export default function Facets({ title, items, onPick }: {
    title: string, items: FacetBucket[], onPick: (k: string) => void
}) {
    return (
        <div>
            <div className="font-medium mb-2">{title}</div>
            <div className="space-y-1">
                {items.map(f => (
                    <button key={f.key} onClick={() => onPick(f.key)}
                        className="w-full text-left flex justify-between px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <span>{f.key}</span><span className="opacity-60">{f.count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
