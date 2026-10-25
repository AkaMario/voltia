import { useEffect, useState, type ReactNode } from "react";

type SkeletonLayout = "overview" | "table" | "report";
export function DashboardSkeleton({
  report = false,
  table = false,
}: {
  report?: boolean;
  table?: boolean;
}) {
  return (
    <div
      role="status"
      aria-label="Cargando contenido"
      className="space-y-6 motion-reduce:[&_*]:animate-none"
    >
      <span className="sr-only">Cargando información…</span>
      {!report && !table && (
        <div
          className="grid grid-cols-2 gap-4 xl:grid-cols-4"
          aria-hidden="true"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-white p-6"
            >
              <div className="mb-6 h-3 w-2/3 animate-pulse rounded bg-slate-100" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200/60" />
              <div className="mt-5 h-2.5 w-1/2 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
      )}
      {table ? (
        <div
          aria-hidden="true"
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
        >
          <div className="flex gap-8 border-b border-slate-100 bg-slate-50/50 p-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="h-3 flex-1 animate-pulse rounded bg-slate-200/60"
              />
            ))}
          </div>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex gap-8 border-b border-slate-50 px-6 py-6"
            >
              <div className="h-3 flex-1 animate-pulse rounded bg-slate-100" />
              <div className="h-3 flex-1 animate-pulse rounded bg-slate-100" />
              <div className="h-3 flex-1 animate-pulse rounded bg-slate-100" />
              <div className="h-3 flex-1 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={
            report
              ? "h-[560px] rounded-2xl border border-slate-100 bg-white p-7"
              : "h-[330px] rounded-2xl border border-slate-100 bg-white p-7"
          }
          aria-hidden="true"
        >
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200/60" />
          <div className="mt-3 h-3 w-56 animate-pulse rounded bg-slate-100" />
          <div className="mt-10 flex h-3/5 items-end gap-4 border-b border-slate-100 pb-2">
            {[40, 65, 50, 78, 60, 85, 72, 90].map((height, i) => (
              <div
                key={i}
                style={{ height: `${height}%`, animationDelay: `${i * 80}ms` }}
                className="flex-1 animate-pulse rounded-t-lg bg-emerald-50"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Short, explicit demo loading phase; remount when navigation or filters change. */
export function PageTransition({
  children,
  layout = "overview",
}: {
  children: ReactNode;
  layout?: SkeletonLayout;
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 360);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <div aria-busy={loading}>
      {loading && (
        <DashboardSkeleton
          report={layout === "report"}
          table={layout === "table"}
        />
      )}
      <div
        hidden={loading}
        className="transition-[opacity,transform] duration-500 ease-out starting:translate-y-3 starting:opacity-0 motion-reduce:transform-none motion-reduce:transition-none"
      >
        {children}
      </div>
    </div>
  );
}
