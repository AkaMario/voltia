import { Icon } from "../ui/Icon";
import { Brand } from "../ui/Brand";
import { navigation } from "../../config/navigation";
import { useDashboard } from "../../hooks/useDashboard";
import { toBrowserPath } from "../../utils/routing";

export function Sidebar() {
  const { user, path, mobile, activeAlerts, navigate, logout } = useDashboard();
  return (
    <aside
      className={
        mobile
          ? "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200/70 bg-white px-4 pt-8 transition-transform duration-300 max-md:-translate-x-full motion-reduce:transition-none max-md:translate-x-0!"
          : "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200/70 bg-white px-4 pt-8 transition-transform duration-300 max-md:-translate-x-full motion-reduce:transition-none"
      }
    >
      <Brand />
      {/* <div className="mt-9 mb-5 flex items-center justify-between px-3 text-[9px] font-semibold tracking-[.16em] text-slate-500 [&>span]:rounded [&>span]:bg-slate-50 [&>span]:px-2 [&>span]:py-1 [&>span]:text-[8px]">
        WORKSPACE <span>REGIONAL</span>
      </div> */}
      <nav
        className="min-h-0 overflow-y-auto pb-4"
        aria-label="Navegación principal"
      >
        {navigation.slice(0, 8).map(([href, title, icon]) => (
          <a
            key={href}
            href={toBrowserPath(href)}
            className={`my-1 flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-emerald-800 [&>svg]:size-[18px] [&>span]:flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none ${path === href ? "bg-emerald-50! text-emerald-800! font-semibold" : ""}`}
            aria-current={path === href ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              navigate(href);
            }}
          >
            <Icon name={icon} />
            <span>{title}</span>
            {href === "/alertas" && activeAlerts.length > 0 && (
              <b className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                {activeAlerts.length}
              </b>
            )}
          </a>
        ))}
        <details
          className="mt-5 border-t border-slate-100 pt-4 [&>summary]:flex [&>summary]:cursor-pointer [&>summary]:items-center [&>summary]:justify-between [&>summary]:px-3 [&>summary]:py-3 [&>summary]:text-[11px] [&>summary]:text-slate-500 [&>summary]:list-none [&>summary::-webkit-details-marker]:hidden"
          open={navigation.slice(8).some(([href]) => href === path)}
        >
          <summary className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none">
            Plataforma y proyecto <span>⌄</span>
          </summary>
          {navigation.slice(8).map(([href, title, icon]) => (
            <a
              key={href}
              href={toBrowserPath(href)}
              className={`my-1 flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-emerald-800 [&>svg]:size-[18px] [&>span]:flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none ${path === href ? "bg-emerald-50! text-emerald-800! font-semibold" : ""}`}
              aria-current={path === href ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                navigate(href);
              }}
            >
              <Icon name={icon} />
              <span>{title}</span>
            </a>
          ))}
        </details>
      </nav>
      <div className="mt-auto">
        {/* <div className="flex items-center gap-3 border-t border-slate-100 px-3 py-5 text-[11px] text-slate-500 [&_small]:mt-1 [&_small]:block [&_small]:text-[10px] [&_small]:text-slate-500">
          <Icon name="layers" />
          <div>
            Azure + Power BI
            <small className="text-[11px]">Arquitectura objetivo V1</small>
          </div>
        </div> */}
        <div className="-mx-4 flex items-center gap-3 border-t border-slate-100 px-4 py-5 [&>div]:min-w-0 [&>div]:flex-1 [&_b]:block [&_b]:text-[11px] [&_b]:font-medium [&_small]:block [&_small]:text-[10px] [&_small]:text-slate-500 [&>button]:border-0 [&>button]:p-1.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700">
            {user.name
              .split(" ")
              .slice(0, 2)
              .map((s) => s[0])
              .join("")}
          </span>
          <div>
            <b>{user.name}</b>
            <small className="text-[11px]">{user.role}</small>
          </div>
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            onClick={() => {
              logout();
            }}
          >
            <Icon name="logout" size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
