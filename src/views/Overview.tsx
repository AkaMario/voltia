import { Icon } from "../components/ui/Icon";
import { Panel } from "../components/ui/Panel";
import { Metric } from "../components/ui/Metric";
import { TrendChart, MixChart } from "../components/dashboard/Charts";
import { CountryTable } from "../components/dashboard/CountryTable";
import { percent } from "../utils/format";
import { useDashboard } from "../hooks/useDashboard";
import { fmt } from "../domain/data";

export default function Overview() {
  const {
    rows,
    k,
    activeAlerts,
    countrySummary,
    trendRows,
    periodText,
    revenueDelta,
    navigate,
  } = useDashboard();
  return (
    <>
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5 [&>article:nth-child(2)]:delay-75 [&>article:nth-child(3)]:delay-150 [&>article:nth-child(4)]:delay-200">
        <Metric
          title="Generación renovable"
          value={fmt(k.generation)}
          unit="MWh"
          note={`${percent(k.compliance)} de la generación esperada`}
          icon="sun"
        />
        <Metric
          title="Consumo energético"
          value={fmt(k.consumption)}
          unit="MWh"
          note={`${countrySummary.length} países en el ámbito seleccionado`}
          icon="activity"
        />
        <Metric
          title="Ingresos comerciales"
          value={fmt(k.revenue)}
          unit="USD"
          note={
            revenueDelta === null
              ? "Variación mensual: N/D"
              : `${revenueDelta >= 0 ? "+" : ""}${fmt(revenueDelta, 1)}% vs. mes anterior`
          }
          icon="chart"
        />
        <Metric
          title="Emisiones evitadas estimadas"
          value={fmt(k.emissions, 1)}
          unit="tCO₂e"
          note="Factor hipotético · no certificación ambiental"
          icon="shield"
        />
      </div>
      <div className="grid grid-cols-1 gap-x-6 xl:grid-cols-[minmax(0,1.85fr)_minmax(260px,1fr)]">
        <Panel
          title="Generación real vs. esperada"
          subtitle="Histórico de 12 meses · mismo país y tecnología"
          action={
            <div className="flex gap-4 text-[10px] text-slate-500 [&>span]:flex [&>span]:items-center [&>span]:gap-1.5">
              <span>
                <i className="inline-block size-2 shrink-0 rounded-full bg-[#147d60]" />
                Real
              </span>
              <span>
                <i className="inline-block w-3 border-t-2 border-dashed border-slate-300" />
                Esperada
              </span>
            </div>
          }
        >
          <TrendChart rows={trendRows} />
        </Panel>
        <Panel title="Mix de energía" subtitle={periodText}>
          <MixChart rows={rows} />
        </Panel>
      </div>
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200/70 bg-white px-6 py-5 text-left text-emerald-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50/30 [&>span]:flex-1 [&>span]:text-xs [&>span]:font-medium [&>span]:text-slate-700 [&_small]:mt-1 [&_small]:block [&_small]:text-[11px] [&_small]:font-normal [&_small]:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
          onClick={() => navigate("/movilidad")}
        >
          <Icon name="charge" />
          <span>
            Movilidad eléctrica
            <small className="text-[11px]">
              {fmt(k.sessions)} sesiones · {percent(k.utilization)} de
              utilización
            </small>
          </span>
          <Icon name="arrow" size={17} />
        </button>
        <button
          className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200/70 bg-white px-6 py-5 text-left text-emerald-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50/30 [&>span]:flex-1 [&>span]:text-xs [&>span]:font-medium [&>span]:text-slate-700 [&_small]:mt-1 [&_small]:block [&_small]:text-[11px] [&_small]:font-normal [&_small]:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
          onClick={() => navigate("/alertas")}
        >
          <Icon name="bell" />
          <span>
            Centro de alertas
            <small className="text-[11px]">
              {activeAlerts.length} alertas activas en tu ámbito
            </small>
          </span>
          <Icon name="arrow" size={17} />
        </button>
      </div>
      <Panel
        collapsible
        title="Resultados por país"
        subtitle={`Detalle de ${periodText} · unidades normalizadas`}
      >
        <CountryTable />
      </Panel>
    </>
  );
}
