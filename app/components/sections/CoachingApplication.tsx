import { application } from '@/lib/content';
import CoachingApplicationForm from './CoachingApplicationForm';
import { delay } from '../ui/motion';

export default function CoachingApplication() {
  return (
    <section id="apply" aria-labelledby="apply-title" className="section border-t border-white/10 bg-ink-2">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pr-10">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <p className="eyebrow" data-reveal>
              <span className="tabular-nums">07</span>
              <span aria-hidden className="opacity-40">
                /
              </span>
              <span>{application.eyebrow}</span>
            </p>
            <h2 id="apply-title" className="display-lg mt-7 text-balance" data-reveal style={delay(80)}>
              {application.title} <span className="accent">{application.titleAccent}</span>
            </h2>
            <p className="lede mt-8 max-w-md" data-reveal style={delay(140)}>
              {application.intro}
            </p>

            <ol className="mt-12 border-t border-white/10" data-reveal style={delay(200)}>
              {application.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-white/10 py-6">
                  <span className="label tabular-nums pt-1 text-white/40">0{i + 1}</span>
                  <div>
                    <p className="text-lg text-white">{s.title}</p>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-white/55">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            id="apply-form"
            className="border border-white/12 bg-ink p-5 sm:p-10 xl:p-12"
            data-reveal="fade"
          >
            <CoachingApplicationForm />
          </div>
          <p className="mt-6 max-w-xl text-[0.8rem] leading-relaxed text-white/40">
            {application.privacyNote}
          </p>
        </div>
      </div>
    </section>
  );
}
