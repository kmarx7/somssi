"use client";

import { Button } from "./button";

export function QuantityInput({ id, value, min = 1, max, onChange, label, decreaseLabel, increaseLabel }:
  { id: string; value: number; min?: number; max: number; onChange: (value: number) => void; label: string; decreaseLabel: string; increaseLabel: string }) {
  return <div className="quantity" role="group" aria-labelledby={`${id}-label`}>
    <span id={`${id}-label`}>{label}</span><div className="quantity-controls">
      <Button variant="secondary" aria-label={decreaseLabel} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>−</Button>
      <output id={id} aria-live="polite" aria-atomic="true">{value}</output>
      <Button variant="secondary" aria-label={increaseLabel} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>+</Button>
    </div>
  </div>;
}
