# VOLTIA · paquete para Power BI Desktop

Datos simulados con fines académicos. Este paquete permite montar un informe nativo; no contiene un `.pbix` generado o probado en Power BI Desktop. El SDK oficial está instalado e integrado en `/power-bi` del mock, pero la demo local dibuja gráficos SVG y no usa el motor Power BI hasta conectar un informe publicado.

## 1. Datos e importación

Generar los CSV con `npm run powerbi:data` (Node 24). Se exporta el mismo fixture que consume la web: 288 registros mensuales, 24 activos, 4 países, octubre 2025 a septiembre 2026. No hay aleatoriedad ni dependencia de internet. `tipo_cambio` documenta tasas hipotéticas constantes por país/mes; no son cotizaciones oficiales. Los factores ambientales tampoco son oficiales.

En Power BI Desktop: Obtener datos → Texto/CSV → seleccionar cada archivo de `data/`, delimitador coma, UTF-8. En Transformar datos, eliminar la detección automática de tipos si interpretó decimales con coma regional. Asignar tipos usando **configuración regional English (United States)** para los valores decimales de los CSV; estos usan punto decimal. Mantener identificadores y `periodo` como texto. Asignar `dim_fecha[fecha]` como fecha, año/mes/sesiones como enteros, magnitudes/tasas como números decimales e `ingesta_utc`/`ejecucion_utc` como fecha/hora/zona UTC. Cargar en modo **Import**.

## 2. Relaciones (uno a muchos, filtro unidireccional)

| Uno | Muchos |
|---|---|
| dim_pais[pais_id] | dim_activo[pais_id] |
| dim_activo[activo_id] | fact_energia[activo_id] |
| dim_fecha[periodo] | fact_energia[periodo] |
| dim_pais[pais_id] | fact_calidad[pais_id] |

`seguridad_usuario_pais` y `tipo_cambio` quedan desconectadas. No crear una segunda relación país→hechos ni unir tasas a hechos: se evitarían caminos ambiguos y duplicación. Los ingresos USD ya están convertidos por registro. `fact_energia` tiene grano activo + mes; no contiene sesiones individuales ni facturas y no debe tratarse como un listado transaccional. `dim_fecha` es un calendario **mensual**, no marcarlo como tabla de fechas diaria; la variación mensual usa EDATE con un único mes seleccionado. Ordenar `mes_nombre` por `mes` y usar `periodo` para el eje cronológico.

## 3. Medidas y formatos

Crear individualmente las medidas de `medidas.dax`. Si la instalación requiere `;` en DAX, adaptar el separador. Los indicadores porcentuales devuelven fracciones: aplicar formato porcentaje (1 decimal), sin multiplicar por 100. Las magnitudes usan formato numérico con separadores y los ingresos moneda USD. DIVIDE sin denominador devuelve BLANK (mostrar N/D en la interfaz si se desea), no cero artificial.

Importar `tema-voltia.json` desde Vista → Temas → Examinar temas. Las fórmulas están revisadas contra los cálculos del mock; requieren validación final dentro de Power BI Desktop.

## 4. Diseño de páginas

Formato 16:9 (1280 × 720), fondo #F5F7F6, paneles blancos, verde principal #147D60. Mantener una tarjeta con `[Aviso académico]` en **cada página**. Segmentadores sincronizados: `dim_fecha[periodo]`, `dim_pais[nombre]`, `dim_activo[tecnologia]`.

