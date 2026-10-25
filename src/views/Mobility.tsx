import { Panel } from "../components/ui/Panel";
import { Metric } from "../components/ui/Metric";
import { TrendChart } from "../components/dashboard/Charts";
import { AssetTable } from "../components/dashboard/AssetTable";
import { useDashboard } from "../hooks/useDashboard";
import { fmt } from "../domain/data";

export default function Mobility() {
  const { rows, k, trendRows } = useDashboard();
  return (
    <>
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5 [&>article:nth-child(2)]:delay-75 [&>article:nth-child(3)]:delay-150 [&>article:nth-child(4)]:delay-200">
        <Metric
          title="Energía suministrada"
          value={fmt(k.energy, 1)}
          unit="MWh"
          note="kWh entregados / 1.000"
          icon="charge"
        />
        <Metric
          title="Sesiones de carga"
          value={fmt(k.sessions)}
          unit="sesiones"
          note="Agregado de estaciones del periodo"
        />
        <Metric
          title="Utilización"
          value={fmt(k.utilization, 1)}
          unit={k.utilization === null ? "" : "%"}
          note="Horas ocupadas / disponibles"
          icon="chart"
        />
        <Metric
          title="Estaciones"
          value={String(
            new Set(
              rows
                .filter((r) => r.technology === "carga")
                .map((r) => r.assetId),
            ).size,
          )}
          unit="estaciones"
          note="Con registros dentro del filtro"
          icon="layers"
        />
      </div>
      <Panel
        collapsible
        title="Evolución de energía de carga"
        subtitle="Histórico del ámbito seleccionado · MWh"
      >
        <TrendChart rows={trendRows} metric="energy" />
      </Panel>
      <Panel
        title="Red de movilidad eléctrica"
        subtitle="Horas, sesiones y ocupación coherentes con las estaciones"
      >
        <AssetTable mode="mobility" />
      </Panel>
    </>
  );
}
