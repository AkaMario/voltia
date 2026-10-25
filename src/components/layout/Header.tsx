import { Icon } from "../ui/Icon";
import { useDashboard } from "../../hooks/useDashboard";
import { users } from "../../domain/data";

export function Header() {
  const { user, mobile, setMobile, activeNav, navigate, login } =
    useDashboard();
  return (
    <header className="flex h-[72px] items-center justify-between gap-3 border-b border-slate-200/70 bg-white px-5 sm:px-8 lg:px-10 [&>div]:flex [&>div]:items-center [&>div]:gap-3">
      <div>
        <button
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-500 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
          aria-label="Abrir menú"
          onClick={() => setMobile(!mobile)}
        >
          <Icon name="menu" />
        </button>
        <span className="text-xs text-slate-500 [&>span]:mx-3 [&>span]:text-slate-300 [&>b]:font-normal [&>b]:text-slate-500 max-sm:[&>b]:hidden">
          EnergyView <span>/</span>{" "}
          <b>{activeNav?.[1] || "Página no encontrada"}</b>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex flex-row items-center gap-2 text-[10px] text-slate-500 max-sm:text-[0px] [&>select]:max-w-40 [&>select]:border-0 [&>select]:bg-transparent [&>select]:p-1.5 [&>select]:text-xs [&>select]:text-slate-600">
          <select
            className="max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            aria-label="Cambiar perfil demo"
            value={user.id}
            onChange={(e) => login(users.find((u) => u.id === e.target.value)!)}
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.role}
                {u.id.startsWith("gerente") ? ` · ${u.countries[0]}` : ""}
              </option>
            ))}
          </select>
        </label>
        <button
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
          aria-label="Abrir centro de alertas"
          onClick={() => navigate("/alertas")}
        >
          <Icon name="bell" />
        </button>
      </div>
    </header>
  );
}
