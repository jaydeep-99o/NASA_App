import { useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../lib/api";
import ResultCard from "../components/ResultCard";
import Facets from "../components/Facets";
import { Skeleton } from "../components/Skeleton";

export default function Results() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";
  const page = Number(sp.get("page") || 1);

  // Stable params object for the query fn
  const params = useMemo(() => Object.fromEntries(sp), [sp]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", q, sp.toString()],
    queryFn: () => searchApi(q, params),
    enabled: q.trim().length > 0, // don't hit API when query is empty
  });

  // Helpers
  function setFacet(key: string, val: string) {
    sp.set(key, val);
    sp.set("page", "1"); // reset page when changing filters
    setSp(sp, { replace: true });
  }
  function removeFilter(key: string) {
    sp.delete(key);
    sp.set("page", "1");
    setSp(sp, { replace: true });
  }
  function clearAll() {
    const qOnly = new URLSearchParams();
    if (q) qOnly.set("q", q);
    qOnly.set("page", "1");
    setSp(qOnly, { replace: true });
  }
  function setPage(n: number) {
    sp.set("page", String(n));
    setSp(sp, { replace: true });
  }

  const total = data?.total ?? 0;
  const pageSize = data?.pageSize ?? 20;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Scroll to top when page changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page, q]);

  // Empty-query UX
  if (!q.trim()) {
    return (
      <div className="space-y-6">
        <div className="text-sm opacity-70">Enter a query to see results.</div>
        <div>
          <div className="text-sm font-medium mb-2">Try a quick search</div>
          <div className="flex gap-2 flex-wrap">
            {["microgravity bone mouse","plant roots spaceflight","immune changes ISS"].map(x=>(
              <Link key={x} to={`/results?q=${encodeURIComponent(x)}`}
                className="px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                {x}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[260px,1fr] gap-6">
      {/* Facets */}
      <aside className="space-y-6">
        {isLoading ? (
          <div className="space-y-6">
            <FacetSkeleton />
            <FacetSkeleton />
            <FacetSkeleton />
          </div>
        ) : (
          <>
            <Facets title="Mission" items={data?.facets.mission || []} onPick={(v)=>setFacet("mission", v)} />
            <Facets title="Organism" items={data?.facets.organism || []} onPick={(v)=>setFacet("organism", v)} />
            <Facets title="Year" items={data?.facets.year || []} onPick={(v)=>setFacet("year", v)} />
          </>
        )}
      </aside>

      {/* Results */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-70">
            Results for <span className="font-medium">{q}</span>
            {total ? <span className="ml-2">• {total} items</span> : null}
          </div>
          <ActiveFilters onClearAll={clearAll} onRemove={removeFilter} keys={["mission","organism","year"]} sp={sp} />
        </div>

        {isError && (
          <div className="rounded-xl border border-red-300/60 dark:border-red-800/60 p-4 text-sm">
            Something went wrong. {(error as any)?.message || "Please try again."}
          </div>
        )}

        {isLoading && (
          <div className="space-y-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}

        {!isLoading && data?.results.map(r => <ResultCard key={r.uid} r={r} />)}

        {!isLoading && data?.results.length === 0 && (
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="font-medium mb-1">No results.</div>
            <div className="text-sm opacity-70">Try removing filters or using broader keywords.</div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <button
              className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 disabled:opacity-50"
              onClick={()=>setPage(Math.max(1, page-1))} disabled={page<=1}>
              ← Prev
            </button>
            <div className="text-sm opacity-70">
              Page <span className="font-medium">{page}</span> / {totalPages}
            </div>
            <button
              className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 disabled:opacity-50"
              onClick={()=>setPage(Math.min(totalPages, page+1))} disabled={page>=totalPages}>
              Next →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

/* --- tiny helpers --- */

function ActiveFilters({
  sp,
  keys,
  onRemove,
  onClearAll,
}: {
  sp: URLSearchParams;
  keys: string[];
  onRemove: (k: string) => void;
  onClearAll: () => void;
}) {
  const active = keys
    .map(k => ({ k, v: sp.get(k) }))
    .filter(x => x.v && x.v.trim().length);

  if (!active.length) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm">Filters:</div>
      {active.map(({ k, v }) => (
        <button key={k}
          onClick={()=>onRemove(k)}
          className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          {k}: {v} ✕
        </button>
      ))}
      <button onClick={onClearAll} className="text-xs underline opacity-80">Clear all</button>
    </div>
  );
}

function FacetSkeleton() {
  return (
    <div>
      <div className="h-4 w-24 mb-2"><Skeleton className="h-full w-full" /></div>
      <div className="space-y-2">
        <Skeleton className="h-7" />
        <Skeleton className="h-7" />
        <Skeleton className="h-7" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return <Skeleton className="h-24" />;
}
