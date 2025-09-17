import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import { useMemo } from "react";
import type { GraphResponse } from "../lib/types";

function color(label: string) {
  switch(label){
    case "Paper": return "#60a5fa";
    case "Dataset": return "#34d399";
    case "Mission": return "#f59e0b";
    case "Organism": return "#22d3ee";
    case "Tissue": return "#f472b6";
    case "Gene": return "#a78bfa";
    default: return "#9ca3af";
  }
}

export default function GraphView({ data }: { data: GraphResponse }) {
  const elements = useMemo(()=> {
    const nodes: any[] = [{ data:{ id:data.node.id, label:data.node.label, name:data.node.title || data.node.id }}];
    Object.values(data.neighbors).flat().forEach(n => nodes.push({ data:{ id:n.id, label:n.label, name:n.title || n.id }}));
    const edges = (data.edges || []).map(e => ({ data: e }));
    return [...nodes, ...edges];
  }, [data]);

  const stylesheet: cytoscape.StylesheetCSS[] = [
    { selector: "node", css: {
        "background-color": (ele:any)=> color(ele.data("label")),
        "label": "data(name)", "font-size":"10px", "text-valign":"center", "color":"#111",
        "text-outline-color":"#fff", "text-outline-width":"1px"
      } },
    { selector: "edge", css: { "width":1.5, "line-color":"#9ca3af", "target-arrow-color":"#9ca3af", "target-arrow-shape":"triangle" } }
  ];

  return (
    <div className="h-[560px] rounded-xl border border-neutral-200 dark:border-neutral-800">
      <CytoscapeComponent
        elements={elements as any}
        layout={{ name:"cose", animate:false }}
        stylesheet={stylesheet as any}
        style={{ width:"100%", height:"100%" }}
      />
    </div>
  );
}
