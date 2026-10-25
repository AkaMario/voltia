export type Country = "CO" | "CL" | "CR" | "UY";
export const countries: {
  code: Country;
  name: string;
  flag: string;
  currency: string;
  rate: number;
  factor: number;
}[] = [
  {
    code: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    currency: "COP",
    rate: 4100,
    factor: 0.15,
  },
  {
    code: "CL",
    name: "Chile",
    flag: "🇨🇱",
    currency: "CLP",
    rate: 950,
    factor: 0.23,
  },
  {
    code: "CR",
    name: "Costa Rica",
    flag: "🇨🇷",
    currency: "CRC",
    rate: 520,
    factor: 0.08,
  },
  {
    code: "UY",
    name: "Uruguay",
    flag: "🇺🇾",
    currency: "UYU",
    rate: 41,
    factor: 0.1,
  },
];
export const users = [
  {
    id: "ceo",
    name: "Wilson Munive",
    role: "Dirección general",
    email: "ceo@voltia.demo",
    countries: ["CO", "CL", "CR", "UY"] as Country[],
  },
  ...countries.map((c) => ({
    id: `gerente-${c.code}`,
    name: `Gerente ${c.name}`,
    role: "Gerente de país",
    email: `gerente.${c.code.toLowerCase()}@voltia.demo`,
    countries: [c.code],
  })),
  {
    id: "operador",
    name: "Equipo de operaciones",
    role: "Operaciones · Colombia",
    email: "operador@voltia.demo",
    countries: ["CO"] as Country[],
  },
  {
    id: "analista",
    name: "Mario Uparela",
    role: "Analista BI",
    email: "analista@voltia.demo",
    countries: ["CO", "CL", "CR", "UY"] as Country[],
  },
];
export type User = (typeof users)[number];
export const DEMO_PASSWORD = "Voltia2026!";
export const periods = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(Date.UTC(2025, 9 + i, 1));
  return d.toISOString().slice(0, 7);
});
export const periodLabel = (p: string) =>
  new Date(`${p}-02T12:00:00Z`).toLocaleDateString("es-CO", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
const names = [
  [
    "La Guajira",
    "El Paso",
    "Caribe",
    "Alta Guajira",
    "Bogotá Centro",
    "Medellín Norte",
  ],
  [
    "Atacama",
    "El Romero",
    "Punta Sierra",
    "Canela",
    "Santiago Centro",
    "Valparaíso",
  ],
  [
    "Guanacaste",
    "Miravalles",
    "Tilarán",
    "Los Santos",
    "San José Centro",
    "Liberia",
  ],
  [
    "Salto",
    "Paysandú",
    "Sierra de los Caracoles",
    "Valentines",
    "Montevideo Centro",
    "Punta del Este",
  ],
];
export const assets = countries.flatMap((c, ci) =>
  names[ci].map((name, i) => ({
    id: `${c.code}-${String(i + 1).padStart(2, "0")}`,
    country: c.code,
    name,
    technology: i < 2 ? "solar" : i < 4 ? "eolica" : "carga",
    capacity: i < 4 ? 8 + ci * 3 + i * 4 : 0,
  })),
);
export type RecordRow = {
  id: string;
  country: Country;
  assetId: string;
  technology: string;
  period: string;
  generation: number;
  expected: number;
  consumption: number;
  energyKWh: number;
  sessions: number;
  occupied: number;
  available: number;
  operational: number;
  revenueLocal: number;
  rate: number;
  revenue: number;
  emissions: number;
  source: string;
  ingestedAt: string;
};
export const records: RecordRow[] = periods.flatMap((period, mi) =>
  assets.map((a, ai) => {
    const ci = countries.findIndex((c) => c.code === a.country),
      c = countries[ci],
      charging = a.technology === "carga";
    const wave = 1 + Math.sin((mi + ai) * 0.67) * 0.14;
    const expected = charging
      ? 0
      : Math.round((a.capacity * 91 + ci * 170) * wave);
    const generation = Math.round(
      expected * (a.id === "CO-03" ? 0.77 : 0.94 + Math.sin(mi + ai) * 0.09),
    );
    const available =
        new Date(
          Date.UTC(Number(period.slice(0, 4)), Number(period.slice(5)), 0),
        ).getUTCDate() * 24,
      occupied = charging
        ? Math.round(available * (0.18 + ((mi + ai) % 6) * 0.075))
        : 0;
    const energyKWh = charging ? occupied * 94 : 0,
      sessions = charging ? Math.round(energyKWh / 38) : 0;
    const revenueLocal = Math.round(
      (generation * (78 + ci * 4) + energyKWh * 0.21) * c.rate,
    );
    return {
      id: `${a.id}-${period}`,
      country: a.country,
      assetId: a.id,
      technology: a.technology,
      period,
      generation,
      expected,
      consumption: Math.round((charging ? 28 : 155 + ai * 8) * wave),
      energyKWh,
      sessions,
      occupied,
      available,
      operational: Math.round(available * (a.id === "CO-03" ? 0.9 : 710 / 720)),
      revenueLocal,
      rate: c.rate,
      revenue: revenueLocal / c.rate,
      emissions: generation * c.factor,
      source: `ERP-${a.country}`,
      ingestedAt: `${period}-28T11:30:00Z`,
    };
  }),
);
export type Filters = { country: string; period: string; technology: string };
export function scopeRows(user: User, filters: Filters) {
  return records.filter(
    (r) =>
      user.countries.includes(r.country) &&
      (filters.country === "all" || filters.country === r.country) &&
      (filters.period === "all" || filters.period === r.period) &&
      (filters.technology === "all" || filters.technology === r.technology),
  );
}
export const ratio = (a: number, b: number) => (b ? (a / b) * 100 : null);
export function aggregate(rows: RecordRow[]) {
  const sum = (key: keyof RecordRow) =>
    rows.reduce(
      (s, r) => s + (typeof r[key] === "number" ? (r[key] as number) : 0),
      0,
    );
  const mobility = rows.filter((r) => r.technology === "carga"),
    generationRows = rows.filter((r) => r.technology !== "carga");
  return {
    generation: sum("generation"),
    expected: sum("expected"),
    consumption: sum("consumption"),
    energy: sum("energyKWh") / 1000,
    sessions: sum("sessions"),
    revenue: sum("revenue"),
    emissions: sum("emissions"),
    compliance: ratio(sum("generation"), sum("expected")),
    utilization: ratio(
      sum("occupied"),
      mobility.reduce((s, r) => s + r.available, 0),
    ),
    availability: ratio(
      generationRows.reduce((s, r) => s + r.operational, 0),
      generationRows.reduce((s, r) => s + r.available, 0),
    ),
  };
}
export const fmt = (v: number | null, digits = 0) =>
  v === null
    ? "N/D"
    : v.toLocaleString("es-CO", {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      });
export function alertsFor(rows: RecordRow[]) {
  const assetAlerts = assets.flatMap((a) => {
    const matches = rows.filter((r) => r.assetId === a.id);
    if (!matches.length) return [];
    const k = aggregate(matches);
    const common = {
      id: a.id,
      country: a.country,
      asset: a.name,
      source: matches[0].source,
      date: matches.at(-1)!.ingestedAt,
    };
    if (k.compliance !== null && k.compliance < 90)
      return [
        {
          ...common,
          severity: "Crítica",
          title: "Generación por debajo de la meta",
          description: `Cumplimiento de ${fmt(k.compliance, 1)}%, inferior al umbral demo de 90%. Revisar mantenimiento y conciliar la medición de origen.`,
          value: `${fmt(k.compliance, 1)}%`,
        },
      ];
    if (k.utilization !== null && k.utilization < 25)
      return [
        {
          ...common,
          severity: "Advertencia",
          title: "Estación subutilizada",
          description: `Uso de ${fmt(k.utilization, 1)}%, inferior al umbral demo de 25%. Revisar demanda y ubicación de la estación.`,
          value: `${fmt(k.utilization, 1)}%`,
        },
      ];
    return [];
  });
  const sourceAlerts = qualityRows
    .filter((q) => q.rejected > 0 && rows.some((r) => r.country === q.country))
    .map((q) => ({
      id: `source-${q.country}`,
      country: q.country,
      asset: q.source,
      source: q.source,
      date: q.time,
      severity: "Advertencia",
      title: "Anomalía en fuente de datos",
      description: `Última carga demo del 28/09/2026: ${q.status.toLowerCase()}, ${fmt(q.rejected)} registros rechazados. Revisar cuarentena y disponibilidad de la fuente; los datos del dashboard proceden de una carga anterior.`,
      value: `${fmt(q.rejected)} rechazados`,
    }));
  return [...assetAlerts, ...sourceAlerts];
}
export const qualityRows = countries.map((c, i) => ({
  country: c.code,
  source: `ERP-${c.code}`,
  evaluated: 1200,
  valid: i === 2 ? 0 : i === 0 ? 1188 : 1200,
  rejected: i === 2 ? 1200 : i === 0 ? 12 : 0,
  status: i === 2 ? "Fallida" : i === 0 ? "Advertencia" : "Exitosa",
  time: "2026-09-28T11:30:00Z",
}));
export function csv(headers: string[], rows: unknown[][]) {
  return (
    "\uFEFF" +
    [headers, ...rows]
      .map((row) =>
        row.map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(","),
      )
      .join("\r\n")
  );
}
