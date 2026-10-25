import { Icon } from "../ui/Icon";
import { PageTransition } from "../ui/LoadingState";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { DashboardFilters } from "./DashboardFilters";
import { DetailDialog } from "../ui/DetailDialog";
import { useDashboard } from "../../hooks/useDashboard";
import { type ReactNode } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const {
    user,
    path,
    filters,
    mobile,
    setMobile,
    reloads,
    // allowed,
    activeNav,
    operational,
    exportRows,
  } = useDashboard();
  return (
    <div className="flex min-h-screen bg-[#f6f8f7] text-slate-700">
      <a
        href="#main"
        className="fixed -top-24 left-3 z-50 rounded-xl bg-white p-3 text-sm shadow-sm focus:top-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
      >
        Saltar al contenido
      </a>
      {mobile && (
        <button
          className="fixed inset-0 z-30 cursor-pointer border-0 bg-slate-900/30 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
          aria-label="Cerrar menú"
          onClick={() => setMobile(false)}
        />
      )}
      <Sidebar />
      <div className="min-w-0 flex-1 md:ml-60">
        <Header />
        <main
          className="mx-auto max-w-[1600px] px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10"
          id="main"
        >
          <div className="mb-7 flex items-center justify-between gap-4 [&_p]:mt-2 [&_p]:text-xs [&_p]:text-slate-500">
            <div>
              <h1 className="text-[25px] font-semibold leading-tight tracking-tight text-slate-800 sm:text-[28px]">
                {activeNav?.[1] || "Página no encontrada"}
              </h1>
              <p className="text-slate-500">
                {path === "/"
                  ? "El pulso de nuestra operación, de lo global a lo local."
                  : "Información conectada para tomar mejores decisiones."}
              </p>
            </div>
            {operational && (
              <button
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 max-sm:text-[0px] max-sm:gap-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
                onClick={exportRows}
              >
                <Icon name="download" size={17} /> Exportar CSV
              </button>
            )}
          </div>
          {/* <div className="mb-5 flex items-center justify-between gap-3 text-[10px] text-slate-500 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>small]:text-[10px] max-lg:[&>small]:hidden">
            <span>
              <i className="inline-block size-1.5 shrink-0 rounded-full bg-emerald-500/70" />
              Datos simulados con fines académicos
            </span>
            <small className="text-[11px]">
              {user.countries.length === 1
                ? `Ámbito demo: ${allowed[0].name}`
                : "Demostración multipaís"}{" "}
              · Mock web de Azure + Power BI
            </small>
          </div> */}
          {operational && <DashboardFilters />}
          <PageTransition
            layout={
              path === "/power-bi"
                ? "report"
                : ["/activos", "/alertas", "/calidad", "/paises"].includes(path)
                  ? "table"
                  : "overview"
            }
            key={`${user.id}:${path}:${operational ? `${filters.country}:${filters.period}:${filters.technology}` : ""}:${path === "/calidad" ? reloads : ""}`}
          >
            {children}
          </PageTransition>
          <footer className="mt-8 flex flex-wrap justify-between gap-3 border-t border-slate-200/70 py-6 text-[10px] text-slate-500 [&>span>span]:px-2">
            <span>
              © 2026 VOLTIA EnergyView <span>·</span> Grupo 6
            </span>
            <span>
              Mock académico · Sin conexión productiva a Azure o Power BI
            </span>
          </footer>
        </main>
      </div>
      <DetailDialog />
    </div>
  );
}
