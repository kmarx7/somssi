import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="state"><span className="state-mark" aria-hidden="true">○</span><h3>{title}</h3><p>{description}</p>{action}</div>;
}
export function ErrorState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="state state--error" role="alert"><span className="state-mark" aria-hidden="true">!</span><h3>{title}</h3><p>{description}</p>{action}</div>;
}
export function LoadingState({ label }: { label: string }) {
  return <div className="loading-state" role="status" aria-live="polite"><span className="spinner" aria-hidden="true" />{label}</div>;
}
export function Skeleton() {
  return <div className="skeleton" aria-hidden="true"><div /><span /><span /></div>;
}
