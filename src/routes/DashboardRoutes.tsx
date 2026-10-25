import { lazy, Suspense } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { DashboardSkeleton } from "../components/ui/LoadingState";
import Overview from "../views/Overview";
import Countries from "../views/Countries";
import Generation from "../views/Generation";
import Consumption from "../views/Consumption";
import Mobility from "../views/Mobility";
import Commercial from "../views/Commercial";
import Assets from "../views/Assets";
import Alerts from "../views/Alerts";
import DataQuality from "../views/DataQuality";
import Architecture from "../views/Architecture";
import Project from "../views/Project";
import NotFound from "../views/NotFound";
const PowerBI = lazy(() => import("../views/PowerBI"));
export function DashboardRoutes() {
  const { path } = useDashboard();
  switch (path) {
    case "/":
      return <Overview />;
    case "/paises":
      return <Countries />;
    case "/generacion":
      return <Generation />;
    case "/consumo":
      return <Consumption />;
    case "/movilidad":
      return <Mobility />;
    case "/comercial":
      return <Commercial />;
    case "/activos":
      return <Assets />;
    case "/alertas":
      return <Alerts />;
    case "/calidad":
      return <DataQuality />;
    case "/arquitectura":
      return <Architecture />;
    case "/proyecto":
      return <Project />;
    case "/power-bi":
      return (
        <Suspense fallback={<DashboardSkeleton report />}>
          <PowerBI />
        </Suspense>
      );
    default:
      return <NotFound />;
  }
}
