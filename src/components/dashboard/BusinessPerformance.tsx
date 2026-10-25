import { Panel } from "../ui/Panel";
import { Metric } from "../ui/Metric";
import { TrendChart } from "./Charts";
import { CountryTable } from "./CountryTable";
import { useDashboard } from "../../hooks/useDashboard";
import { aggregate, fmt } from "../../domain/data";

export function BusinessPerformance({ commercial }: { commercial: boolean }) {
  const { filters, rows, k, allowed, countrySummary, trendRows, revenueDelta } =
    useDashboard();
  return (
    <>
      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Metric
          title={commercial ? "Ingresos normalizados" : "Consumo energético"}
          value={fmt(commercial ? k.revenue : k.consumption)}
          unit={commercial ? "USD" : "MWh"}
          note={
            commercial
              ? "Ingresos locales / tasa local por USD"
              : "Suma del consumo de los activos"
          }
          icon={commercial ? "chart" : "activity"}
        />
        <Metric
          title={commercial ? "Variación mensual" : "Activos con consumo"}
          value={
            commercial
              ? fmt(revenueDelta, 1)
              : String(new Set(rows.map((r) => r.assetId)).size)
          }
          unit={commercial ? (revenueDelta === null ? "" : "%") : "activos"}
          note={
            commercial
              ? "Frente al mes inmediatamente anterior; N/D en agregado anual"
              : "Ámbito autorizado y filtros actuales"
          }
        />
        <Metric
          title={commercial ? "Moneda corporativa" : "Cobertura geográfica"}
          value={commercial ? "USD" : String(countrySummary.length)}
          unit={commercial ? "" : "países"}
          note={
            commercial
              ? "Tipos de cambio hipotéticos, no oficiales"
              : "Registros simulados comparables"
          }
        />
      </div>
      <Panel
        title={commercial ? "Evolución comercial" : "Evolución de consumo"}
        subtitle={`Histórico del ámbito seleccionado · ${commercial ? "USD" : "MWh"}`}
      >
        <TrendChart
          rows={trendRows}
          metric={commercial ? "revenue" : "consumption"}
        />
      </Panel>
      {commercial && (
        <Panel
          collapsible
          title="Normalización de monedas"
          subtitle="Tasas ficticias vigentes en cada periodo de la demo; sin conexión a mercados."
        >
          <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {allowed
              .filter(
                (c) => filters.country === "all" || filters.country === c.code,
              )
              .map((c) => (
                <div
                  className="py-3 [&_small]:text-[11px] [&_small]:text-slate-500 [&_h3]:my-3 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-slate-700 [&_p]:text-[11px]"
                  key={c.code}
                >
                  <small className="text-[11px]">
                    {c.flag} {c.name}
                  </small>
                  <h3 className="text-sm font-medium text-slate-700">
                    1 USD = {fmt(c.rate)} {c.currency}
                  </h3>
                  <p className="text-slate-500">
                    Origen: fixture académico · periodos oct 2025 a sep 2026.
                  </p>
                </div>
              ))}
          </div>
          <h3 className="text-sm font-medium text-slate-700">
            Ingresos por línea de negocio
          </h3>
          <div className="flex flex-wrap gap-8 px-6 pt-3 pb-6 [&>span]:flex [&>span]:flex-col [&>span]:gap-2 [&>span]:text-[11px] [&>span]:text-slate-500 [&_b]:text-base [&_b]:font-medium [&_b]:text-slate-600">
            {["solar", "eolica", "carga"].map((t) => (
              <span key={t}>
                {t === "carga"
                  ? "Movilidad"
                  : t === "eolica"
                    ? "Eólica"
                    : "Solar"}
                <b>
                  {fmt(
                    aggregate(rows.filter((r) => r.technology === t)).revenue,
                  )}{" "}
                  USD
                </b>
              </span>
            ))}
          </div>
        </Panel>
      )}
      <Panel
        collapsible
        title="Detalle por país"
        subtitle="Las sumas coinciden con el total filtrado"
      >
        <CountryTable />
      </Panel>
    </>
  );
}
