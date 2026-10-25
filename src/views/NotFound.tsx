import { Panel } from "../components/ui/Panel";
import { useDashboard } from "../hooks/useDashboard";

export default function NotFound() {
  const { navigate } = useDashboard();
  return (
    <Panel title="Página no encontrada">
      <button
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
        onClick={() => navigate("/")}
      >
        Volver al resumen
      </button>
    </Panel>
  );
}
