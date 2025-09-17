import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGraph } from "../lib/api";
import GraphView from "../components/GraphView";

export default function Graph() {
  const [sp] = useSearchParams();
  const focus = sp.get("focus") || "paper:W123";
  const { data } = useQuery({ queryKey:["graph", focus], queryFn:()=>getGraph(focus) });
  if (!data) return <div>Loading graph…</div>;
  return (
    <div className="space-y-4">
      <div className="text-sm opacity-70">Graph focus: {focus}</div>
      <GraphView data={data} />
    </div>
  );
}
