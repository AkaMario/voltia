import { test } from "node:test";
import assert from "node:assert/strict";
import {
  aggregate,
  alertsFor,
  assets,
  countries,
  periods,
  ratio,
  records,
  scopeRows,
  users,
  csv,
} from "../src/domain/data.ts";
test("Totales corporativos coinciden con los cuatro países en todos los meses y tecnologías", () => {
  for (const period of [...periods, "all"])
    for (const technology of ["all", "solar", "eolica", "carga"]) {
      const total = aggregate(
        scopeRows(users[0], { country: "all", period, technology }),
      );
      for (const key of [
        "generation",
        "expected",
        "consumption",
        "energy",
        "sessions",
        "revenue",
        "emissions",
      ]) {
        const sum = countries.reduce(
          (n, c) =>
            n +
            aggregate(
              scopeRows(users[0], { country: c.code, period, technology }),
            )[key],
          0,
        );
        assert.ok(
          Math.abs(total[key] - sum) < 1e-6,
          `${period} ${technology} ${key}`,
        );
      }
    }
});
test("Los perfiles y exportaciones no reciben filas fuera de su ámbito simulado", () => {
  for (const user of users)
    for (const country of ["all", ...countries.map((c) => c.code)]) {
      const rows = scopeRows(user, {
        country,
        period: "all",
        technology: "all",
      });
      assert.ok(rows.every((r) => user.countries.includes(r.country)));
      if (country !== "all" && !user.countries.includes(country))
        assert.equal(rows.length, 0);
    }
});
test("USD, MWh, utilización y emisiones respetan las fórmulas", () => {
  for (const r of records) {
    assert.equal(r.revenue, r.revenueLocal / r.rate);
    assert.equal(
      r.emissions,
      r.generation * countries.find((c) => c.code === r.country).factor,
    );
    assert.ok(r.occupied <= r.available && r.operational <= r.available);
    assert.ok(assets.some((a) => a.id === r.assetId));
  }
  const charging = scopeRows(users[0], {
      country: "all",
      period: "2026-09",
      technology: "carga",
    }),
    k = aggregate(charging);
  assert.equal(k.energy, charging.reduce((s, r) => s + r.energyKWh, 0) / 1000);
  assert.equal(
    k.utilization,
    (charging.reduce((s, r) => s + r.occupied, 0) /
      charging.reduce((s, r) => s + r.available, 0)) *
      100,
  );
  assert.equal(k.compliance, null);
  assert.equal(ratio(0, 0), null);
});
test("Alertas de baja producción corresponden al KPI del activo y son reproducibles", () => {
  const rows = scopeRows(users[0], {
    country: "CO",
    period: "2026-09",
    technology: "all",
  });
  const alert = alertsFor(rows).find((a) => a.id === "CO-03");
  assert.ok(alert);
  assert.ok(
    aggregate(rows.filter((r) => r.assetId === alert.id)).compliance < 90,
  );
  assert.deepEqual(alertsFor(rows), alertsFor(rows));
  assert.ok(alertsFor(rows).every((a) => a.country === "CO"));
});
test("Semilla tiene 12 periodos, 6 activos y 2 estaciones por país, con claves únicas", () => {
  assert.equal(periods.length, 12);
  assert.equal(new Set(records.map((r) => r.id)).size, records.length);
  for (const c of countries) {
    assert.equal(assets.filter((a) => a.country === c.code).length, 6);
    assert.equal(
      assets.filter((a) => a.country === c.code && a.technology === "carga")
        .length,
      2,
    );
  }
});
test("CSV conserva decimales numéricos y escapa comillas", () => {
  assert.equal(
    csv(["campo"], [['a"b'], [1.5]]),
    '\uFEFF"campo"\r\n"a""b"\r\n"1.5"',
  );
});
