import { Panel } from "../components/ui/Panel";
import { CountryTable } from "../components/dashboard/CountryTable";
import { useDashboard } from "../hooks/useDashboard";
import { fmt } from "../domain/data";

export default function Countries() {
  const { compare, setCompare, countrySummary } = useDashboard();
  return (
    <>
      <Panel
        title="Comparativo de desempeño"
        subtitle="Selecciona hasta dos países para contrastar su generación"
      >
        <div className="flex flex-wrap gap-3 px-6 pb-2">
          {countrySummary.map((c) => (
            <button
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-500 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none ${compare.includes(c.code) ? "border-emerald-200! bg-emerald-50! text-emerald-800!" : ""}`}
              key={c.code}
              aria-pressed={compare.includes(c.code)}
              onClick={() =>
                setCompare(
                  compare.includes(c.code)
                    ? compare.filter((x) => x !== c.code)
                    : [...compare.slice(-1), c.code],
                )
              }
            >
              {c.flag} {c.name}
            </button>
          ))}
        </div>
        <div className="px-6 py-5">
          {countrySummary
            .filter((c) => !compare.length || compare.includes(c.code))
            .map((c) => (
              <div
                className="my-5 flex items-center gap-5 text-xs [&>span]:w-28 [&>div]:h-5 [&>div]:flex-1 [&>div]:overflow-hidden [&>div]:rounded-lg [&>div]:bg-slate-50 [&_i]:block [&_i]:h-full [&_i]:rounded-lg [&_i]:bg-emerald-700/65 [&>strong]:w-28 [&>strong]:text-[11px] [&>strong]:font-medium max-sm:gap-2 max-sm:[&>span]:w-20 max-sm:[&>strong]:w-24"
                key={c.code}
              >
                <span>
                  {c.flag} {c.name}
                </span>
                <div>
                  <i
                    style={{
                      width: `${(c.generation / Math.max(1, ...countrySummary.map((c) => c.generation))) * 100}%`,
                    }}
                  />
                </div>
                <strong>{fmt(c.generation)} MWh</strong>
              </div>
            ))}
        </div>
      </Panel>
      <Panel
        title="Indicadores por país"
        subtitle="Ordena las columnas o abre el detalle de un país"
      >
        <CountryTable />
      </Panel>
    </>
  );
}
