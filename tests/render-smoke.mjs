import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  globalThis.window = { location: { pathname: "/" } };
  globalThis.sessionStorage = { getItem: () => null };
  globalThis.localStorage = { getItem: () => null };
  assert.ok(
    renderToString(createElement(App)).includes("Bienvenido a EnergyView"),
  );
  const routes = [
    "/",
    "/paises",
    "/generacion",
    "/consumo",
    "/movilidad",
    "/comercial",
    "/activos",
    "/alertas",
    "/calidad",
    "/arquitectura",
    "/proyecto",
  ];
  let count = 0;
  for (const userId of [
    "ceo",
    "gerente-CO",
    "gerente-CL",
    "gerente-CR",
    "gerente-UY",
    "operador",
    "analista",
  ]) {
    globalThis.sessionStorage = { getItem: () => userId };
    for (const path of routes) {
      globalThis.window.location.pathname = path;
      const html = renderToString(createElement(App));
      assert.ok(
        html.includes("Datos simulados con fines académicos"),
        `${userId} ${path}`,
      );
      assert.ok(html.includes("<main"), `${userId} ${path}`);
      if (userId === "gerente-CO" && path === "/paises") {
        const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
        assert.ok(main.includes("Colombia"));
        for (const name of ["Chile", "Costa Rica", "Uruguay"])
          assert.ok(!main.includes(name), `Dato no autorizado: ${name}`);
      }
      count++;
    }
  }
  console.log(
    `Renderizado React correcto: login y ${count} combinaciones de rutas/perfiles (sin navegador). Power BI conectado requiere prueba con informe real.`,
  );
} finally {
  await server.close();
}
