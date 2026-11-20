'use client';

type FormProgressProps = {
  currentStep: number;
  totalSteps: number;
  labels: readonly string[];
};

export default function FormProgress({ currentStep, totalSteps, labels }: FormProgressProps) {
  const pct = (currentStep / totalSteps) * 100;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between gap-4">
        <p className="label text-white/50">
          Step <span className="tabular-nums text-white">{pad(currentStep)}</span>
          <span className="tabular-nums"> / {pad(totalSteps)}</span>
        </p>
        <p className="label text-white/80">{labels[currentStep - 1]}</p>
      </div>
      <div
        className="mt-4 h-px bg-white/12"
        role="progressbar"
        aria-label="Application progress"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        aria-valuetext={`Step ${currentStep} of ${totalSteps}: ${labels[currentStep - 1]}`}
      >
        <div
          className="h-px bg-white transition-[width] duration-700 ease-[var(--ease-out-expo)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
