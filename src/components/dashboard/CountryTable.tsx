import { Badge } from "../ui/Badge";
import { percent } from "../../utils/format";
import { useDashboard } from "../../hooks/useDashboard";
import { fmt } from "../../domain/data";

export function CountryTable() {
  const {
    setFilters,
    sort,
    setSort,
    descending,
    setDescending,
    k,
    countrySummary,
    navigate,
  } = useDashboard();
  const sorted = [...countrySummary].sort((a, b) => {
    const av = sort === "name" ? a.name : a[sort as "generation"],
      bv = sort === "name" ? b.name : b[sort as "generation"];
    return (
      (typeof av === "string"
        ? av.localeCompare(String(bv))
        : av - Number(bv)) * (descending ? -1 : 1)
    );
  });
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse whitespace-nowrap text-left text-xs tabular-nums">
        <thead>
          <tr className="transition-colors hover:bg-slate-50/50">
            {[
              ["name", "País"],
              ["generation", "Generación · MWh"],
              ["compliance", "Cumplimiento"],
              ["consumption", "Consumo · MWh"],
              ["energy", "Carga · MWh"],
              ["sessions", "Sesiones"],
              ["revenue", "Ingresos · USD"],
            ].map(([key, label]) => (
              <th
                className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500"
                key={key}
              >
                <button
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
                  onClick={() => {
                    setSort(key);
                    setDescending(sort === key ? !descending : false);
                  }}
                >
                  {label} {sort === key ? (descending ? "↓" : "↑") : "↕"}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((c) => (
            <tr className="transition-colors hover:bg-slate-50/50" key={c.code}>
              <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                <button
                  className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-xs text-slate-600 hover:text-emerald-700 [&>span:last-child]:ml-2 [&>span:last-child]:text-[10px] [&>span:last-child]:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
                  onClick={() => {
                    setFilters((f) => ({ ...f, country: c.code }));
                    navigate("/generacion");
                  }}
                >
                  <span className="text-lg">{c.flag}</span>
                  {c.name}
                  <span>↗</span>
                </button>
              </td>
              <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                <b>{fmt(c.generation)}</b>
              </td>
              <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                <Badge kind={(c.compliance ?? 0) < 95 ? "warning" : ""}>
                  {percent(c.compliance)}
                </Badge>
              </td>
              <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                {fmt(c.consumption)}
              </td>
              <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                {fmt(c.energy, 1)}
              </td>
              <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                {fmt(c.sessions)}
              </td>
              <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                {fmt(c.revenue)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50/70 font-medium">
          <tr className="transition-colors hover:bg-slate-50/50">
            <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
              Total filtrado
            </td>
            <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
              {fmt(k.generation)}
            </td>
            <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
              {percent(k.compliance)}
            </td>
            <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
              {fmt(k.consumption)}
            </td>
            <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
              {fmt(k.energy, 1)}
            </td>
            <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
              {fmt(k.sessions)}
            </td>
            <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
              {fmt(k.revenue)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
