'use client';

import dynamic from 'next/dynamic';

function FormSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="space-y-3">
        <div className="h-3 w-24 animate-pulse bg-white/10" />
        <div className="h-px bg-white/10">
          <div className="h-px w-1/3 bg-white/40" />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-3.5 w-2/5 animate-pulse bg-white/10" />
          <div className="h-[3.25rem] animate-pulse border border-white/10 bg-white/[0.03]" />
        </div>
      ))}
      <div className="h-[3.25rem] w-40 animate-pulse bg-white/15" />
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
