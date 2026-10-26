import { Icon } from "../components/ui/Icon";
import { Brand } from "../components/ui/Brand";
// import { Badge } from "../components/ui/Badge";
import { countries, DEMO_PASSWORD, users, type User } from "../domain/data";
import { useState } from "react";

export default function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState("ceo@voltia.demo"),
    [password, setPassword] = useState(""),
    [error, setError] = useState(""),
    [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_1fr]">
      <section className="relative flex min-h-60 flex-col overflow-hidden bg-emerald-950 p-7 text-white sm:p-10 lg:min-h-screen lg:p-14 [&_.text-emerald-950]:text-white [&>small]:relative [&>small]:z-10 [&>small]:mt-auto [&>small]:pt-40 [&>small]:text-[10px] [&>small]:text-emerald-100/40 max-lg:[&>small]:hidden">
        <Brand />
        <div className="relative z-10 mt-10 max-w-xl lg:mt-24 [&_h1]:text-[clamp(32px,4.3vw,64px)] [&_h1]:leading-[1.16] [&_h1]:font-normal [&_h1]:tracking-[-.04em] [&_h1]:text-white [&_em]:text-lime-200 [&_em]:not-italic [&_p]:mt-7 [&_p]:max-w-80 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-emerald-100/55 max-lg:[&_p]:hidden max-lg:[&_br]:hidden">
          <span className="mb-3 block text-[9px] font-semibold tracking-[.18em] text-slate-500">
            ENERGÍA CON PERSPECTIVA
          </span>
          <h1 className="text-[25px] font-semibold leading-tight tracking-tight text-slate-800 sm:text-[28px]">
            Cuatro países.
            <br />
            Una visión
            <br />
            <em>más inteligente.</em>
          </h1>
          <p className="text-slate-500">
            Transformamos datos en decisiones para una energía que mueve el
            futuro.
          </p>
          <div className="mt-9 flex flex-wrap gap-5 text-[11px] text-emerald-100/60 max-lg:hidden">
            {countries.map((c) => (
              <span key={c.code}>
                {c.flag} {c.name}
              </span>
            ))}
          </div>
        </div>
        <div
          className="pointer-events-none absolute right-0 bottom-20 left-10 h-56 opacity-40 max-lg:hidden"
          aria-hidden="true"
        >
          <div className="absolute right-10 bottom-16 size-64 rounded-full border border-lime-200/30 shadow-[0_0_0_40px_#d9f99d08,0_0_0_80px_#d9f99d05]" />
          <div className="absolute bottom-[-90px] left-0 h-64 w-[90%] rotate-[-10deg] rounded-xl border border-lime-200/30 bg-[repeating-linear-gradient(0deg,transparent,transparent_44px,#d9f99d33_45px,#d9f99d33_46px),repeating-linear-gradient(90deg,#284d37,#284d37_64px,#d9f99d33_65px,#d9f99d33_66px)] [transform:perspective(500px)_rotateX(55deg)_rotateZ(-10deg)]" />
          <div className="absolute right-20 bottom-0 h-48 w-40 border-l-4 border-lime-200/50 [&>span]:absolute [&>span]:-top-24 [&>span]:-left-1 [&>span]:h-24 [&>span]:w-1 [&>span]:bg-lime-200/70 [&>span]:origin-bottom [&>i]:absolute [&>i]:-top-24 [&>i]:-left-1 [&>i]:h-24 [&>i]:w-1 [&>i]:origin-bottom [&>i]:rotate-120 [&>i]:bg-lime-200/70 [&>b]:absolute [&>b]:-top-24 [&>b]:-left-1 [&>b]:h-24 [&>b]:w-1 [&>b]:origin-bottom [&>b]:rotate-240 [&>b]:bg-lime-200/70">
            <span />
            <i />
            <b />
          </div>
        </div>
        <small className="text-[11px]">
          VOLTIA · Torre de Control de Desempeño Energético
        </small>
      </section>
      <section className="flex flex-col items-center justify-center gap-9 px-6 py-10 sm:px-12 lg:p-14 [&>div]:w-full [&>div]:max-w-96 [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:text-[26px] [&_h2]:font-semibold [&_h2]:tracking-tight [&>div>p]:text-xs [&_form]:my-8 [&_form]:flex [&_form]:flex-col [&_form]:gap-5 [&_input]:h-12 [&_input]:w-full [&>small]:text-[10px] [&>small]:text-slate-500 transition-[opacity,transform] duration-700 starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none">
        <div>
          {/* <Badge>ENTORNO ACADÉMICO · MOCK</Badge> */}
          <h2 className="text-base font-semibold tracking-tight text-slate-700">
            Bienvenido a EnergyView
          </h2>
          <p className="text-slate-500">
            Ingresa para explorar el desempeño de nuestra energía.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const user = users.find(
                (u) => u.email === email.trim().toLowerCase(),
              );
              if (!user || password !== DEMO_PASSWORD) {
                setError(
                  "Correo o contraseña demo incorrectos. Consulta las credenciales de abajo.",
                );
                return;
              }
              onLogin(user);
            }}
          >
            <label className="flex flex-col gap-2 text-[11px] text-slate-500">
              Correo electrónico
              <input
                className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@voltia.demo"
              />
            </label>
            <label className="flex flex-col gap-2 text-[11px] text-slate-500">
              Contraseña
              <div className="relative [&>input]:pr-16 [&>button]:absolute [&>button]:top-2 [&>button]:right-2 [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-2 [&>button]:text-[10px]">
                <input
                  className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
            </label>
            {error && (
              <p role="alert" className="py-3 text-xs text-rose-600">
                {error}
              </p>
            )}
            <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-800 bg-emerald-800 px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-emerald-900 h-12 w-full justify-between! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none">
              Ingresar al dashboard <Icon name="arrow" />
            </button>
          </form>
          <details className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-[11px] [&>summary]:cursor-pointer [&>summary]:font-medium [&_p]:my-4 [&_p]:text-[11px] [&_label]:text-[10px] [&_select]:w-full [&_select]:text-[11px] [&>button]:mt-3">
            <summary className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none">
              Credenciales de demostración
            </summary>
            <p className="text-slate-500">
              Contraseña para todos:{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600">
                {DEMO_PASSWORD}
              </code>
            </p>
            <label className="flex flex-col gap-2 text-[11px] text-slate-500">
              Elegir cuenta demo
              <select
                className="max-w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setPassword(DEMO_PASSWORD);
                  setError("");
                }}
              >
                {users.map((u) => (
                  <option key={u.id} value={u.email}>
                    {u.role} · {u.email}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent p-0 text-[11px] font-medium text-emerald-700 transition-colors hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
              onClick={() => setPassword(DEMO_PASSWORD)}
            >
              Completar contraseña demo
            </button>
          </details>
          <p className="mt-6 text-[10px]! leading-5 text-slate-500">
            Datos simulados con fines académicos. Autenticación y permisos
            simulados en el navegador; no constituyen seguridad de producción.
          </p>
        </div>
        <small className="text-[11px]">
          Arquitectura objetivo Azure + Power BI · Grupo 6
        </small>
      </section>
    </div>
  );
}
