import { Icon } from "./Icon";
import { useDashboard } from "../../hooks/useDashboard";
import { useEffect } from "react";

export function DetailDialog() {
  const { detail, setDetail } = useDashboard();
  useEffect(() => {
    if (!detail) return;
    const old = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLDialogElement>("dialog");
    dialog?.showModal();
    return () => {
      dialog?.close();
      old?.focus();
    };
  }, [detail]);
  if (!detail) return null;
  return (
    <dialog
      aria-labelledby="detail-title"
      className="fixed inset-0 m-auto max-h-[85vh] w-[calc(100%_-_32px)] max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 text-slate-700 shadow-xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm transition-[opacity,transform] duration-300 starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none"
      onCancel={() => setDetail(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setDetail(null);
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5 [&>button]:border-0 [&>button]:p-1.5">
        <h2
          className="text-base font-semibold tracking-tight text-slate-700"
          id="detail-title"
        >
          {detail.title}
        </h2>
        <button
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-45 motion-reduce:transition-none"
          autoFocus
          aria-label="Cerrar detalle"
          onClick={() => setDetail(null)}
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="flex flex-col gap-5 p-6 [&_p]:text-xs [&_p]:leading-7">
        {detail.content}
      </div>
    </dialog>
  );
}
