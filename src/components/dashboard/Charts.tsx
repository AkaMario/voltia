import {
  aggregate,
  fmt,
  periodLabel,
  periods,
  type RecordRow,
} from "../../domain/data";
export function TrendChart({
  rows,
  metric = "generation",
}: {
  rows: RecordRow[];
  metric?: "generation" | "consumption" | "revenue" | "energy";
}) {
  const values = periods
    .map((p) => ({ p, ...aggregate(rows.filter((r) => r.period === p)) }))
    .filter((p) => rows.some((r) => r.period === p.p));
  const max =
    Math.max(
      1,
      ...values.map((v) =>
        Math.max(v[metric], metric === "generation" ? v.expected : 0),
      ),
    ) * 1.15;
  const x = (i: number) => 58 + i * (680 / Math.max(1, values.length - 1)),
    y = (v: number) => 228 - (v / max) * 195;
  const path = values
    .map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v[metric])}`)
    .join(" ");
  return (
    <div className="px-4 pt-2 pb-5 [&>svg]:block [&>svg]:w-full">
      <svg
        className="shrink-0"
        viewBox="0 0 800 280"
        role="img"
        aria-label={`Tendencia de ${metric === "generation" ? "generación real y esperada" : metric === "consumption" ? "consumo" : metric === "energy" ? "energía suministrada" : "ingresos"}`}
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#147d60" stopOpacity=".2" />
            <stop offset="100%" stopColor="#147d60" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1="58"
              y1={33 + i * 49}
              x2="755"
              y2={33 + i * 49}
              stroke="#e9eeec"
              strokeDasharray="4 4"
            />
            <text
              x="46"
              y={37 + i * 49}
              textAnchor="end"
              fill="#64748b"
              fontSize="11"
            >
              {fmt((max * (4 - i)) / 4 / (metric === "revenue" ? 1000 : 1))}
              {metric === "revenue" ? "k" : ""}
            </text>
          </g>
        ))}
        {values.length > 1 && (
          <path
            d={`${path} L${x(values.length - 1)},228 L58,228 Z`}
            fill="url(#area)"
          />
        )}
        {metric === "generation" && (
          <path
            d={values
              .map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v.expected)}`)
              .join(" ")}
            fill="none"
            stroke="#a5b7ac"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        )}
        <path
          d={path}
          fill="none"
          stroke="#147d60"
          strokeWidth="3"
          strokeLinejoin="round"
          pathLength={1}
          className="transition-[stroke-dashoffset] duration-700 ease-out [stroke-dasharray:1] [stroke-dashoffset:0] starting:[stroke-dashoffset:1] motion-reduce:transition-none"
        />
        {values.map((v, i) => (
          <g key={v.p}>
            <circle cx={x(i)} cy={y(v[metric])} r="4" fill="#147d60">
              <title>{`${periodLabel(v.p)}: ${fmt(v[metric], 1)}${metric === "revenue" ? " USD" : " MWh"}${metric === "generation" ? ` · Meta: ${fmt(v.expected)} MWh` : ""}`}</title>
            </circle>
            <text
              x={x(i)}
              y="259"
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
            >
              {periodLabel(v.p)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
export function MixChart({ rows }: { rows: RecordRow[] }) {
  const solar = aggregate(
      rows.filter((r) => r.technology === "solar"),
    ).generation,
    wind = aggregate(rows.filter((r) => r.technology === "eolica")).generation,
    total = solar + wind,
    percent = total ? (solar / total) * 100 : 0;
  return (
    <div className="flex items-center justify-around gap-6 px-6 pt-1 pb-7 xl:flex-col">
      <div
        className="mx-auto size-44 shrink-0 rounded-full p-[22px] [&>div]:flex [&>div]:size-full [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div]:rounded-full [&>div]:bg-white [&_span]:text-[8px] [&_span]:tracking-widest [&_span]:text-slate-500 [&_strong]:text-[28px] [&_strong]:font-semibold [&_strong]:tracking-tight [&_strong]:text-slate-700 [&_small]:text-[10px] [&_small]:text-slate-500 max-sm:size-36 max-sm:p-[18px]"
        role="img"
        aria-label={`Solar ${fmt(percent, 1)}%, eólica ${fmt(total ? 100 - percent : 0, 1)}%`}
        style={{
          background: total
            ? `conic-gradient(#147d60 0% ${percent}%, #b9d6b2 ${percent}% 100%)`
            : "#e9eeec",
        }}
      >
        <div>
          <span>MIX RENOVABLE</span>
          <strong>{total ? "100%" : "N/D"}</strong>
          <small className="text-[11px]">solar + eólica</small>
        </div>
      </div>
      <div className="flex w-full min-w-24 flex-col gap-3 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[11px] [&>span]:text-slate-500 [&_b]:ml-auto [&_b]:whitespace-nowrap [&_b]:text-[11px] [&_b]:font-medium [&_b]:text-slate-600">
        <span>
          <i className="inline-block size-2 shrink-0 rounded-full bg-[#147d60]" />
          Solar <b>{fmt(solar)} MWh</b>
        </span>
        <span>
          <i className="inline-block size-2 shrink-0 rounded-full bg-[#147d60] bg-[#b9d6b2]!" />
          Eólica <b>{fmt(wind)} MWh</b>
        </span>
      </div>
    </div>
  );
}
