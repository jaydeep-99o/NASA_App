import { useParams } from "react-router-dom";
import { mockDatasetDetails } from "../lib/mock";

export default function Dataset() {
  const { id = "" } = useParams();
  const d = mockDatasetDetails[id];
  if (!d) return <div>Dataset not found.</div>;

  return (
    <div className="space-y-4">
      <div className="text-xs opacity-70">Mission • {d.mission} • ID {d.id}</div>
      <h1 className="text-2xl font-semibold">{d.title}</h1>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
        <div className="font-medium mb-1">Summary</div>
        <p className="opacity-80">{d.summary}</p>
      </div>
      {d.link && (
        <a href={d.link} target="_blank" rel="noreferrer" className="underline text-sm">
          Open in GeneLab
        </a>
      )}
    </div>
  );
}
