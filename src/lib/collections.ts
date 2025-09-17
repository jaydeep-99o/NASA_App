// Minimal client-side collections with CSV/BibTeX export
import type { SearchResult } from "./types";

const KEY = "spacebio.collections";

export function loadSaved(): SearchResult[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveAll(items: SearchResult[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
export function isSaved(uid: string): boolean {
  return loadSaved().some(i => i.uid === uid);
}
export function toggleSave(item: SearchResult) {
  const list = loadSaved();
  const i = list.findIndex(x => x.uid === item.uid);
  if (i >= 0) { list.splice(i, 1); }
  else { list.unshift(item); }
  saveAll(list);
  return list;
}

// --- exports ---
export function exportCSV(items: SearchResult[]) {
  const header = ["uid","title","year","source","organisms","tissues","mission"];
  const rows = items.map(i => [
    i.uid, i.title, i.year ?? "", i.source,
    (i.entities?.organisms || []).join("|"),
    (i.entities?.tissues || []).join("|"),
    (i.entities?.mission || []).join("|"),
  ]);
  downloadFile("spacebio-collection.csv", toCSV([header, ...rows]));
}
function toCSV(rows: (string|number)[][]) {
  return rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
}

export function exportBibTeX(items: SearchResult[]) {
  const bib = items.map((i, idx) => {
    const key = (i.title || "item").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,30) || `item${idx}`;
    const year = i.year ?? "";
    return `@article{${key},
  title={${i.title}},
  year={${year}},
  note={Source: ${i.source.toUpperCase()} | UID: ${i.uid}}
}`;
  }).join("\n\n");
  downloadFile("spacebio-collection.bib", bib);
}

function downloadFile(name: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}
