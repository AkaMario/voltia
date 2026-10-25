# VOLTIA EnergyView

Mock académico de una torre de control energético de Colombia, Chile, Costa Rica y Uruguay, construido con React, TypeScript, Vite y Tailwind. Incluye login de credenciales ficticias, doce vistas y SDK oficial de Microsoft Power BI listo para conectar un informe publicado.

## Ejecutar

Node.js 24 o superior y npm.

```bash
npm install
npm run dev
```

Abrir la URL local que imprime Vite (habitualmente http://localhost:5173). Tras instalar dependencias, la demo local no necesita internet. La vista Power BI conectado sí requiere un informe publicado, configuración autorizada y conectividad.

```bash
npm test                # Consistencia, conversiones, filtros y ámbito demo
npm run test:render     # Renderizado React: login y 77 rutas/perfiles
npm run build          # TypeScript y compilación de producción
npm run preview        # Servir la compilación
npm run powerbi:data   # Regenerar los CSV desde la misma semilla de la web
npm run format         # Formato del código de la aplicación
```

Si npm apunta a un shim de asdf roto, activar una instalación funcional de Node 24 en el PATH antes de ejecutar estos comandos.

## Acceso de demostración

Todos usan la contraseña **`Voltia2026!`**. No ingresar credenciales reales.

| Correo | Perfil y ámbito |
|---|---|
| ceo@voltia.demo | Dirección general · cuatro países |
| gerente.co@voltia.demo | Gerente Colombia |
| gerente.cl@voltia.demo | Gerente Chile |
| gerente.cr@voltia.demo | Gerente Costa Rica |
| gerente.uy@voltia.demo | Gerente Uruguay |
| operador@voltia.demo | Operaciones Colombia |
| analista@voltia.demo | Analista BI · cuatro países |

El formulario permite completar una cuenta demo. La sesión se guarda por pestaña en sessionStorage; los estados de alerta, en localStorage. El selector de perfil es una herramienta explícita de demostración. La restricción se aplica antes de derivar KPI y exportaciones, pero todo el fixture está en el navegador: **no es autenticación ni autorización de producción**. Power BI requiere su propia identidad, token y RLS.

## Vistas

| Ruta | Contenido |
|---|---|
| / | Ejecutivo, KPI, real/meta, mix, países, movilidad y alertas |
| /paises | Comparativo ordenable, selección de hasta dos países y detalle |
| /generacion | Producción, meta, disponibilidad y ficha de plantas |
| /consumo | Tendencia y desglose de consumo |
| /movilidad | Sesiones, energía, horas y utilización de estaciones |
| /comercial | Ingresos USD, variación, líneas de negocio y tasas hipotéticas |
| /activos | Inventario con búsqueda y fichas individuales |
| /alertas | Causas, umbrales y estados abierta/reconocida/resuelta |
| /calidad | Pipelines, rechazos, cuarentena y recarga simulada |
| /power-bi | SDK oficial powerbi-client-react / powerbi-client |
| /arquitectura | Recorrido interactivo de las siete etapas de Azure + Power BI |
| /proyecto | Avance 75%, actividades, hitos, equipo y proyección financiera |

## Datos y cálculos

`src/domain/data.ts` contiene la semilla determinista y las funciones compartidas. 288 registros de activo + mes, 24 activos (6 por país, incluidas 2 estaciones) y 12 meses de octubre 2025 a septiembre 2026. Periodo inicial: septiembre 2026. Los filtros de país, mes y tecnología afectan KPI, tablas, alertas operativas y CSV. Los gráficos de tendencia muestran el histórico completo de 12 meses para el mismo país/tecnología, rotulado expresamente para comparar el corte con su evolución.

La fuente de calidad tiene un corte propio al 28/09/2026. Simular recarga actualiza la fecha del intento; conserva rechazos y KPI. Los factores ambientales, tasas, umbrales y cifras son hipotéticos. No hay actualización real de Azure ni datos en tiempo real. El avance académico es un escenario futuro al 22/01/2027, separado del desempeño energético y de la fecha de referencia del caso (25/10/2026).

Porcentajes desde las sumas, no suma/promedio simple de porcentajes. Los denominadores cero producen N/D. Ingresos: moneda local / tasa de unidades locales por USD. La energía de carga se convierte de kWh a MWh. La capacidad se cuenta por activo, sin sumarla de nuevo por cada mes. La exportación incluye filas de detalle con encabezados, unidades, periodo, origen y tasa aplicada, respetando los filtros y el ámbito simulado.

## Entregables Power BI

Ver [power-bi/README.md](power-bi/README.md): siete CSV relacionados, medidas DAX, tema JSON, relaciones, diseño de páginas, RLS dinámico y pasos para guardar el `.pbix` en Power BI Desktop. El archivo `.pbix` no se fabrica desde la web ni está incluido como si se hubiera validado en Desktop.

La vista `/power-bi` usa las librerías oficiales de Microsoft. La demo local utiliza gráficos SVG propios para funcionar sin conexión; no se presentan como gráficos renderizados por el motor Power BI. La conexión manual usa únicamente embed tokens temporales en memoria. Un backend autenticado, emisión/renovación de tokens y RLS real quedan como integración productiva posterior.

Referencias: [Microsoft Power BI React](https://learn.microsoft.com/en-us/javascript/api/overview/powerbi/powerbi-client-react) y [Power BI Embedded](https://learn.microsoft.com/en-us/power-bi/developer/embedded/embed-customer-app).

## Validación y exposición

Las pruebas cubren los totales de todos los meses/tecnologías, perfiles, tasas, emisiones, ocupación, nulos y alertas. Usar el guion de [docs/demo-script.md](docs/demo-script.md). El layout usa utilidades Tailwind CSS: `src/index.css` solo importa Tailwind y no hay hojas de estilos de componentes. El resumen prioriza KPI y gráficos; las tablas y explicaciones secundarias se despliegan bajo demanda. Incluye skeletons con `animate-pulse` durante una fase de carga demo de 360 ms al entrar, navegar o cambiar filtros; en el informe conectado, el skeleton espera el evento `rendered` del SDK. Las transiciones de entrada usan `starting:` y se desactivan con movimiento reducido. El menú, las cuadrículas y las tablas se adaptan a pantallas pequeñas, con navegación por teclado y modales nativos. La revisión interactiva en navegador y la validación de DAX/RLS en Desktop requieren esos entornos disponibles.

La guía fuente se conserva en [context/VOLTIA_EnergyView_Contexto_y_Guia_Mock.md](context/VOLTIA_EnergyView_Contexto_y_Guia_Mock.md).


## Organización del código

```text
src/
  App.tsx                 # Sesión y composición principal
  views/                  # Una pantalla por archivo
  routes/                 # Selección de vista según la URL
  components/
    ui/                   # Paneles, métricas, iconos, modal y skeletons
    layout/               # Sidebar, cabecera, filtros y estructura
    dashboard/            # Tablas, gráficos y bloques de negocio compartidos
  context/                # Contexto tipado y provider del dashboard
  hooks/                  # Sesión, navegación, filtros y datos derivados
  config/                 # Catálogo de navegación
  domain/                 # Fixture y cálculos energéticos
  utils/                  # Formato, almacenamiento demo y exportación CSV
  index.css               # Importación de Tailwind
```

Cada ruta tiene su vista en `src/views/`. Consumo y comercial reutilizan `BusinessPerformance` para compartir su estructura sin duplicar cálculos. Las pantallas acceden al estado común mediante `useDashboard`; los cálculos y el ámbito demo siguen en la capa de dominio. `PowerBI.tsx` se carga de forma diferida y conserva el SDK oficial.

Para agregar una pantalla, crear la vista, registrar su ruta en `routes/DashboardRoutes.tsx` y añadir su entrada a `config/navigation.ts`. Los componentes de presentación compartidos se mantienen fuera de las vistas.
