import { createContext } from "react";
import type { useDashboardState } from "../hooks/useDashboardState";
export const DashboardContext = createContext<ReturnType<
  typeof useDashboardState
> | null>(null);
