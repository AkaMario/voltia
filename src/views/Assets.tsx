import { Panel } from "../components/ui/Panel";
import { AssetTable } from "../components/dashboard/AssetTable";

export default function Assets() {
  return (
    <Panel
      title="Inventario de activos"
      subtitle="24 activos simulados · 6 por país; el listado respeta los filtros"
    >
      <AssetTable mode="all" />
    </Panel>
  );
}
