import { Icon } from "../ui/Icon";
import { useDashboard } from "../../hooks/useDashboard";
import { periodLabel, periods } from "../../domain/data";

export function DashboardFilters() {
  const { filters, setFilters, setCompare, allowed } = useDashboard();
  return (
    <section
      className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 sm:gap-6 sm:px-6 [&>label]:flex [&>label]:flex-row [&>label]:items-center [&>label]:gap-3 [&>label]:text-slate-500 [&>label>span]:flex [&>label>span]:flex-col [&>label>span]:gap-0.5 [&>label>span]:text-[10px] [&_select]:max-w-44 [&_select]:border-0 [&_select]:bg-transparent [&_select]:p-0 [&_select]:pr-4 [&_select]:text-xs [&_select]:text-slate-600"
      aria-label="Filtros del dashboard"
    >
      <label className="flex flex-col gap-2 text-[11px] text-slate-500">
        <Icon name="globe" size={17} />
        <span>
          País
          <select
            className="max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            value={filters.country}
            onChange={(e) => {
              setFilters({ ...filters, country: e.target.value });
              setCompare([]);
            }}
          >
            <option value="all">
              {allowed.length > 1 ? "Todos los países" : allowed[0].name}
            </option>
            {allowed.length > 1 &&
              allowed.map((c) => (
                <option value={c.code} key={c.code}>
                  {c.name}
                </option>
              ))}
          </select>
        </span>
      </label>
      <label className="flex flex-col gap-2 text-[11px] text-slate-500">
        <Icon name="folder" size={17} />
        <span>
          Periodo
          <select
            className="max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            value={filters.period}
            onChange={(e) => setFilters({ ...filters, period: e.target.value })}
          >
            <option value="all">Últimos 12 meses</option>
            {[...periods].reverse().map((p) => (
              <option value={p} key={p}>
                {periodLabel(p)}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className="flex flex-col gap-2 text-[11px] text-slate-500">
        <Icon name="sun" size={17} />
        <span>
          Tecnología
          <select
            className="max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            value={filters.technology}
            onChange={(e) =>
              setFilters({ ...filters, technology: e.target.value })
            }
          >
            <option value="all">Todas las tecnologías</option>
            <option value="solar">Solar</option>
            <option value="eolica">Eólica</option>
            <option value="carga">Carga eléctrica</option>
          </select>
        </span>
      </label>
      <span className="ml-auto text-right text-[9px] text-slate-500 max-xl:hidden [&>i]:mr-1 [&>b]:font-normal">
        <i className="inline-block size-1.5 shrink-0 rounded-full bg-emerald-500/70" />
        Última carga demo
        <br />
        <b>28 sep 2026 · 11:30 UTC</b>
      </span>
    </section>
  );
}
