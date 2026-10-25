import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  records,
  assets,
  countries,
  periods,
  users,
  csv,
  qualityRows,
} from "../src/domain/data.ts";
const directory = fileURLToPath(new URL("../power-bi/data/", import.meta.url));
mkdirSync(directory, { recursive: true });
const write = (name, headers, data) =>
  writeFileSync(`${directory}${name}.csv`, csv(headers, data), "utf8");
write(
  "dim_pais",
  ["pais_id", "nombre", "moneda_local", "factor_emision_hipotetico"],
  countries.map((c) => [c.code, c.name, c.currency, c.factor]),
);
write(
  "dim_activo",
  ["activo_id", "pais_id", "nombre", "tecnologia", "capacidad_mw"],
  assets.map((a) => [a.id, a.country, a.name, a.technology, a.capacity]),
);
write(
  "dim_fecha",
  ["periodo", "fecha", "anio", "mes", "mes_nombre"],
  periods.map((p) => [
    p,
    `${p}-01`,
    Number(p.slice(0, 4)),
    Number(p.slice(5)),
    new Date(`${p}-02T12:00:00Z`).toLocaleDateString("es-CO", {
      month: "long",
      timeZone: "UTC",
    }),
  ]),
);
write(
  "fact_energia",
  [
    "registro_id",
    "activo_id",
    "periodo",
    "generacion_mwh",
    "esperada_mwh",
    "consumo_mwh",
    "energia_carga_kwh",
    "sesiones",
    "horas_ocupadas",
    "horas_disponibles",
    "horas_operativas",
    "ingresos_local",
    "tasa_local_por_usd",
    "ingresos_usd",
    "emisiones_estimadas_tco2e",
    "fuente",
    "ingesta_utc",
  ],
  records.map((r) => [
    r.id,
    r.assetId,
    r.period,
    r.generation,
    r.expected,
    r.consumption,
    r.energyKWh,
    r.sessions,
    r.occupied,
    r.available,
    r.operational,
    r.revenueLocal,
    r.rate,
    r.revenue,
    r.emissions,
    r.source,
    r.ingestedAt,
  ]),
);
write(
  "seguridad_usuario_pais",
  ["email", "pais_id"],
  users.flatMap((u) => u.countries.map((c) => [u.email, c])),
);
write(
  "tipo_cambio",
  [
    "periodo",
    "moneda_origen",
    "moneda_destino",
    "tasa_local_por_usd",
    "fuente",
  ],
  periods.flatMap((p) =>
    countries.map((c) => [
      p,
      c.currency,
      "USD",
      c.rate,
      "Fixture academico - tasa hipotetica",
    ]),
  ),
);
write(
  "fact_calidad",
  [
    "pais_id",
    "fuente",
    "evaluados",
    "validos",
    "rechazados",
    "estado",
    "ejecucion_utc",
  ],
  qualityRows.map((q) => [
    q.country,
    q.source,
    q.evaluated,
    q.valid,
    q.rejected,
    q.status,
    q.time,
  ]),
);
console.log(
  `Generados 7 CSV desde el mismo fixture del mock: ${records.length} registros, ${assets.length} activos, ${periods.length} meses.`,
);
