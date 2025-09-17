import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ask } from "../lib/api";
import AIAnswer from "../components/AIAnswer";

export default function QA() {
  const [q, setQ] = useState("");
  const m = useMutation({ mutationFn: ask });

  return (
    <div className="space-y-4 max-w-3xl">
      <form onSubmit={(e)=>{e.preventDefault(); if(q.trim()) m.mutate(q);}}>
        <input
          value={q} onChange={(e)=>setQ(e.target.value)}
          placeholder="What does microgravity do to bone genes in mice?"
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 px-4 py-2 outline-none focus:ring-2 ring-blue-500"
        />
      </form>
      {m.isPending && <div>Thinking…</div>}
      {m.data && <AIAnswer data={m.data} />}
    </div>
  );
}
