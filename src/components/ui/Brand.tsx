import { Icon } from "./Icon";

export function Brand() {
  return (
    <div className="flex items-center gap-3 px-2 text-2xl font-extrabold tracking-[.13em] text-emerald-950 leading-tight [&>div>span]:mt-1 [&>div>span]:block [&>div>span]:text-[11px] [&>div>span]:font-normal [&>div>span]:tracking-[.22em] [&>div>span]:text-slate-500 mb-5">
      <span className="flex h-11 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-900 text-lime-200">
        <Icon name="charge" size={27} />
      </span>
      <div>
        VOLTIA<span>EnergyView</span>
      </div>
    </div>
  );
}
