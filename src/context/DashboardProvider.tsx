import type { ReactNode } from "react";
import { DashboardContext } from "./DashboardContext";
import {
  useDashboardState,
  type DashboardSession,
} from "../hooks/useDashboardState";
export function DashboardProvider({
  children,
  ...session
}: DashboardSession & { children: ReactNode }) {
  const value = useDashboardState(session);
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
