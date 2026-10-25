import { Icon } from "../components/ui/Icon";
import { Panel } from "../components/ui/Panel";
import { useState } from "react";

const architecture = [
  [
    "Fuentes multipaís",
    "ERP · APIs · Excel/CSV",
    "Recibe mediciones, facturas y sesiones de las operaciones locales. Entrega archivos y registros con contratos, unidad, moneda y zona horaria de origen.",
  ],
  [
    "Azure Data Factory",
    "Ingesta y orquestación",
    "Recibe datos de las fuentes mediante conectores. Programa extracciones, reintentos y dependencias; entrega cargas a Bronze y ejecuciones trazables.",
  ],
  [
    "ADLS · Bronze",
    "Datos originales",
    "Recibe las extracciones sin modificar. Conserva originales por fuente, país y fecha para auditoría y reprocesamiento.",
  ],
  [
    "Azure Functions",
    "Python · normalización",
    "Recibe datos Bronze; valida obligatorios, fechas y duplicados; convierte kWh a MWh y moneda a USD. Entrega válidos a Silver y rechazados a cuarentena.",
  ],
  [
    "ADLS · Silver",
    "Datos homologados",
    "Recibe registros normalizados y validados. Entrega conjuntos depurados para la carga analítica explícita a SQL.",
  ],
  [
    "Azure SQL · Gold",
    "Modelo estrella",
    "Recibe datos Silver mediante jobs de carga. Publica hechos y dimensiones al grano acordado, conciliados y sin duplicar magnitudes por joins.",
  ],
  [
    "Power BI",
    "Modelo semántico · Import",
    "Recibe tablas Gold por el conector SQL. Calcula medidas DAX, aplica RLS por usuario y publica informes. Refrescos programados; no es telemetría en tiempo real.",
  ],
];
export default function Architecture() {
  const [step, setStep] = useState(0);
  return (
    <>
      <div className="mb-6 rounded-xl border border-slate-200/60 bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-500">
        Diseño objetivo V1. El mock representa Azure y Power BI; no despliega ni
        monitorea estos servicios.
      </div>
      <Panel
        title="De la fuente a la decisión"
        subtitle="Selecciona cada etapa para recorrer la arquitectura"
      >
        <div className="grid grid-cols-2 gap-3 px-6 pt-2 pb-6 sm:grid-cols-4 2xl:grid-cols-7">
          {architecture.map((a, i) => (
            <button
              key={a[0]}
              className={`relative flex min-h-36 cursor-pointer flex-col items-start justify-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-left hover:bg-emerald-50/40 [&_small]:text-[10px] [&_small]:text-slate-500 [&_strong]:text-xs [&_strong]:font-medium [&>span]:text-[10px] [&>span]:text-slate-500 [&>b]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none ${step === i ? "border-emerald-200! bg-emerald-50! text-emerald-800!" : ""}`}
              onClick={() => setStep(i)}
            >
              <small className="text-[11px]">0{i + 1}</small>
              <Icon name={i === 6 ? "chart" : "layers"} />
              <strong>{a[0]}</strong>
              <span>{a[1]}</span>
              {i < 6 && <b>→</b>}
            </button>
          ))}
        </div>
        <div className="border-t border-slate-100 bg-slate-50/60 p-6 [&_h3]:mb-3 [&_p]:max-w-3xl [&_p]:text-xs [&_p]:leading-7">
          <span className="mb-3 block text-[9px] font-semibold tracking-[.18em] text-slate-500">
            ETAPA 0{step + 1}
          </span>
          <h3 className="text-sm font-medium text-slate-700">
            {architecture[step][0]}
          </h3>
          <p className="text-slate-500">{architecture[step][2]}</p>
          <div className="mt-6 flex gap-3">
            <button
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              Anterior
            </button>
            <button
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
              disabled={step === 6}
              onClick={() => setStep(step + 1)}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </Panel>
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5 [&>article:nth-child(2)]:delay-75 [&>article:nth-child(3)]:delay-150 [&>article:nth-child(4)]:delay-200">
        {[
          ["Entra ID", "Identidades de usuarios y servicios."],
          ["Key Vault", "Secretos e identidades administradas."],
          ["Azure Monitor", "Trazas, fallos y duración de cargas."],
          ["CI/CD + RLS", "Versionado, ambientes y pruebas de permisos."],
        ].map(([title, text]) => (
          <Panel key={title} title={title}>
            <p className="text-slate-500">{text}</p>
          </Panel>
        ))}
      </div>
    </>
  );
}
