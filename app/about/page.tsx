'use client';

import Image from 'next/image';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-[#d9d4c7] paper-bg overflow-x-hidden">
        {/* Hero */}
        <section
          id="hero-section"
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <Image
            src="/images/ovalimage.JPG"
            alt="Dorsa Wellness training"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 15%' }}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 max-w-4xl text-center text-white py-24">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-6">
              About Me
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-light leading-relaxed text-white/90">
              My passion for fitness started over a decade ago, back when I was juggling school
              and corporate life. My own struggle with burnout led me to prioritize health and
              fitness, shaping my approach to coaching. I meet you where you are while
              challenging you to push just 1% further each day. True transformation isn&apos;t just
              physical—it&apos;s mental and emotional too, and my goal is to help you build lasting
              habits that support every aspect of your well-being while getting the results you
              want whether that&apos;s fat loss and body recomposition, weight loss, etc
            </p>
          </div>
        </section>

        {/* Credentials */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black tracking-tight mb-8 sm:mb-10">
            Credentials
          </h2>
          <ul className="space-y-4 sm:space-y-5 text-base sm:text-lg md:text-xl text-black/80 font-light leading-relaxed">
            <li className="flex gap-3">
              <span className="text-[#d2b48c] shrink-0 mt-1.5" aria-hidden>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>ACE Certified Personal Trainer</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d2b48c] shrink-0 mt-1.5" aria-hidden>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>ACE Certified Prenatal &amp; Postpartum</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
