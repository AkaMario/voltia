import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import { percent } from "../../utils/format";
import { useDashboard } from "../../hooks/useDashboard";
import { aggregate, periods } from "../../domain/data";

export function AlertList({ limit }: { limit?: number }) {
  const {
    path,
    filters,
    setDetail,
    alertStates,
    setAlertStates,
    alertFilter,
    rows,
    alertList,
  } = useDashboard();
  const filtered = alertList.filter(
    (a) =>
      alertFilter === "all" ||
      (alertStates[`${a.id}-${filters.period}`] || "Abierta") === alertFilter,
  );
  return (
    <div className="px-6 pb-3">
      {filtered.slice(0, limit ?? filtered.length).map((a) => (
        <article
          className="flex items-center gap-3 border-t border-slate-100 py-4 [&>div]:min-w-0 [&>div]:flex-1 [&_p]:mt-1 [&_p]:text-[11px] [&_p]:text-slate-500 [&_select]:max-w-28 [&_select]:text-[11px]"
          key={a.id}
        >
          <span
            className={`flex rounded-xl bg-amber-50 p-2.5 text-amber-600 ${a.severity === "Crítica" ? "bg-rose-50! text-rose-600!" : ""}`}
          >
            <Icon name="bell" />
          </span>
          <div>
            <button
              className="inline-flex cursor-pointer justify-start border-0 bg-transparent p-0 text-left text-xs font-medium text-slate-700 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
              onClick={() =>
                setDetail({
                  title: a.title,
                  content: (
                    <>
                      <Badge kind="warning">{a.severity}</Badge>
                      <h3 className="text-sm font-medium text-slate-700">
                        {a.asset} · {a.country}
                      </h3>
                      <p className="text-slate-500">{a.description}</p>
                      <p className="text-slate-500">
                        Fuente: {a.source} · Activo: {a.id}
                      </p>
                      <p className="text-slate-500">
                        Registro: {a.id}-
                        {filters.period === "all"
                          ? periods.at(-1)
                          : filters.period}{" "}
                        · Ingesta UTC: {a.date}
                      </p>
                      {a.id === "CO-03" && (
                        <p className="text-slate-500">
                          Disponibilidad asociada:{" "}
                          {percent(
                            aggregate(rows.filter((r) => r.assetId === a.id))
                              .availability,
                          )}
                          . Umbral hipotético de disponibilidad: 95%.
                        </p>
                      )}
                      <p className="text-slate-500">
                        Umbrales y reglas hipotéticos de demostración, sin
                        carácter oficial.
                      </p>
                    </>
                  ),
                })
              }
            >
              {a.title}
            </button>
            <p className="text-slate-500">
              {a.asset} · {a.country} · {a.value}
            </p>
          </div>
          {path === "/alertas" ? (
            <label className="flex flex-col gap-1 text-[9px] text-slate-500">
              Estado de alerta {a.asset}
              <select
                className="max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                value={alertStates[`${a.id}-${filters.period}`] || "Abierta"}
                onChange={(e) => {
                  const next = {
                    ...alertStates,
                    [`${a.id}-${filters.period}`]: e.target.value,
                  };
                  setAlertStates(next);
                  localStorage.setItem("voltia-alerts", JSON.stringify(next));
                }}
              >
                {["Abierta", "Reconocida", "Resuelta"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          ) : (
            <span className="text-slate-300">↗</span>
          )}
        </article>
      ))}
      {!filtered.length && (
        <div className="flex flex-col items-center gap-3 px-6 py-12 text-center text-xs text-slate-500">
          <Icon name="shield" />
          <p className="text-slate-500">No hay alertas para estos filtros.</p>
        </div>
      )}
    </div>
  );
}
