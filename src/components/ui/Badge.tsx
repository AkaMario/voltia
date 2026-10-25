import { type ReactNode } from "react";

export function Badge({
  children,
  kind = "",
}: {
  children: ReactNode;
  kind?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700 ${({ neutral: "bg-slate-100! text-slate-500!", warning: "bg-amber-50! text-amber-700!", danger: "bg-rose-50! text-rose-700!" } as Record<string, string>)[kind] ?? ""}`}
    >
      {children}
    </span>
  );
}
