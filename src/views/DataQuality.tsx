import { Panel } from "../components/ui/Panel";
import { Badge } from "../components/ui/Badge";
import { Metric } from "../components/ui/Metric";
import { useDashboard } from "../hooks/useDashboard";
import { fmt, ratio, type RecordRow } from "../domain/data";

export default function DataQuality() {
  const {
    user,
    filters,
    reloads,
    setReloads,
    reloadTime,
    setReloadTime,
    qRows,
    qValid,
    qTotal,
  } = useDashboard();
  return (
    <>
      <div className="mb-6 rounded-xl border border-slate-200/60 bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-500">
        Cargas simuladas del 28/09/2026, independientes del periodo energético.
        Una fuente fallida puede conservar datos de una carga anterior. El
        filtro de tecnología no aplica a los pipelines.
      </div>
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5 [&>article:nth-child(2)]:delay-75 [&>article:nth-child(3)]:delay-150 [&>article:nth-child(4)]:delay-200">
        <Metric
          title="Calidad de registros"
          value={fmt(ratio(qValid, qTotal), 1)}
          unit="%"
          note="Válidos / evaluados · última carga"
          icon="shield"
        />
        <Metric
          title="Registros evaluados"
          value={fmt(qTotal)}
          unit="filas"
          note="Fuentes dentro del ámbito autorizado"
        />
        <Metric
          title="Registros rechazados"
          value={fmt(qTotal - qValid)}
          unit="filas"
          note="Incluye cargas fallidas"
          icon="bell"
        />
        <Metric
          title="Recargas simuladas"
          value={fmt(reloads)}
          unit="eventos"
          note={reloadTime || "No se ejecutó ninguna recarga"}
          icon="flow"
        />
      </div>
      <Panel
        title="Operación de datos"
        subtitle="Estado de integración ficticio"
        action={
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
            onClick={() => {
              setReloads(reloads + 1);
              setReloadTime(new Date().toISOString());
            }}
          >
            ↻ Simular recarga
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse whitespace-nowrap text-left text-xs tabular-nums">
            <thead>
              <tr className="transition-colors hover:bg-slate-50/50">
                <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                  Fuente
                </th>
                <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                  País
                </th>
                <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                  Evaluados
                </th>
                <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                  Válidos
                </th>
                <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                  Rechazados
                </th>
                <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                  Estado
                </th>
                <th className="border-y border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-medium text-slate-500 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-[10px] [&>button]:text-slate-500">
                  Última ejecución UTC
                </th>
              </tr>
            </thead>
            <tbody>
              {qRows.map((q) => (
                <tr
                  className="transition-colors hover:bg-slate-50/50"
                  key={q.country}
                >
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    {q.source}
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    {q.country}
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    {fmt(q.evaluated)}
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    {fmt(q.valid)}
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    {fmt(q.rejected)}
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    <Badge
                      kind={
                        q.status === "Fallida"
                          ? "danger"
                          : q.status === "Advertencia"
                            ? "warning"
                            : ""
                      }
                    >
                      {q.status}
                    </Badge>
                  </td>
                  <td className="border-b border-slate-100/70 px-6 py-4 text-xs text-slate-500 [&_b]:font-medium [&_b]:text-slate-600">
                    {reloadTime || q.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {reloads > 0 && (
          <p className="mb-6 rounded-xl border border-slate-200/60 bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-500">
            Recarga #{reloads} simulada: se actualizó la hora del intento. Los
            rechazos persisten para revisión; no se llamó a Azure ni se
            alteraron KPI.
          </p>
        )}
      </Panel>
      <Panel
        collapsible
        title="Cuarentena y transformaciones"
        subtitle="Ejemplos aislados de validación, no sumados a los hechos energéticos"
      >
        <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            [
              "DUPLICATE_ID",
              "CO",
              "CO-03-2026-09",
              "Clave repetida: se conserva un solo registro válido.",
            ],
            [
              "INVALID_DATE",
              "CR",
              "2026-13-40",
              "Fecha inexistente: registro rechazado antes de calcular el periodo.",
            ],
            [
              "UNIT_NORMALIZED",
              "CL",
              "1250000 kWh → 1250 MWh",
              "Conversión válida dividiendo entre 1.000.",
            ],
          ]
            .filter(
              ([, c]) =>
                user!.countries.includes(c as RecordRow["country"]) &&
                (filters.country === "all" || filters.country === c),
            )
            .map(([code, country, value, text]) => (
              <div
                className="rounded-xl border border-slate-100 p-5 [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-xs [&_p]:text-[11px]"
                key={code}
              >
                <Badge kind={code === "UNIT_NORMALIZED" ? "" : "warning"}>
                  {code}
                </Badge>
                <h3 className="text-sm font-medium text-slate-700">
                  {country} · {value}
                </h3>
                <p className="text-slate-500">{text}</p>
              </div>
            ))}
        </div>
      </Panel>
    </>
  );
}
