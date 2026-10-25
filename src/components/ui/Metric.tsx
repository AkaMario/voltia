import { Icon } from "./Icon";

export function Metric({
  title,
  value,
  unit,
  note,
  icon = "activity",
}: {
  title: string;
  value: string;
  unit: string;
  note: string;
  icon?: string;
}) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200/70 bg-white p-5 sm:p-6 transition-[opacity,transform,box-shadow] duration-500 starting:translate-y-3 starting:opacity-0 hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none">
      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 [&>span]:flex [&>span]:rounded-lg [&>span]:bg-emerald-50/70 [&>span]:p-2 [&>span]:text-emerald-700/70 [&_svg]:size-4">
        {title}
        <span>
          <Icon name={icon} />
        </span>
      </div>
      <div className="mt-5 whitespace-nowrap text-[28px] leading-tight font-semibold tracking-[-1px] text-slate-800 tabular-nums sm:text-[30px] [&>small]:ml-1.5 [&>small]:text-[11px] [&>small]:font-normal [&>small]:tracking-normal [&>small]:text-slate-500">
        {value}
        <small className="text-[11px]">{unit}</small>
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-slate-500">{note}</p>
    </article>
  );
}
