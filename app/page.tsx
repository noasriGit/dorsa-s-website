'use client';

import Carousel from './components/Carousel';
import Footer from './components/Footer';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface ReviewData {
  quote: string;
  author: string;
  rating: number;
}

function DumbbellSpinner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force animation restart by removing and re-adding the class
    if (containerRef.current) {
      const container = containerRef.current;
      const img = container.querySelector('img');
      if (img) {
        img.style.animation = 'none';
        // Trigger reflow
        void img.offsetWidth;
        // Re-apply animation
        img.style.animation = 'dumbbellSpin 3s cubic-bezier(0.1, 0.7, 0.2, 1) forwards';
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="w-20 h-20 overflow-hidden relative">
      <Image
        src="/images/dumbell.png"
        alt="Dumbbell"
        fill
        className="object-cover"
        style={{
          transformOrigin: 'center center'
        }}
      />
    </div>
  );
}

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<'in-person' | 'online' | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedReview, setExpandedReview] = useState<ReviewData | null>(null);
  const [showInPersonContent, setShowInPersonContent] = useState(false);
  const [showOnlineContent, setShowOnlineContent] = useState(false);
  const [transformUnderlineProgress, setTransformUnderlineProgress] = useState(0);
  const [reviewsUnderlineProgress, setReviewsUnderlineProgress] = useState(0);
  const [inspireProgress, setInspireProgress] = useState(0);
  const [showTransformCarousel, setShowTransformCarousel] = useState(false);
  const [showReviewsCarousel, setShowReviewsCarousel] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const transformationTitleRef = useRef<HTMLHeadingElement>(null);
  const reviewsTitleRef = useRef<HTMLHeadingElement>(null);
  const transformCarouselRef = useRef<HTMLDivElement>(null);
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);
  const inspireRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === transformCarouselRef.current) {
            setShowTransformCarousel(true);
          }
          if (entry.target === reviewsCarouselRef.current) {
            setShowReviewsCarousel(true);
          }
        });
      },
      { threshold: 0.35 }
    );

    if (transformCarouselRef.current) {
      observer.observe(transformCarouselRef.current);
    }
    if (reviewsCarouselRef.current) {
      observer.observe(reviewsCarouselRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const viewHeight = window.innerHeight || 0;

      if (inspireRef.current) {
        const rect = inspireRef.current.getBoundingClientRect();
        const total = rect.height + viewHeight;
        const visible = Math.min(Math.max(viewHeight - rect.top, 0), total);
        const progress = Math.min(Math.max(visible / total, 0), 1);
        setInspireProgress(progress);
      }

      if (transformationTitleRef.current) {
        const titleRect = transformationTitleRef.current.getBoundingClientRect();
        const titleProgress = clamp((viewHeight - titleRect.top) / (viewHeight * 0.6), 0, 1);
        setTransformUnderlineProgress(titleProgress);
      }

      if (reviewsTitleRef.current) {
        const titleRect = reviewsTitleRef.current.getBoundingClientRect();
        const titleProgress = clamp((viewHeight - titleRect.top) / (viewHeight * 0.6), 0, 1);
        setReviewsUnderlineProgress(titleProgress);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    requestAnimationFrame(updateProgress);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    let inPersonTimer: ReturnType<typeof setTimeout> | null = null;
    let onlineTimer: ReturnType<typeof setTimeout> | null = null;

    if (expandedCard === 'in-person') {
      setShowInPersonContent(false);
      inPersonTimer = setTimeout(() => {
        setShowInPersonContent(true);
      }, 650);
    } else {
      setShowInPersonContent(false);
    }

    if (expandedCard === 'online') {
      setShowOnlineContent(false);
      onlineTimer = setTimeout(() => {
        setShowOnlineContent(true);
      }, 650);
    } else {
      setShowOnlineContent(false);
    }

    return () => {
      if (inPersonTimer) clearTimeout(inPersonTimer);
      if (onlineTimer) clearTimeout(onlineTimer);
    };
  }, [expandedCard]);

  const reviews: ReviewData[] = [
    {
      quote:
        "Dorsa is the BEST trainer! One of the nicest most easily approachable humans i've ever met that also WANTS to see you succeed!! When I first met her I said please help me look like you! I came to her defeated after years of trial and error with diet and different types of exercises classes and nothing was working for me. I though looking toned and being thin meant eating less and exercising more. Working one on one with dorsa has given me my confidence back and giving me the body I want, I've been able to eat more and lose body fat where before I never thought was possible! Teaching me how to actually fuel my body to support my goals! I would recommend her to anyone I know, THANK YOU DORSA!! She is a QUEEN!!!!",
      author: "Sonal S.",
      rating: 5,
    },
    {
      quote:
        "I've been working with Dorsa as my personal trainer for a few months now, and she's been amazing! Dorsa truly cares about her clinets! She takes the time to understand their goals and tailors their workouts to help them achieve those results. I always look forward to our sessions and leave feeling energized and ready to take on the day. Beyond just training, we also discuss nutrition, mental health, and exercises I can do outside of our sessions. I've noticed a significant positive shift in my lifestyle, and I can't thank her enough for all her support and guidance!",
      author: "Lily J.",
      rating: 5,
    },
    {
      quote:
        "Working with Dorsa has been such a game changer. She listens, pushes you in the best way, and makes the process feel doable even on busy weeks. I’ve learned how to train smarter, fuel my body properly, and stay consistent without burning out. The results have been incredible and I finally feel confident in my routine. I’m so grateful for her guidance and positive energy!",
      author: "Carmen A.",
      rating: 5,
    },
  ];

  const truncateReviewText = (text: string, maxChars = 120) => {
    if (text.length <= maxChars) return text;
    return `${text.slice(0, maxChars).trimEnd()}...`;
  };

  const faqItems: { question: string; paragraphs: string[] }[] = [
    {
      question: 'What is the difference b/w in-person training and online coaching?',
      paragraphs: [
        'In-person training is for those who want hands-on assistance in their training. Your workouts are fully customized to your goals. It\'s great for those who need accountability getting to the gym & sticking to their program. This is training in-person only, workouts outside of training days as well as nutrition counseling is excluded.',
        'Online coaching includes a fully customized program with workouts, nutrition, habit tracking, and weekly check-ins. This is a more hands-off approach where you\'ll receive your full program but you will need to make sure you show up for yourself daily. This is great for those with experience in the gym but need help in all areas of their fitness goals.',
      ],
    },
    {
      question: 'How long does it take to see results?',
      paragraphs: [
        'Most clients will see noticeable change within the first 6-8 weeks of consistency but lasting transformations take time to achieve. Results will vary depending on how consistent nutrition, training, sleep, etc. is.',
      ],
    },
    {
      question: 'What is your pricing like?',
      paragraphs: [
        'In-person training is billed based on how many sessions you\'d like to train for the month.',
        'Online coaching is billed monthly with a minimum 3-month commitment. After 3 months, it\'s month-to-month.',
      ],
    },
    {
      question: 'What if I need to travel or have a busy week?',
      paragraphs: [
        'Your plan is designed to fit into your lifestyle and schedule. We\'ll work together to adjust training and/or nutrition if something comes up or if you have to travel.',
      ],
    },
  ];

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);
  const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (inMin === inMax) return outMin;
    const normalized = (value - inMin) / (inMax - inMin);
    return outMin + clamp(normalized, 0, 1) * (outMax - outMin);
  };
  const fastProgress = clamp(inspireProgress * 1.8, 0, 1);

  return (
    <div className="min-h-screen overflow-x-hidden relative z-10">
      <section 
        id="hero-section" 
        className={`hero-image relative h-[95vh] overflow-hidden flex items-center justify-center overflow-x-hidden ${expandedCard ? '' : 'px-4 sm:px-6 lg:px-8'}`}
      >
        {/* Animated overlay */}
        <div 
          className="absolute inset-0 bg-[#d9d4c7] transition-opacity duration-700 ease-out z-0"
          style={{
            opacity: expandedCard ? 1 : 0.3
          }}
        />
        <div className={`w-full ${expandedCard ? 'h-full flex items-center justify-center' : 'max-w-6xl'} mx-auto ${expandedCard ? '' : 'py-24 sm:py-32'} relative z-10 ${expandedCard ? '' : 'translate-y-[11vh]'}`}>
          {/* Hero Content */}
          <div className={`text-center mb-8 sm:mb-10 transition-all duration-700 ease-out ${expandedCard ? 'hidden' : 'opacity-100 scale-100'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 transition-all duration-700 ease-out">
              Dorsa Wellness
          </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-light tracking-wide transition-all duration-700 ease-out">
              Premium personal training tailored to your goals
            </p>
          </div>

          {/* Coaching Cards */}
          <div className={`flex gap-6 sm:gap-8 w-full mx-auto transition-all duration-700 ${expandedCard ? 'justify-center items-center relative w-full h-full' : 'max-w-5xl justify-center items-center'}`}>
            {/* In Person Coaching Card */}
            <div 
              className={`group paper-card border border-black/10 rounded-lg transition-all duration-700 ease-out ${
                      expandedCard === 'in-person'
                        ? 'expanded-card w-[90vw] lg:w-[70vw] h-[70vh] p-6 sm:p-8 lg:p-10 fixed z-50 overflow-hidden'
                        : expandedCard === 'online'
                        ? 'w-0 opacity-0 pointer-events-none p-0 border-0 relative'
                        : 'w-1/2 h-[250px] sm:h-[400px] lg:h-[250px] p-6 sm:p-8 lg:p-10 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] hover:border-black/15 relative overflow-hidden'
              }`}
              style={expandedCard === 'in-person' ? {
                left: '50vw',
                top: '50vh',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
              } : undefined}
              onClick={() => {
                if (expandedCard === 'in-person') {
                  setExpandedCard(null);
                } else if (!expandedCard) {
                  setExpandedCard('in-person');
                }
              }}
            >
              {expandedCard === 'in-person' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                  }}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 text-black/70 hover:text-black transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
              <div className="absolute inset-0 rounded-lg bg-[#d2b48c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col h-full">
                <div className={expandedCard === 'in-person' ? 'mb-6 flex flex-col items-center text-center h-full' : 'mb-0 flex-1 flex flex-col justify-center'}>
                  {!expandedCard && (
                    <div className="w-12 h-12 rounded-full bg-[#d2b48c]/20 flex items-center justify-center mb-4 group-hover:bg-[#d2b48c]/30 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  )}
                  <h2
                    className={`expanded-card-title text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-light text-black mb-3 tracking-tight ${
                      expandedCard === 'in-person' ? 'md:text-5xl xl:text-5xl 2xl:text-6xl' : ''
                    }`}
                  >
                    In Person Coaching
                  </h2>
                  {expandedCard === 'in-person' && (
                    <div
                      className={`flex flex-col items-center text-center w-full max-w-2xl mx-auto transition-opacity duration-200 ${
                        showInPersonContent ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <p
                        className={`expanded-card-body text-black/70 text-sm sm:text-sm md:text-base leading-relaxed font-light mb-5 ${
                          expandedCard === 'in-person' ? 'md:text-xl md:leading-relaxed lg:text-base xl:text-lg 2xl:text-xl lg:leading-relaxed' : ''
                        }`}
                      >
                      One-on-one training sessions located in Tyson's Corner, VA, at $140 per hour. These private sessions focus entirely on you, with personalized workout programs built around your specific goals, fitness level, and schedule. Please note, this option does NOT include nutrition counseling. Training sessions are strictly dedicated to one-on-one, in-person workouts designed to maximize results. Ideal for clients who want hands-on coaching
                      </p>
                      <div className="flex justify-center mt-2 sm:mt-10 mb-2" key={`dumbbell-in-person-${expandedCard}`}>
                        <DumbbellSpinner />
                      </div>
                      <div className="mt-6 flex items-center justify-center gap-3">
                        <svg
                          className="w-10 h-3 text-[#d2b48c]"
                          viewBox="0 0 40 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M2 6c6-6 14-6 20 0" />
                        </svg>
                        <a
                          href="https://forms.gle/9K27Ks7DD8j2nSgL8"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`expanded-card-cta px-8 py-3 bg-[#d2b48c] text-black rounded-full border border-black/10 hover:bg-[#d2b48c]/90 transition-colors duration-300 text-base font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${
                            expandedCard === 'in-person' ? 'md:text-xl lg:text-lg xl:text-xl' : ''
                          }`}
                        >
                          Apply Now
                        </a>
                        <svg
                          className="w-10 h-3 text-[#d2b48c]"
                          viewBox="0 0 40 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M38 6c-6-6-14-6-20 0" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                {!expandedCard && (
                  <div className="flex items-center text-black/70 group-hover:text-black transition-colors duration-300 text-sm md:text-base lg:text-base font-light">
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Online Coaching Card */}
            <div 
              className={`group paper-card border border-black/10 rounded-lg transition-all duration-700 ease-out ${
                expandedCard === 'online'
                  ? 'expanded-card w-[90vw] lg:w-[70vw] h-[70vh] p-6 sm:p-8 lg:p-10 fixed z-50 overflow-hidden'
                  : expandedCard === 'in-person'
                  ? 'w-0 opacity-0 pointer-events-none p-0 border-0 relative'
                  : 'w-1/2 h-[250px] sm:h-[400px] lg:h-[250px] p-6 sm:p-8 lg:p-10 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] hover:border-black/15 relative overflow-hidden'
              }`}
              style={expandedCard === 'online' ? {
                left: '50vw',
                top: '50vh',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
              } : undefined}
              onClick={() => {
                if (expandedCard === 'online') {
                  setExpandedCard(null);
                } else if (!expandedCard) {
                  setExpandedCard('online');
                }
              }}
            >
              {expandedCard === 'online' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                  }}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 text-black/70 hover:text-black transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
              <div className="absolute inset-0 rounded-lg bg-[#d2b48c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col h-full">
                <div className={expandedCard === 'online' ? 'mb-6 flex flex-col items-center text-center h-full' : 'mb-0 flex-1 flex flex-col justify-center'}>
                  {!expandedCard && (
                    <div className="w-12 h-12 rounded-full bg-[#d2b48c]/20 flex items-center justify-center mb-4 group-hover:bg-[#d2b48c]/30 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  )}
                  <h2
                    className={`expanded-card-title text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-light text-black mb-3 tracking-tight ${
                      expandedCard === 'online' ? 'md:text-5xl xl:text-5xl 2xl:text-6xl' : ''
                    }`}
                  >
                    Online Coaching
                  </h2>
                  {expandedCard === 'online' && (
                    <div
                      className={`flex flex-col items-center text-center w-full max-w-2xl mx-auto transition-opacity duration-200 ${
                        showOnlineContent ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <p
                        className={`expanded-card-body text-black/70 text-sm sm:text-sm md:text-base leading-relaxed font-light mb-5 ${
                          expandedCard === 'online' ? 'md:text-xl md:leading-relaxed lg:text-base xl:text-lg 2xl:text-xl lg:leading-relaxed' : ''
                        }`}
                      >
                        My 1:1 coaching program designed to seamlessly fit into your lifestyle. Unlike in-person training, my online coaching gives you exclusive access to my app, where you'll find a personalized workout plan with video demos, nutrition guidance, habit tracking, and ongoing support from me. This approach ensures you reach your goals without restrictive measures, making fitness work for your busy life, not against it.
                      </p>
                      <div className="flex justify-center mt-2 sm:mt-10 mb-2" key={`dumbbell-in-person-${expandedCard}`}>
                        <DumbbellSpinner />
                      </div>
                      <div className="mt-6 flex items-center justify-center gap-3">
                        <svg
                          className="w-10 h-3 text-[#d2b48c]"
                          viewBox="0 0 40 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M2 6c6-6 14-6 20 0" />
                        </svg>
                        <a
                          href="https://forms.gle/9K27Ks7DD8j2nSgL8"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`expanded-card-cta px-8 py-3 bg-[#d2b48c] text-black rounded-full border border-black/10 hover:bg-[#d2b48c]/90 transition-colors duration-300 text-base font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${
                            expandedCard === 'online' ? 'md:text-xl lg:text-lg xl:text-xl' : ''
                          }`}
                        >
                          Apply Now
                        </a>
                        <svg
                          className="w-10 h-3 text-[#d2b48c]"
                          viewBox="0 0 40 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M38 6c-6-6-14-6-20 0" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                {!expandedCard && (
                  <div className="flex items-center text-black/70 group-hover:text-black transition-colors duration-300 text-sm md:text-base lg:text-base font-light">
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Scroll Arrow */}
        {!expandedCard && (
          <div className="absolute bottom-8 left-1/2 z-20" style={{ transform: 'translateX(-50%)' }}>
            <button
              onClick={() => {
                const nextSection = document.querySelector('section:not(#hero-section)');
                nextSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center text-white hover:text-white/80 transition-colors duration-300 animate-bounce-arrow"
              aria-label="Scroll to next section"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Before & After Carousel Section */}
      <section className="py-24 sm:py-32 bg-[#d9d4c7] paper-bg pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              ref={transformationTitleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight"
            >
              <span
                className="underline-animate"
                style={{ ['--underline-progress' as unknown as string]: `${transformUnderlineProgress}` }}
              >
                Transformations
              </span>
            </h2>
          </div>
          <div
            ref={transformCarouselRef}
            className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
              showTransformCarousel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Carousel
              items={[
                {
                  id: '1',
                  content: (
                    <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src="/images/transformation1.JPG"
                          alt="Transformation 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: '2',
                  content: (
                    <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src="/images/Transformation3.JPG"
                          alt="Transformation 3"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: '3',
                  content: (
                    <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src="/images/IMG_4397.JPG"
                          alt="Client transformation — gallery image 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: '4',
                  content: (
                    <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src="/images/IMG_4712.JPG"
                          alt="Client transformation result — gallery image 2"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: '5',
                  content: (
                    <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src="/images/IMG_4713.JPG"
                          alt="Client transformation result — gallery image 3"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
              autoPlay={true}
              autoPlayInterval={5000}
              dotsClassName="mt-0 -translate-y-9"
              onItemClick={(index) => {
                const images = [
                  '/images/transformation1.JPG',
                  '/images/Transformation3.JPG',
                  '/images/IMG_4397.JPG',
                  '/images/IMG_4712.JPG',
                  '/images/IMG_4713.JPG',
                ];
                setExpandedImage(images[index]);
              }}
            />
          </div>
        </div>
      </section>

      {/* Inspirational Scroll Section */}
      <section
        ref={inspireRef}
        className="relative py-20 sm:py-28 bg-[#d9d4c7] paper-bg overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/5a192ab735ebd4ffec0cbd12af756755-floral-swirls-divider-12.webp"
            alt=""
            width={160}
            height={28}
            className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-90 brightness-0 invert rotate-180"
          />
          <Image
            src="/images/5a192ab735ebd4ffec0cbd12af756755-floral-swirls-divider-12.webp"
            alt=""
            width={160}
            height={28}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-90 brightness-0 invert"
          />
          <div
            className="absolute left-6 top-10 h-24 w-24 rounded-full border border-white/50"
            style={{
              transform: `translate(${fastProgress * 70}px, ${fastProgress * 25}px) rotate(${fastProgress * 40}deg)`,
              opacity: 0.65,
            }}
          />
          <div
            className="absolute right-10 top-14 h-28 w-28 rounded-full bg-white/10"
            style={{
              transform: `translate(${fastProgress * -45}px, ${fastProgress * 45}px) scale(${0.9 + fastProgress * 0.2})`,
              opacity: 0.55,
            }}
          />
          <div
            className="absolute left-1/4 bottom-8 h-16 w-16 rounded-full bg-[#d2b48c]/30"
            style={{
              transform: `translate(${fastProgress * 35}px, ${fastProgress * -35}px) rotate(${fastProgress * -45}deg)`,
              opacity: 0.6,
            }}
          />
          <div
            className="absolute right-1/4 bottom-6 h-20 w-20 rounded-full border border-black/10"
            style={{
              transform: `translate(${fastProgress * -40}px, ${fastProgress * -30}px) rotate(${fastProgress * 30}deg)`,
              opacity: 0.6,
            }}
          />
          <div
            className="absolute left-1/2 top-6 h-10 w-36 rounded-full bg-white/10 blur-sm"
            style={{
              transform: `translate(${fastProgress * -60}px, ${fastProgress * 10}px) scaleX(${0.8 + fastProgress * 0.3})`,
              opacity: 0.5,
            }}
          />
          <div
            className="absolute right-12 bottom-14 h-12 w-12 rounded-full bg-white/20 blur-[2px]"
            style={{
              transform: `translate(${fastProgress * -20}px, ${fastProgress * -45}px) scale(${0.7 + fastProgress * 0.5})`,
              opacity: 0.45,
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal text-white tracking-tight mb-6">
            <span
              className="inline-block"
              style={{
                transform: `translate(${mapRange(fastProgress, 0, 1, -10, 0)}px, ${mapRange(fastProgress, 0, 1, 30, 0)}px) rotate(${mapRange(fastProgress, 0, 1, -2, 0)}deg) scale(${mapRange(fastProgress, 0, 1, 0.98, 1)})`,
                opacity: Math.min(1, fastProgress * 1.1),
              }}
            >
              Your Journey.
            </span>{' '}
            <span
              className="inline-block"
              style={{
                transform: `translate(${mapRange(fastProgress, 0.1, 1, 12, 0)}px, ${mapRange(fastProgress, 0.1, 1, 36, 0)}px) rotate(${mapRange(fastProgress, 0.1, 1, 3, 0)}deg) scale(${mapRange(fastProgress, 0.1, 1, 0.97, 1)})`,
                opacity: Math.min(1, mapRange(fastProgress, 0.1, 1, 0, 1)),
              }}
            >
              Your
            </span>{' '}
            <span
              className="inline-block"
              style={{
                transform: `translate(${mapRange(fastProgress, 0.2, 1, -14, 0)}px, ${mapRange(fastProgress, 0.2, 1, 42, 0)}px) rotate(${mapRange(fastProgress, 0.2, 1, -4, 0)}deg) scale(${mapRange(fastProgress, 0.2, 1, 0.96, 1)})`,
                opacity: Math.min(1, mapRange(fastProgress, 0.2, 1, 0, 1)),
              }}
            >
              Results.
            </span>
          </h3>
          <p
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-white/90 font-normal leading-relaxed"
            style={{
              transform: `translate(${mapRange(fastProgress, 0, 1, 10, 0)}px, ${mapRange(fastProgress, 0, 1, 28, 0)}px)`,
              opacity: Math.min(1, fastProgress * 1.05),
            }}
          >
            The results you see here come from consistency, hard work, and personalized 1:1 coaching. No two journeys are the same, but each one is guided with intention, support, and a focus on long term success.
          </p>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <section className="pt-12 sm:pt-16 pb-24 sm:pb-32 bg-[#d9d4c7] paper-bg reviews-no-scroll">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reviews-no-scroll">
          <div className="text-center mb-12">
            <h2
              ref={reviewsTitleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight"
            >
              <span
                className="underline-animate"
                style={{ ['--underline-progress' as unknown as string]: `${reviewsUnderlineProgress}` }}
              >
                Client Reviews
              </span>
            </h2>
          </div>
          <div
            ref={reviewsCarouselRef}
            className={`max-w-4xl mx-auto reviews-no-scroll transition-all duration-1000 ease-out ${
              showReviewsCarousel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Carousel
              items={reviews.map((review, index) => ({
                id: `${index + 1}`,
                content: (
                  <div className="paper-card bg-[#fefefe] rounded-lg border border-black/10 p-4 sm:p-5 lg:p-6 relative h-full w-full flex flex-col">
                    {/* Decorative flowers */}
                    <div className="absolute top-2 left-2 opacity-15">
                      <Image
                        src="/images/flower.png"
                        alt=""
                        width={24}
                        height={24}
                        className="transform -rotate-12"
                      />
                    </div>
                    <div className="absolute top-2 right-2 opacity-15">
                      <Image
                        src="/images/flower.png"
                        alt=""
                        width={20}
                        height={20}
                        className="transform rotate-12"
                      />
                    </div>
                    <div className="absolute bottom-2 left-3 opacity-15">
                      <Image
                        src="/images/flower.png"
                        alt=""
                        width={18}
                        height={18}
                        className="transform rotate-45"
                      />
                    </div>
                    <div className="absolute bottom-2 right-3 opacity-15">
            <Image
                        src="/images/flower.png"
                        alt=""
                        width={22}
                        height={22}
                        className="transform -rotate-30"
                      />
                    </div>

                    {/* Quote content */}
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      {/* Star rating */}
                      <div className="flex justify-center mb-3">
                        {Array.from({ length: review.rating }).map((_, starIndex) => (
                          <svg
                            key={starIndex}
                            className="w-3 h-3 lg:w-4 lg:h-4 text-[#d2b48c] fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote text */}
                      <blockquote className="text-center mb-3 flex-1 flex items-center">
                        <p className="text-[11px] sm:text-xs md:text-sm lg:text-sm xl:text-base text-black/80 font-light leading-snug italic">
                          "{truncateReviewText(review.quote)}"
                        </p>
                      </blockquote>

                      {/* Author */}
                      <div className="text-center">
                        <p className="text-black/60 font-light text-xs md:text-sm lg:text-sm">
                          — {review.author}
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              }))}
              autoPlay={true}
              autoPlayInterval={6000}
              onItemClick={(index) => {
                setExpandedReview(reviews[index]);
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pt-8 sm:pt-12 pb-24 sm:pb-32 bg-[#d9d4c7] paper-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
              FAQ
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
                  className="paper-card rounded-lg border border-black/10 bg-[#fefefe] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-black/[0.02] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base md:text-lg font-light text-black/90 leading-snug pr-2">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 mt-0.5 text-[#d2b48c] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      aria-hidden
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-black/5">
                        <div className="pt-4 space-y-3">
                          {item.paragraphs.map((p, pi) => (
                            <p
                              key={pi}
                              className="text-sm sm:text-base text-black/75 font-light leading-relaxed"
                            >
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(null);
              }}
              className="absolute top-4 right-4 z-10 text-white hover:text-white/80 transition-colors duration-200 bg-black/50 rounded-full p-2"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-full max-w-5xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={expandedImage}
                alt="Expanded view"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </div>
        </div>
      )}

      {/* Expanded Review Modal */}
      {expandedReview && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setExpandedReview(null)}
        >
          <div className="paper-card bg-[#fefefe] rounded-lg border border-black/10 max-w-2xl lg:max-w-3xl w-full mx-4 p-8 sm:p-12 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setExpandedReview(null)}
              className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors duration-200"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            {/* Decorative flowers */}
            <div className="absolute top-4 left-4 opacity-15">
              <Image
                src="/images/flower.png"
                alt=""
                width={40}
                height={40}
                className="transform -rotate-12"
              />
            </div>
            <div className="absolute top-4 right-12 opacity-15">
              <Image
                src="/images/flower.png"
                alt=""
                width={35}
                height={35}
                className="transform rotate-12"
              />
            </div>
            <div className="absolute bottom-4 left-6 opacity-15">
              <Image
                src="/images/flower.png"
                alt=""
                width={30}
                height={30}
                className="transform rotate-45"
              />
            </div>
            <div className="absolute bottom-4 right-6 opacity-15">
              <Image
                src="/images/flower.png"
                alt=""
                width={38}
                height={38}
                className="transform -rotate-30"
              />
            </div>

            <div className="relative z-10">
              {/* Star rating */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: expandedReview.rating }).map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className="w-6 h-6 text-[#d2b48c] fill-current"
                    viewBox="0 0 20 20"
          >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              
              {/* Quote text */}
              <blockquote className="text-center mb-6">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-black/80 font-light leading-snug italic">
                  "{expandedReview.quote}"
                </p>
              </blockquote>
              
              {/* Author */}
              <div className="text-center">
                <p className="text-black/60 font-light text-lg sm:text-xl md:text-2xl lg:text-2xl">
                  — {expandedReview.author}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
