import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("site-container", className)} />;
}
export function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2>{description ? <p>{description}</p> : null}</div>;
}
export function Card({ className, children, ...props }: ComponentProps<"article">) {
  return <article {...props} className={cn("card", className)}>{children}</article>;
}
export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "success" | "accent"; children: ReactNode }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
