import { useState } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { DashboardSkeleton } from "../components/ui/LoadingState";

type EmbedConfig = { reportId: string; embedUrl: string; accessToken: string };
export default function PowerBI() {
  const [config, setConfig] = useState<EmbedConfig | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <section className="mb-7 min-w-0 overflow-hidden rounded-2xl border border-slate-200/70 bg-white [&>p]:px-6 [&>p]:pb-6 [&>p]:text-xs [&>h3]:px-6 [&>h3]:py-4 [&>.grid]:px-6 [&>.grid]:pb-6">
      <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-5 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-slate-700 [&_p]:mt-1.5 [&_p]:text-[11px] [&_p]:text-slate-500">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-700">
            Power BI · SDK oficial de Microsoft
          </h2>
          <p className="text-slate-500">
            Integración con powerbi-client-react y powerbi-client
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
          {config
            ? loading
              ? "Cargando informe"
              : error
                ? "Revisar conexión"
                : "Informe conectado"
            : "Pendiente de conexión"}
        </span>
      </div>
      {!config ? (
        <>
          <div className="mb-6 rounded-xl border border-slate-200/60 bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-500">
            La demo local funciona sin conexión. Esta vista usa el motor real de
            Power BI al conectar un informe publicado. El login mock no autoriza
            el acceso a Power BI.
          </div>
          <form
            className="flex max-w-3xl flex-col gap-5 px-6 pb-6 [&_p]:text-[11px] [&>button]:self-start"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const url = String(data.get("embedUrl"));
              try {
                const parsed = new URL(url);
                if (
                  parsed.protocol !== "https:" ||
                  parsed.hostname !== "app.powerbi.com" ||
                  parsed.pathname !== "/reportEmbed"
                )
                  throw new Error();
                setError("");
                setLoading(true);
                setConfig({
                  reportId: String(data.get("reportId")),
                  embedUrl: url,
                  accessToken: String(data.get("token")),
                });
                e.currentTarget.reset();
              } catch {
                setError(
                  "Usa una URL de inserción válida: https://app.powerbi.com/reportEmbed?...",
                );
              }
            }}
          >
            <label className="flex flex-col gap-2 text-[11px] text-slate-500">
              ID del informe
              <input
                className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                name="reportId"
                required
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                pattern="[0-9a-fA-F-]{36}"
              />
            </label>
            <label className="flex flex-col gap-2 text-[11px] text-slate-500">
              URL de inserción
              <input
                className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                type="url"
                name="embedUrl"
                required
                placeholder="https://app.powerbi.com/reportEmbed?..."
              />
            </label>
            <label className="flex flex-col gap-2 text-[11px] text-slate-500">
              Embed token temporal
              <input
                className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                type="password"
                name="token"
                required
                autoComplete="off"
                placeholder="Solo en memoria durante esta sesión"
              />
            </label>
            <p className="text-slate-500">
              Conexión manual para desarrollo. Usa un embed token con RLS
              emitido por un backend autorizado. No uses secretos de aplicación
              ni tokens de Entra en este formulario. Los filtros del mock no se
              aplican a este informe; su alcance depende del token y del modelo
              publicado.
            </p>
            <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-800 bg-emerald-800 px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none">
              Conectar informe
            </button>
          </form>
        </>
      ) : (
        <>
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
            onClick={() => {
              setConfig(null);
              setLoading(false);
              setError("");
            }}
          >
            Desconectar informe
          </button>
          <div className="relative" aria-busy={loading}>
            {loading && (
              <div className="absolute inset-0 z-10 rounded-2xl bg-white p-4">
                <DashboardSkeleton report />
              </div>
            )}
            <PowerBIEmbed
              embedConfig={{
                type: "report",
                id: config.reportId,
                embedUrl: config.embedUrl,
                accessToken: config.accessToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: { visible: true },
                    pageNavigation: { visible: true },
                  },
                },
              }}
              cssClassName="h-[680px] w-full p-4 [&>iframe]:size-full [&>iframe]:border-0"
              eventHandlers={
                new Map([
                  ["rendered", () => setLoading(false)],
                  [
                    "error",
                    () => {
                      setLoading(false);
                      setError(
                        "Power BI no pudo cargar el informe. Verifica permisos, token vigente y configuración de inserción.",
                      );
                    },
                  ],
                ])
              }
            />
          </div>
        </>
      )}
      {error && (
        <p role="alert" className="py-3 text-xs text-rose-600">
          {error}
        </p>
      )}
    </section>
  );
}
