import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";
const styles = (variant: Variant, className?: string) => cn("button", `button--${variant}`, className);

export function Button({ variant = "primary", pending = false, disabled, type = "button", className, children, ...props }:
  ComponentProps<"button"> & { variant?: Variant; pending?: boolean }) {
  return <button {...props} type={type} className={styles(variant, className)} disabled={disabled || pending} aria-busy={pending || undefined}>
    {pending ? <span className="spinner" aria-hidden="true" /> : null}{children}
  </button>;
}

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={styles(variant, className)} />;
}
