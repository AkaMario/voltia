import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard requiere DashboardProvider");
  return context;
}
