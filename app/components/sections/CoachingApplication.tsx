import { application } from '@/lib/content';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import CoachingApplicationForm from './CoachingApplicationForm';

export default function CoachingApplication() {
  return (
    <section id="apply" className="section-padding bg-[var(--color-cream)]">
      <div className="section-container max-w-2xl">
        <SectionHeading title={application.title} subtitle={application.intro} />

        <Card id="apply-form" className="p-4 sm:p-6 lg:p-8">
          <CoachingApplicationForm />
        </Card>

        <p className="mt-6 text-xs sm:text-sm text-[var(--color-muted)] font-light text-center leading-relaxed">
          {application.privacyNote}
        </p>
      </div>
    </section>
  );
}
