export function Stepper({ steps, current, label, completedLabel }: { steps: readonly string[]; current: number; label: string; completedLabel: string }) {
  return <nav aria-label={label}><ol className="stepper">{steps.map((step, index) =>
    <li key={step} aria-current={index === current ? "step" : undefined} data-complete={index < current}>
      <span className="step-number" aria-hidden="true">{index < current ? "✓" : String(index + 1).padStart(2, "0")}</span>
      <span>{step}{index < current ? <span className="sr-only"> — {completedLabel}</span> : null}</span>
    </li>)}</ol></nav>;
}
