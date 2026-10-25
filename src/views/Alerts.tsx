import { Panel } from "../components/ui/Panel";
import { Metric } from "../components/ui/Metric";
import { AlertList } from "../components/dashboard/AlertList";
import { useDashboard } from "../hooks/useDashboard";

export default function Alerts() {
  const { alertFilter, setAlertFilter, alertList, activeAlerts } =
    useDashboard();
  return (
    <>
      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Metric
          title="Alertas activas"
          value={String(activeAlerts.length)}
          unit="alertas"
          note="Abiertas y reconocidas dentro del filtro"
          icon="bell"
        />
        <Metric
          title="Generación bajo meta"
          value={String(
            alertList.filter(
              (a) => a.title === "Generación por debajo de la meta",
            ).length,
          )}
          unit="activos"
          note="Umbral demo: cumplimiento menor al 90%"
        />
        <Metric
          title="Estaciones subutilizadas"
          value={String(
            alertList.filter((a) => a.title === "Estación subutilizada").length,
          )}
          unit="estaciones"
          note="Umbral demo: utilización menor al 25%"
          icon="charge"
        />
      </div>
      <Panel
        title="Alertas operativas"
        subtitle="Selecciona una alerta para ver su origen y acción sugerida"
        action={
          <label className="flex flex-col gap-2 text-[11px] text-slate-500">
            Estado{" "}
            <select
              className="max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              value={alertFilter}
              onChange={(e) => setAlertFilter(e.target.value)}
            >
              {["all", "Abierta", "Reconocida", "Resuelta"].map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "Todos" : s}
                </option>
              ))}
            </select>
          </label>
        }
      >
        <AlertList />
      </Panel>
    </>
  );
}
