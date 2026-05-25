'use client';

type FormProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const pct = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-[var(--color-muted)] mb-2">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 bg-black/8 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-taupe)] rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
