import { createContext, useContext, useEffect, useState } from "react";
import type { SearchResult } from "./types";
import { loadSaved, saveAll, toggleSave as _toggleSave, isSaved as _isSaved } from "./collections";

type Ctx = {
  saved: SearchResult[];
  toggleSave: (item: SearchResult)=>void;
  isSaved: (uid: string)=>boolean;
};
const Ctx = createContext<Ctx | null>(null);

export function CollectionsProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<SearchResult[]>([]);
  useEffect(()=> { setSaved(loadSaved()); }, []);
  const toggleSave = (item: SearchResult) => setSaved(_toggleSave(item));
  const isSaved = (uid: string) => _isSaved(uid);
  useEffect(()=> { saveAll(saved); }, [saved]);
  return <Ctx.Provider value={{ saved, toggleSave, isSaved }}>{children}</Ctx.Provider>;
}

export function useCollections() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCollections must be inside provider");
  return v;
}
