'use client';

import dynamic from 'next/dynamic';

function FormSkeleton() {
  return (
    <div className="space-y-5" aria-hidden="true">
      <div className="h-1.5 bg-black/8 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-[var(--color-taupe)]/40 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-2/5 bg-black/8 rounded animate-pulse" />
            <div className="h-12 bg-black/5 rounded-xl animate-pulse" />
          </div>
        ))}
      </div>
      <div className="h-12 bg-[var(--color-taupe)]/25 rounded-full animate-pulse" />
    </div>
  );
}

const CoachingForm = dynamic(() => import('../form/CoachingForm'), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

export default function CoachingApplicationForm() {
  return <CoachingForm />;
}
