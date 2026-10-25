import { Panel } from "../components/ui/Panel";
import { Metric } from "../components/ui/Metric";
import { TrendChart, MixChart } from "../components/dashboard/Charts";
import { AssetTable } from "../components/dashboard/AssetTable";
import { useDashboard } from "../hooks/useDashboard";
import { fmt } from "../domain/data";

export default function Generation() {
  const { rows, k, trendRows } = useDashboard();
  return (
    <>
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5 [&>article:nth-child(2)]:delay-75 [&>article:nth-child(3)]:delay-150 [&>article:nth-child(4)]:delay-200">
        <Metric
          title="Generación renovable"
          value={fmt(k.generation)}
          unit="MWh"
          note="Suma de plantas solares y eólicas"
          icon="sun"
        />
        <Metric
          title="Generación esperada"
          value={fmt(k.expected)}
          unit="MWh"
          note="Meta hipotética del periodo"
        />
        <Metric
          title="Cumplimiento"
          value={fmt(k.compliance, 1)}
          unit={k.compliance === null ? "" : "%"}
          note="Real / esperada × 100"
          icon="chart"
        />
        <Metric
          title="Disponibilidad"
          value={fmt(k.availability, 1)}
          unit={k.availability === null ? "" : "%"}
          note="Horas operativas / programadas"
          icon="shield"
        />
      </div>
      <div className="grid grid-cols-1 gap-x-6 xl:grid-cols-[minmax(0,1.85fr)_minmax(260px,1fr)]">
        <Panel
          title="Producción y objetivo"
          subtitle="Histórico completo del ámbito seleccionado · MWh"
        >
          <TrendChart rows={trendRows} />
        </Panel>
        <Panel
          title="Mix de generación"
          subtitle="Participación por tecnología"
        >
          <MixChart rows={rows} />
        </Panel>
      </div>
      <Panel
        collapsible
        title="Desempeño por planta"
        subtitle="Selecciona una planta para abrir su ficha"
      >
        <AssetTable mode="generation" />
      </Panel>
    </>
  );
}
