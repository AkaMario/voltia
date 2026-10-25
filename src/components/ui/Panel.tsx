import { type ReactNode } from "react";

export function Panel({
  title,
  subtitle,
  children,
  action,
  className = "",
  collapsible = false,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
  collapsible?: boolean;
}) {
  if (collapsible)
    return (
      <details
        className={`mb-7 min-w-0 overflow-hidden rounded-2xl border border-slate-200/70 bg-white [&>p]:px-6 [&>p]:pb-6 [&>p]:text-xs [&>h3]:px-6 [&>h3]:py-4 [&>.grid]:px-6 [&>.grid]:pb-6 group/disclosure ${className}`}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 hover:bg-slate-50/60 [&::-webkit-details-marker]:hidden [&_strong]:block [&_strong]:text-sm [&_strong]:font-medium [&_small]:mt-1 [&_small]:block [&_small]:text-[11px] [&_small]:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none">
          <span>
            <strong>{title}</strong>
            {subtitle && <small className="text-[11px]">{subtitle}</small>}
          </span>
          <span className="flex shrink-0 items-center gap-3 text-[11px] text-slate-500 [&>span]:transition-transform group-open/disclosure:[&>span]:rotate-180">
            Ver detalle <span>⌄</span>
          </span>
        </summary>
        <div className="border-t border-slate-100 pt-5 transition-[opacity,transform] duration-300 starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none [&>p]:px-6 [&>p]:pb-6 [&>p]:text-xs [&>h3]:px-6 [&>h3]:py-4 [&>.grid]:px-6 [&>.grid]:pb-6 [&>.inline-flex]:mx-6 [&>.inline-flex]:mb-5">
          {action && <div className="flex justify-end px-6 pb-4">{action}</div>}
          {children}
        </div>
      </details>
    );
  return (
    <section
      className={`mb-7 min-w-0 overflow-hidden rounded-2xl border border-slate-200/70 bg-white [&>p]:px-6 [&>p]:pb-6 [&>p]:text-xs [&>h3]:px-6 [&>h3]:py-4 [&>.grid]:px-6 [&>.grid]:pb-6 ${className}`}
    >
      <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-5 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-slate-700 [&_p]:mt-1.5 [&_p]:text-[11px] [&_p]:text-slate-500">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-700">
            {title}
          </h2>
          {subtitle && <p className="text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
