import { Badge } from "../ui/Badge";
import { TrendChart } from "./Charts";
import { useDashboard } from "../../hooks/useDashboard";
import {
  aggregate,
  alertsFor,
  assets,
  countries,
  fmt,
} from "../../domain/data";

export function AssetTable({
  mode,
}: {
  mode: "generation" | "mobility" | "all";
}) {
  const { setDetail, search, setSearch, rows, trendRows, periodText } =
    useDashboard();
  function openAsset(assetId: string) {
    const a = assets.find((a) => a.id === assetId)!;
    const matches = rows.filter((r) => r.assetId === a.id),
      ak = aggregate(matches);
    setDetail({
      title: a.name,
      content: (
        <>
          <Badge>
            {a.id} · {a.country} · {a.technology}
          </Badge>
          <p className="text-slate-500">
            Capacidad instalada: {fmt(a.capacity)} MW · Periodo: {periodText}
          </p>
          <p className="text-slate-500">
            Generación: {fmt(ak.generation)} MWh · Meta: {fmt(ak.expected)} MWh
            · Cumplimiento: {fmt(ak.compliance, 1)}
            {ak.compliance === null ? "" : "%"}
          </p>
          <p className="text-slate-500">
            Disponibilidad: {fmt(ak.availability, 1)}
            {ak.availability === null ? "" : "%"} · Utilización:{" "}
            {fmt(ak.utilization, 1)}
            {ak.utilization === null ? "" : "%"}
          </p>
          <p className="text-slate-500">
            Fuente: {matches[0]?.source} · Última ingesta UTC:{" "}
            {matches.at(-1)?.ingestedAt}
          </p>
          <TrendChart
            rows={trendRows.filter((r) => r.assetId === a.id)}
            metric={a.technology === "carga" ? "energy" : "generation"}
          />
          {alertsFor(matches).map((al) => (
            <div
              className="mb-6 rounded-xl border border-slate-200/60 bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-500"
              key={al.id}
            >
              {al.title}: {al.description}
            </div>
          ))}
        </>
      ),
    });
  }
  const filtered = assets.filter(
    (a) =>
      rows.some((r) => r.assetId === a.id) &&
      (mode === "all" ||
        (mode === "mobility"
          ? a.technology === "carga"
          : a.technology !== "carga")) &&
      `${a.name} ${a.id}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="flex items-end justify-between gap-4 px-6 pb-5 [&>label]:w-64 [&>label]:max-w-[75%] [&>span]:text-[11px] [&>span]:text-slate-500">
        <label className="flex flex-col gap-2 text-[11px] text-slate-500">
          Buscar activo
          <input
            className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre o código…"
          />
        </label>
        <span>{filtered.length} activos</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse whitespace-nowrap text-left text-xs tabular-nums">
          <thead>
            <tr className="transition-colors hover:bg-slate-50/50">
              <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                Activo / código
              </th>
              <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                País
              </th>
              <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                Tecnología
              </th>
              {mode === "mobility" ? (
                <>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    Energía · MWh
                  </th>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    Sesiones
                  </th>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    Horas uso / disponibles
                  </th>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    Utilización
                  </th>
                </>
              ) : (
                <>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    MW
                  </th>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    Real / meta · MWh
                  </th>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    Cumplimiento
                  </th>
                  <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                    Disponibilidad
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const ar = rows.filter((r) => r.assetId === a.id),
                ak = aggregate(ar);
              return (
                <tr
                  className="transition-colors hover:bg-slate-50/50"
                  key={a.id}
                >
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    <button
                      className="flex cursor-pointer flex-col items-start gap-1 border-0 bg-transparent p-0 text-xs text-slate-600 hover:text-emerald-700 [&_small]:text-[10px] [&_small]:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
                      onClick={() => openAsset(a.id)}
                    >
                      <b>{a.name} ↗</b>
                      <small className="text-[11px]">{a.id}</small>
                    </button>
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    {countries.find((c) => c.code === a.country)?.flag}{" "}
                    {a.country}
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    <Badge kind="neutral">
                      {a.technology === "eolica"
                        ? "Eólica"
                        : a.technology === "solar"
                          ? "Solar"
                          : "Carga EV"}
                    </Badge>
                  </td>
                  {mode === "mobility" ? (
                    <>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        {fmt(ak.energy, 1)}
                      </td>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        {fmt(ak.sessions)}
                      </td>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        {fmt(ar.reduce((s, r) => s + r.occupied, 0))} /{" "}
                        {fmt(ar.reduce((s, r) => s + r.available, 0))}
                      </td>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        <Badge
                          kind={(ak.utilization ?? 0) < 25 ? "warning" : ""}
                        >
                          {fmt(ak.utilization, 1)}%
                        </Badge>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        {a.capacity || "—"}
                      </td>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        {fmt(ak.generation)} / {fmt(ak.expected)}
                      </td>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        <Badge
                          kind={
                            ak.compliance !== null && ak.compliance < 90
                              ? "danger"
                              : ""
                          }
                        >
                          {fmt(ak.compliance, 1)}
                          {ak.compliance !== null ? "%" : ""}
                        </Badge>
                      </td>
                      <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                        {fmt(ak.availability, 1)}
                        {ak.availability !== null ? "%" : ""}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {!filtered.length && (
          <p className="flex flex-col items-center gap-3 px-6 py-12 text-center text-xs text-slate-500">
            No hay activos para estos filtros.
          </p>
        )}
      </div>
    </>
  );
}
