import type { SearchResponse, GraphResponse, QAResponse } from "./types";

export const mockSearch: SearchResponse = {
  results: [
    {
      uid: "paper:W123",
      title: "Microgravity alters bone gene expression in mice",
      year: 2023,
      source: "openalex",
      entities: { organisms: ["mouse"], tissues: ["bone"], mission: ["ISS"] },
    },
    {
      uid: "paper:B456",
      title: "Plant root growth in spaceflight conditions",
      year: 2022,
      source: "ads",
      entities: { organisms: ["arabidopsis"], mission: ["ISS"] },
    },
  ],
  facets: {
    mission: [{ key: "ISS", count: 21 }, { key: "STS", count: 5 }],
    organism: [{ key: "mouse", count: 18 }, { key: "arabidopsis", count: 8 }],
    year: [{ key: "2024", count: 9 }, { key: "2023", count: 15 }],
  },
  total: 2,
  page: 1,
  pageSize: 20,
};

export const mockGraph: GraphResponse = {
  node: { id: "paper:W123", label: "Paper", title: "Microgravity alters bone gene expression in mice" },
  neighbors: {
    Dataset: [{ id: "GLDS-123", label: "Dataset", title: "GeneLab GLDS-123" }],
    Mission: [{ id: "ISS", label: "Mission", title: "ISS" }],
    Organism: [{ id: "mouse", label: "Organism", title: "Mus musculus" }],
    Tissue: [{ id: "bone", label: "Tissue", title: "Bone" }],
    Paper: [{ id: "paper:Z999", label: "Paper", title: "Related citation" }],
  },
  edges: [
    { id: "e1", source: "paper:W123", target: "GLDS-123", rel: "DERIVES_FROM" },
    { id: "e2", source: "GLDS-123", target: "ISS", rel: "FROM_MISSION" },
    { id: "e3", source: "paper:W123", target: "mouse", rel: "INVOLVES" },
    { id: "e4", source: "paper:W123", target: "bone", rel: "INVOLVES" },
    { id: "e5", source: "paper:W123", target: "paper:Z999", rel: "CITES" },
  ],
};

export const mockQA: QAResponse = {
  answer:
    "In microgravity, bone formation pathways are downregulated while resorption markers increase, indicating net bone loss risk.",
  citations: [
    { id: "paper:W123", label: "[1] Microgravity alters bone gene expression in mice" },
    { id: "paper:Z999", label: "[2] Spaceflight skeletal adaptations review" },
  ],
  evidence: [{ citation_id: "paper:W123", text: "Microgravity exposure decreased osteoblast-related genes in femoral tissue." }],
};

// --- extra mock details for detail pages ---
export const mockPaperDetails: Record<string, { uid: string; title: string; abstract: string; year?: number; source: string; }> = {
  "paper:W123": {
    uid: "paper:W123",
    title: "Microgravity alters bone gene expression in mice",
    abstract: "We report downregulation of osteoblast pathways and increased resorption markers in murine femoral tissue after microgravity exposure...",
    year: 2023, source: "openalex"
  },
  "paper:Z999": {
    uid: "paper:Z999",
    title: "Spaceflight skeletal adaptations review",
    abstract: "This review covers the skeletal system's response to spaceflight including bone loss mechanisms...",
    year: 2021, source: "ads"
  }
};

export const mockDatasetDetails: Record<string, { id: string; title: string; mission: string; link?: string; summary: string; }> = {
  "GLDS-123": {
    id: "GLDS-123",
    title: "GeneLab GLDS-123",
    mission: "ISS",
    link: "https://genelab-data.ndc.nasa.gov/GLDS-123",
    summary: "RNA-seq of murine bone tissue post microgravity exposure."
  }
};
