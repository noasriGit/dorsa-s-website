import Image from 'next/image';
import { about } from '@/lib/content';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  return (
    <section id="about" className="section-padding bg-[var(--color-beige)]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-black/8 max-w-md mx-auto lg:mx-0 w-full">
            <Image
              src={about.image}
              alt="Dorsa Wellness"
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 80vw, 400px"
            />
          </div>

          <div>
            <SectionHeading title={about.title} align="left" />
            <div className="space-y-4 text-[var(--color-muted)] font-light leading-relaxed whitespace-pre-line mb-8">
              {about.body}
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-[var(--color-charcoal)] mb-4">
                Credentials
              </h3>
              <ul className="space-y-3">
                {about.credentials.map((cred) => (
                  <li key={cred} className="flex gap-3 text-[var(--color-muted)] font-light">
                    <span className="text-[var(--color-taupe)] shrink-0 mt-0.5" aria-hidden>
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {cred}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
