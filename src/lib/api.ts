import axios from "axios";
import type { SearchResponse, GraphResponse, QAResponse } from "./types";
import { mockSearch, mockGraph, mockQA } from "./mock";

const BASE = import.meta.env.VITE_API_URL; // set later (backend URL)

export async function searchApi(q: string, params?: Record<string, string>): Promise<SearchResponse> {
  if (!BASE) return mockSearch;
  const res = await axios.get(`${BASE}/search`, { params: { q, ...params } });
  return res.data;
}

export async function getGraph(uid: string): Promise<GraphResponse> {
  if (!BASE) return mockGraph;
  const res = await axios.get(`${BASE}/graph/node/${encodeURIComponent(uid)}`);
  return res.data;
}

export async function ask(question: string): Promise<QAResponse> {
  if (!BASE) return mockQA;
  const res = await axios.post(`${BASE}/qa`, { question });
  return res.data;
}
