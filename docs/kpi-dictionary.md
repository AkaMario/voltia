# Diccionario de indicadores de demostración

Todos los propietarios y umbrales son propuestas didácticas que requieren validación del negocio. Fuentes: ERP-CO/CL/CR/UY simuladas. Frecuencia: mensual, con trazabilidad UTC por fila.

| Indicador | Cálculo | Unidad / ámbito |
|---|---|---|
| Generación | Suma de generación de plantas | MWh; activo + mes |
| Meta | Suma de generación esperada | MWh; activo + mes |
| Cumplimiento | Generación / meta × 100 | %; ponderado por meta |
| Desviación | (Generación − meta) / meta × 100 | % |
| Consumo | Suma de consumo | MWh |
| Energía movilidad | Suma kWh / 1000 | MWh |
| Sesiones | Suma de sesiones de cada estación/mes | Sesiones; sin duplicados |
| Utilización | Horas ocupadas / disponibles de estaciones × 100 | %; denominador solo carga |
| Disponibilidad | Horas operativas / programadas de plantas × 100 | %; denominador solo plantas |
| Ingresos USD | Suma de ingreso local / tasa local por USD, por fila | USD; no sumar monedas locales |
| Variación ingresos | (Actual − previo) / previo × 100 | %; solo corte de un mes y previo disponible |
| Emisiones evitadas | Generación elegible × factor ficticio del país | tCO₂e estimadas, sin certificación |
| Capacidad | Suma de capacidad de activos únicos | MW; no multiplicar por los meses |
| Calidad | Registros válidos / evaluados × 100 | %; corte independiente de última carga |

Denominador cero: `null` en TypeScript / BLANK en DAX, presentado como N/D. Los agregados se calculan desde numeradores y denominadores totales, no promediando porcentajes. Las horas disponibles corresponden a las horas calendario del mes; las ocupadas no las exceden.

Factores hipotéticos de emisiones: CO 0,15; CL 0,23; CR 0,08; UY 0,10 tCO₂e/MWh. Tasas hipotéticas: 4.100 COP, 950 CLP, 520 CRC y 41 UYU por USD. No son fuentes regulatorias ni financieras oficiales.

Alertas: producción <90% de meta; utilización de estaciones <25%; fuentes con rechazos en última carga. Planta CO-03 presenta disponibilidad cercana al 90%, con valor exacto desde sus horas; puede existir redondeo a una hora. Las alertas se generan desde el mismo ámbito de datos que los KPI. El estado de atención se conserva localmente y no cambia el dato fuente.

El avance declarado 75% del proyecto se documenta aparte; no se deriva de los KPI ni del conteo de actividades completas. La fecha 22/01/2027 es un escenario futuro del ejercicio.
