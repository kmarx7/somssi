import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldInfo = { id: string; label: string; hint?: string; error?: string };
function FieldFrame({ id, label, hint, error, children }: FieldInfo & { children: ReactNode }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}
    {hint ? <p className="field-hint" id={`${id}-hint`}>{hint}</p> : null}
    {error ? <p className="field-error" id={`${id}-error`} role="alert">{error}</p> : null}
  </div>;
}
const describedBy = (id: string, hint?: string, error?: string, extra?: string) =>
  [hint && `${id}-hint`, error && `${id}-error`, extra].filter(Boolean).join(" ") || undefined;

export function InputField({ id, label, hint, error, className, "aria-describedby": extra, ...props }:
  ComponentProps<"input"> & FieldInfo) {
  return <FieldFrame {...{ id, label, hint, error }}><input {...props} id={id} className={cn("input", className)}
    aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(id, hint, error, extra)} /></FieldFrame>;
}

export function SelectField({ id, label, hint, error, className, children, "aria-describedby": extra, ...props }:
  ComponentProps<"select"> & FieldInfo) {
  return <FieldFrame {...{ id, label, hint, error }}><select {...props} id={id} className={cn("input", className)}
    aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(id, hint, error, extra)}>{children}</select></FieldFrame>;
}

export function CheckboxField({ label, className, ...props }: Omit<ComponentProps<"input">, "type"> & { label: string }) {
  return <label className={cn("checkbox-field", className)}><input {...props} type="checkbox" /><span>{label}</span></label>;
}
