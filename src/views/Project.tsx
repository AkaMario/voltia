import { Panel } from "../components/ui/Panel";
import { Badge } from "../components/ui/Badge";
import { Metric } from "../components/ui/Metric";
import { fmt } from "../domain/data";
import { useState } from "react";

export default function Project() {
  const [trm, setTrm] = useState(4100);
  return (
    <>
      <div className="mb-6 rounded-xl border border-slate-200/60 bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-500">
        Escenario futuro simulado al 22/01/2027. Referencia del caso:
        25/10/2026. El avance académico es independiente de los KPI energéticos.
      </div>
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5 [&>article:nth-child(2)]:delay-75 [&>article:nth-child(3)]:delay-150 [&>article:nth-child(4)]:delay-200">
        <Metric
          title="Avance del cronograma"
          value="75"
          unit="%"
          note="Escenario académico de presentación"
          icon="folder"
        />
        <Metric
          title="Actividades"
          value="66"
          unit="tareas"
          note="11 fases · 12 hitos · 89 elementos"
        />
        <Metric
          title="Presupuesto base"
          value="75.000"
          unit="USD"
          note="Inversión autorizada del caso"
          icon="chart"
        />
        <Metric
          title="Horizonte de trabajo"
          value="6"
          unit="meses"
          note="Línea base desde el 10/09/2026"
          icon="folder"
        />
      </div>
      <div className="grid grid-cols-1 gap-x-6 xl:grid-cols-2">
        <Panel
          title="Estado de las actividades"
          subtitle="La fuente no detalla las 66 filas; no se inventan tareas contractuales."
        >
          {[
            ["Completadas", 43, "green"],
            ["En proceso", 3, "blue"],
            ["Atrasadas", 2, "amber"],
            ["Sin iniciar", 18, "gray"],
          ].map(([title, count, color]) => (
            <div
              className="flex items-center gap-4 px-6 py-3 text-xs [&>span]:w-24 [&>div]:h-2 [&>div]:flex-1 [&>div]:overflow-hidden [&>div]:rounded-full [&>div]:bg-slate-100 [&>b]:w-6 [&>b]:font-medium"
              key={title}
            >
              <span>{title}</span>
              <div>
                <i
                  className={
                    (
                      {
                        green: "block h-full rounded-full bg-emerald-600/70",
                        blue: "block h-full rounded-full bg-sky-500/60",
                        amber: "block h-full rounded-full bg-amber-500/60",
                        gray: "block h-full rounded-full bg-slate-300",
                      } as Record<string, string>
                    )[String(color)]
                  }
                  style={{ width: `${(Number(count) / 66) * 100}%` }}
                />
              </div>
              <b>{count}</b>
            </div>
          ))}
          <p className="px-6 pt-4 pb-6 text-[11px] text-slate-500">
            75% es el avance declarado del escenario, no 43/66 ni una medida de
            fuentes integradas.
          </p>
        </Panel>
        <Panel collapsible title="Próximos pasos y cadena crítica">
          <ul className="list-disc space-y-2 px-10 pt-1 pb-6 text-xs leading-6 text-slate-500">
            <li>Conciliación piloto y final · A25</li>
            <li>Estabilizar actualización y alertas · A26 / A27</li>
            <li>Validar medidas KPI y tablero operativo · A33 / A35</li>
            <li>Verificar seguridad y reglas de acceso · A39</li>
            <li>Pruebas finales, capacitación y cierre formal</li>
          </ul>
          <Badge kind="warning">
            Riesgos: calidad · automatización · seguridad
          </Badge>
        </Panel>
      </div>
      <Panel
        collapsible
        title="Hitos de referencia"
        subtitle="Fechas de la línea base; estado narrativo del escenario futuro"
      >
        <div className="grid grid-cols-1 gap-6 px-6 pt-2 pb-6 sm:grid-cols-2 xl:grid-cols-4 [&>div]:border-l-2 [&>div]:border-emerald-100 [&>div]:pl-4 [&_small]:text-[9px] [&_small]:tracking-widest [&_small]:text-slate-500 [&_h3]:my-2 [&_h3]:text-xs [&_p]:text-[10px]">
          {[
            ["30 SEP 2026", "HR01 · Recursos disponibles"],
            ["09 OCT 2026", "H02 · Piloto Colombia aprobado"],
            ["26 OCT 2026", "H03 · Diseño integral aprobado"],
            ["10 DIC 2026", "H04 · Piloto funcional aceptado"],
          ].map(([date, title]) => (
            <div key={title}>
              <small className="text-[11px]">{date}</small>
              <h3 className="text-sm font-medium text-slate-700">{title}</h3>
              <p className="text-slate-500">Referencia del caso académico</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel
        collapsible
        title="Caso de negocio · proyección a 3 años"
        subtitle="Hipótesis del caso; no son gastos ejecutados ni beneficios realizados."
      >
        <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5 [&>article:nth-child(2)]:delay-75 [&>article:nth-child(3)]:delay-150 [&>article:nth-child(4)]:delay-200">
          {[
            ["Costos acumulados", "117.000 USD"],
            ["Beneficios proyectados", "149.058 USD"],
            ["ROI simple proyectado", "27,4%"],
            ["VPN / TIR proyectados", "12.134 USD / 18,1%"],
          ].map(([label, value]) => (
            <div
              className="py-3 [&_small]:text-[11px] [&_small]:text-slate-500 [&_h3]:my-3 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-slate-700 [&_p]:text-[11px]"
              key={label}
            >
              <small className="text-[11px]">{label}</small>
              <h3 className="text-sm font-medium text-slate-700">{value}</h3>
            </div>
          ))}
        </div>
        <label className="mx-6 mb-5 max-w-64">
          TRM simulada USD/COP
          <input
            className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            type="number"
            min="1"
            value={trm}
            onChange={(e) => setTrm(Math.max(1, Number(e.target.value)))}
          />
        </label>
        <p className="text-slate-500">
          Presupuesto base equivalente: <b>{fmt(75000 * trm)} COP</b>. La TRM
          solo convierte la presentación; no altera el ROI en USD. Costos
          recurrentes: 42.000 USD; beneficio neto proyectado: 32.058 USD. VPN
          con descuento del 10%; adopción supuesta 60% / 85% / 100%.
        </p>
      </Panel>
      <Panel collapsible title="Equipo · Grupo 6">
        <div className="flex flex-wrap gap-8 px-6 pt-2 pb-6 [&_strong]:block [&_strong]:text-xs [&_strong]:font-medium [&_small]:mt-1 [&_small]:block [&_small]:text-[11px] [&_small]:text-slate-500">
          {[
            ["Sharick de las Aguas", "Liderazgo del proyecto"],
            ["Justin Castro", "Negocio y requerimientos"],
            ["Mario Uparela", "Arquitectura técnica"],
            ["Leonardo Vergara", "Documentación"],
            ["Jesús Rivera", "Calidad y riesgos"],
          ].map(([name, role]) => (
            <div key={name}>
              <strong>{name}</strong>
              <small className="text-[11px]">{role}</small>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