1. **Ejecutivo:** tarjetas generación, cumplimiento, consumo, ingresos y emisiones estimadas; líneas real/meta por mes; donut solar/eólica; matriz por país; sesiones y utilización.
2. **Países:** matriz de país con todas las medidas; barras de generación e ingresos en gráficos separados.
3. **Generación:** plantas, capacidad, real/meta, disponibilidad; drillthrough por `activo_id`.
4. **Consumo:** evolución y activos con consumo.
5. **Movilidad:** filtrar tecnología carga; energía, sesiones, horas y utilización; bandera de subutilización <25%.
6. **Comercial:** USD por país/tecnología, variación mensual y tabla de tasas hipotéticas.
7. **Activos y alertas:** tabla con cumplimiento <90% y disponibilidad <95%; tooltip con origen y fecha de ingesta. Estado abierto/reconocido/resuelto es interacción del mock web; el informe Import no realiza escritura de estados.
8. **Calidad:** fuentes, evaluados, válidos y rechazos. Mostrar fecha de corte propia; estos datos no responden al filtro energético de periodo/tecnología.
9. **Arquitectura:** texto y formas del flujo Fuentes → ADF → Bronze → Functions → Silver → SQL Gold → Power BI. Entra ID, Key Vault, Monitor y CI/CD transversales.
10. **Proyecto:** página separada con escenario futuro al 22/01/2027: avance declarado 75%, 43 completas, 3 en proceso, 2 atrasadas y 18 sin iniciar, total 66. Presupuesto 75.000 USD. No inferir avance ponderado como 43/66 ni inventar el detalle del cronograma. ROI 27,4%, VPN 12.134 USD y TIR 18,1% son proyecciones, no retornos realizados.

## 5. RLS dinámico

Administrar roles → rol `AccesoPais`. Agregar esta expresión sobre **dim_pais**:

```dax
VAR CorreoActual = LOWER(USERPRINCIPALNAME())
VAR PaisFila = dim_pais[pais_id]
RETURN
    COUNTROWS(
        FILTER(
            seguridad_usuario_pais,
            LOWER(seguridad_usuario_pais[email]) = CorreoActual
                && seguridad_usuario_pais[pais_id] = PaisFila
        )
    ) > 0
```

Proteger también `seguridad_usuario_pais` con `LOWER(seguridad_usuario_pais[email]) = LOWER(USERPRINCIPALNAME())` para que el rol solo pueda consultar sus propias asignaciones. Sustituir los correos `.demo` por identidades reales de Entra antes de publicar. Ver como → Otro usuario → probar ceo@voltia.demo (4 países) y gerente.co@voltia.demo (Colombia). La RLS se propaga país→activo→hechos y país→calidad. Probar usuario sin asignación: cero filas. No relacionar tablas mediante filtros bidireccionales para resolver permisos.

Publicar en Power BI Service y asignar usuarios al rol con permisos adecuados de lectura. Para inserción app-owns-data, el backend debe emitir un embed token con identidad efectiva y roles que correspondan al usuario real. La tabla demo de tasas no contiene información restringida. El login local y el selector demo **no autentican ni autorizan Power BI**. No usar el usuario elegido en el navegador para emitir tokens ni conceder permisos.

## 6. SDK oficial e inserción

La aplicación importa `PowerBIEmbed` de `powerbi-client-react` y `models` de `powerbi-client`. Abrir `/power-bi` después del login y proporcionar ID, URL de inserción `https://app.powerbi.com/reportEmbed?...` y un **embed token** temporal con alcance autorizado. Se conserva exclusivamente en memoria del componente y se elimina al desconectar/salir de la vista. No admite ni requiere secretos de aplicación.

Para producción reemplazar el formulario manual por un backend autenticado que obtenga la configuración de inserción, aplique RLS en la identidad efectiva y renueve tokens antes de expirar. No colocar secretos en variables VITE_ ni en el frontend. Los filtros y el perfil del mock no se transfieren al informe conectado; el informe tiene sus propios segmentadores y autorización por token.

Referencias oficiales: [Componente React](https://learn.microsoft.com/en-us/javascript/api/overview/powerbi/powerbi-client-react), [Inserción para clientes](https://learn.microsoft.com/en-us/power-bi/developer/embedded/embed-customer-app).

## 7. Comprobación de entrega

- CSV: total global igual a suma por país, y generación igual a solar + eólica.
- Mes septiembre 2026, CO-03: cumplimiento <90%, disponibilidad 648/720 =90%.
- Gerente Colombia: sin datos de CL/CR/UY en tablas, drillthrough y exportaciones.
- Exportación web: mismas cifras que el informe con idénticos filtros.
- Importes convertidos por fila antes de agregar; porcentajes calculados desde sumas.
- Datos, autenticación mock y arquitectura propuesta señalados como simulación.
- Guardar finalmente como `VOLTIA_EnergyView.pbix` en Power BI Desktop. Esta comprobación visual y de RLS dentro de Desktop/Service queda pendiente hasta disponer de ese entorno.
