export type Entity = {
  organisms?: string[];
  tissues?: string[];
  mission?: string[];
  genes?: string[];
};

export type SearchResult = {
  uid: string;
  title: string;
  year?: number;
  source: "openalex" | "ads" | "osdr";
  entities?: Entity;
};

export type FacetBucket = { key: string; count: number };

export type SearchResponse = {
  results: SearchResult[];
  facets: {
    mission: FacetBucket[];
    organism: FacetBucket[];
    year: FacetBucket[];
  };
  total: number;
  page: number;
  pageSize: number;
};

export type GraphNode = {
  id: string;
  label: "Paper" | "Dataset" | "Mission" | "Organism" | "Gene" | "Tissue";
  title?: string;
};

export type GraphEdge = { id: string; source: string; target: string; rel: string };

export type GraphResponse = {
  node: GraphNode;
  neighbors: Record<string, GraphNode[]>;
  edges?: GraphEdge[];
};

export type QAResponse = {
  answer: string;
  citations: { id: string; label: string; url?: string }[];
  evidence: { citation_id: string; text: string }[];
};
