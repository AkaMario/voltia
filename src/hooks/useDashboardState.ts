import { navigation } from "../config/navigation";
import { readAlertStates } from "../utils/storage";
import { downloadEnergyCsv } from "../utils/exportCsv";
import { toAppPath, toBrowserPath } from "../utils/routing";
import {
  aggregate,
  alertsFor,
  countries,
  periodLabel,
  periods,
  qualityRows,
  scopeRows,
  type Filters,
  type User,
} from "../domain/data";
import { useEffect, useState, type ReactNode } from "react";

export type DashboardSession = {
  user: User;
  onLogin: (user: User) => void;
  onLogout: () => void;
};
export function useDashboardState({
  user,
  onLogin,
  onLogout,
}: DashboardSession) {
  const [path, setPath] = useState(toAppPath(window.location.pathname)),
    [filters, setFilters] = useState<Filters>({
      country: "all",
      period: "2026-09",
      technology: "all",
    }),
    [mobile, setMobile] = useState(false),
    [detail, setDetail] = useState<{
      title: string;
      content: ReactNode;
    } | null>(null),
    [alertStates, setAlertStates] =
      useState<Record<string, string>>(readAlertStates),
    [sort, setSort] = useState("generation"),
    [descending, setDescending] = useState(true),
    [search, setSearch] = useState(""),
    [alertFilter, setAlertFilter] = useState("all"),
    [reloads, setReloads] = useState(0),
    [reloadTime, setReloadTime] = useState(""),
    [compare, setCompare] = useState<string[]>([]);
  useEffect(() => {
    const handler = () => setPath(toAppPath(window.location.pathname));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  function navigate(next: string) {
    window.history.pushState({}, "", toBrowserPath(next));
    setPath(next);
    setMobile(false);
    setSearch("");
    window.scrollTo(0, 0);
  }
  function login(next: User) {
    onLogin(next);
    setFilters((f) => ({ ...f, country: "all" }));
    setCompare([]);
  }
  const rows = scopeRows(user, filters),
    k = aggregate(rows),
    allowed = countries.filter((c) => user.countries.includes(c.code)),
    alertList = alertsFor(rows),
    activeAlerts = alertList.filter(
      (a) => alertStates[`${a.id}-${filters.period}`] !== "Resuelta",
    ),
    activeNav = navigation.find((n) => n[0] === path),
    operational = !["/proyecto", "/arquitectura", "/power-bi"].includes(path);
  const qRows = qualityRows.filter(
    (q) =>
      user.countries.includes(q.country) &&
      (filters.country === "all" || q.country === filters.country),
  );
  const qValid = qRows.reduce((s, q) => s + q.valid, 0),
    qTotal = qRows.reduce((s, q) => s + q.evaluated, 0);
  const countrySummary = allowed
    .map((c) => ({
      ...c,
      ...aggregate(rows.filter((r) => r.country === c.code)),
    }))
    .filter((c) => rows.some((r) => r.country === c.code));
  const trendRows = scopeRows(user, { ...filters, period: "all" });
  const periodText =
    filters.period === "all"
      ? "Oct 2025 — Sep 2026"
      : periodLabel(filters.period);
  const previous = periods[periods.indexOf(filters.period) - 1],
    prevK = previous
      ? aggregate(scopeRows(user, { ...filters, period: previous }))
      : null;
  const revenueDelta =
    prevK && prevK.revenue
      ? ((k.revenue - prevK.revenue) / prevK.revenue) * 100
      : null;

  return {
    user,
    path,
    setPath,
    filters,
    setFilters,
    mobile,
    setMobile,
    detail,
    setDetail,
    alertStates,
    setAlertStates,
    sort,
    setSort,
    descending,
    setDescending,
    search,
    setSearch,
    alertFilter,
    setAlertFilter,
    reloads,
    setReloads,
    reloadTime,
    setReloadTime,
    compare,
    setCompare,
    rows,
    k,
    allowed,
    alertList,
    activeAlerts,
    activeNav,
    operational,
    qRows,
    qValid,
    qTotal,
    countrySummary,
    trendRows,
    periodText,
    revenueDelta,
    navigate,
    login,
    logout: onLogout,
    exportRows: () => downloadEnergyCsv(rows, filters),
  };
}
