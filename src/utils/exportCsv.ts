import { csv, type Filters, type RecordRow } from "../domain/data";

export function downloadEnergyCsv(rows: RecordRow[], filters: Filters) {
  const blob = new Blob(
    [
      csv(
        [
          "id",
          "pais",
          "activo",
          "tecnologia",
          "periodo",
          "generacion_mwh",
          "meta_mwh",
          "consumo_mwh",
          "energia_carga_mwh",
          "sesiones",
          "horas_ocupadas",
          "horas_disponibles",
          "ingresos_local",
          "tasa_local_por_usd",
          "ingresos_usd",
          "emisiones_estimadas_tco2e",
          "fuente",
          "ingesta_utc",
        ],
        rows.map((r) => [
          r.id,
          r.country,
          r.assetId,
          r.technology,
          r.period,
          r.generation,
          r.expected,
          r.consumption,
          r.energyKWh / 1000,
          r.sessions,
          r.occupied,
          r.available,
          r.revenueLocal,
          r.rate,
          r.revenue,
          r.emissions,
          r.source,
          r.ingestedAt,
        ]),
      ),
    ],
    { type: "text/csv;charset=utf-8;" },
  );
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = `voltia-${filters.country}-${filters.period}-${filters.technology}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
