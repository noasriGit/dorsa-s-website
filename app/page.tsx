'use client';

import TrainerOval from './components/TrainerOval';
import Carousel from './components/Carousel';
import Navbar from './components/Navbar';
import FallingFlowers from './components/FallingFlowers';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewData {
  quote: string;
  author: string;
  rating: number;
}

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<'in-person' | 'online' | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedReview, setExpandedReview] = useState<ReviewData | null>(null);

  const reviews: ReviewData[] = [
    {
      quote: "Dorsa transformed my entire approach to fitness. The personalized training sessions and constant support made all the difference in achieving my goals.",
      author: "Sarah M.",
      rating: 5,
    },
    {
      quote: "The online coaching program is incredibly flexible and effective. I've seen amazing results while working around my busy schedule.",
      author: "Jessica L.",
      rating: 5,
    },
    {
      quote: "I can't recommend Dorsa enough. The attention to detail and personalized approach helped me achieve results I never thought possible.",
      author: "Emily R.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative z-10">
      <Navbar />
      <FallingFlowers isActive={expandedCard !== null} />
      <section 
        id="hero-section" 
        className={`relative h-[95vh] overflow-hidden flex items-center justify-center bg-center bg-no-repeat overflow-x-hidden ${expandedCard ? '' : 'px-4 sm:px-6 lg:px-8'}`}
        style={{
          backgroundImage: `url('/images/heroimage.JPG')`,
          backgroundColor: '#d9d4c7'
        }}
      >
        {/* Animated overlay */}
        <div 
          className="absolute inset-0 bg-[#d9d4c7] transition-opacity duration-700 ease-out z-0"
          style={{
            opacity: expandedCard ? 1 : 0.75
          }}
        />
        <TrainerOval />
        <div className={`w-full ${expandedCard ? 'h-full flex items-center justify-center' : 'max-w-6xl'} mx-auto ${expandedCard ? '' : 'py-24 sm:py-32'} relative z-10`}>
          {/* Hero Content */}
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ease-out ${expandedCard ? 'hidden' : 'opacity-100 scale-100'}`}>
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
              className={`group paper-card border border-black/10 rounded-lg overflow-hidden transition-all duration-700 ease-out ${
                      expandedCard === 'in-person'
                        ? 'w-[90vw] lg:w-[70vw] h-[80vh] p-8 sm:p-12 lg:p-16 fixed z-50'
                        : expandedCard === 'online'
                        ? 'w-0 opacity-0 pointer-events-none p-0 border-0 relative'
                        : 'w-1/2 p-6 sm:p-8 lg:p-10 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] hover:border-black/15 relative'
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
              <div className="absolute inset-0 rounded-lg bg-[#d2b48c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col h-full">
                <div className={expandedCard === 'in-person' ? 'mb-6 flex flex-col items-center text-center' : 'mb-0 flex-1 flex flex-col justify-center'}>
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
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-3 tracking-tight">
                    In Person Coaching
                  </h2>
                  {expandedCard === 'in-person' && (
                    <p className="text-black/60 text-base sm:text-lg leading-relaxed font-light transition-all duration-500">
                      One-on-one training sessions at our premium facility. Receive personalized guidance and motivation in a dedicated training environment. Our state-of-the-art facility is equipped with the latest fitness equipment and provides the perfect atmosphere for achieving your fitness goals. Work directly with your trainer to develop a customized program that fits your schedule and targets your specific objectives.
                    </p>
                  )}
                </div>
                {!expandedCard && (
                  <div className="flex items-center text-black/70 group-hover:text-black transition-colors duration-300 text-sm font-light">
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
                {expandedCard === 'in-person' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(null);
                    }}
                    className="mt-6 flex items-center text-black/70 hover:text-black transition-colors duration-300 text-sm font-light"
                  >
                    <svg
                      className="w-4 h-4 mr-2 transform rotate-180"
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
                    <span>Close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Online Coaching Card */}
            <div 
              className={`group paper-card border border-black/10 rounded-lg overflow-hidden transition-all duration-700 ease-out ${
                expandedCard === 'online'
                  ? 'w-[90vw] lg:w-[70vw] h-[80vh] p-8 sm:p-12 lg:p-16 fixed z-50'
                  : expandedCard === 'in-person'
                  ? 'w-0 opacity-0 pointer-events-none p-0 border-0 relative'
                  : 'w-1/2 p-6 sm:p-8 lg:p-10 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] hover:border-black/15 relative'
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
              <div className="absolute inset-0 rounded-lg bg-[#d2b48c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col h-full">
                <div className={expandedCard === 'online' ? 'mb-6' : 'mb-0 flex-1 flex flex-col justify-center'}>
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
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-3 tracking-tight">
                    Online Coaching
                  </h2>
                  {expandedCard === 'online' && (
                    <p className="text-black/60 text-base sm:text-lg leading-relaxed font-light transition-all duration-500">
                      Flexible training programs designed for your schedule. Custom workout plans, nutrition guidance, and continuous support from anywhere. Access your personalized training program through our online platform, receive real-time feedback, and stay connected with your trainer no matter where you are. Perfect for busy professionals who want to maintain their fitness goals without compromising their schedule.
                    </p>
                  )}
                </div>
                {!expandedCard && (
                  <div className="flex items-center text-black/70 group-hover:text-black transition-colors duration-300 text-sm font-light">
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
                {expandedCard === 'online' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(null);
                    }}
                    className="mt-6 flex items-center text-black/70 hover:text-black transition-colors duration-300 text-sm font-light"
                  >
                    <svg
                      className="w-4 h-4 mr-2 transform rotate-180"
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
                    <span>Close</span>
                  </button>
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
      <section className="py-24 sm:py-32 bg-[#d9d4c7] paper-bg overflow-x-hidden pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-light text-white tracking-tight">
              Transformations
            </h2>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-hidden">
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
                          src="/images/Transformation2.JPG"
                          alt="Transformation 2"
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
              ]}
              autoPlay={true}
              autoPlayInterval={5000}
              onItemClick={(index) => {
                const images = ['/images/transformation1.JPG', '/images/Transformation2.JPG', '/images/Transformation3.JPG'];
                setExpandedImage(images[index]);
              }}
            />
          </div>
        </div>
      </section>

      {/* Divider Image */}
      <div className="w-full bg-[#d9d4c7] paper-bg flex justify-center py-15 sm:py-4 overflow-hidden">
        <div className="w-full max-w-4xl h-16 sm:h-20 relative">
          <Image
            src="/images/5a192ab735ebd4ffec0cbd12af756755-floral-swirls-divider-12.webp"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Reviews Carousel Section */}
      <section className="pt-12 sm:pt-16 pb-24 sm:pb-32 bg-[#d9d4c7] paper-bg overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-light text-white tracking-tight">
              Client Reviews
            </h2>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-hidden">
            <Carousel
              items={[
                {
                  id: '1',
                  content: (
                    <div className="paper-card bg-[#fefefe] rounded-lg border border-black/10 p-4 sm:p-5 relative h-full w-full flex flex-col">
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
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-3 h-3 text-[#d2b48c] fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        
                        {/* Quote text */}
                        <blockquote className="text-center mb-3 flex-1 flex items-center">
                          <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed italic">
                            "Dorsa transformed my entire approach to fitness. The personalized training sessions and constant support made all the difference."
                          </p>
                        </blockquote>
                        
                        {/* Author */}
                        <div className="text-center">
                          <p className="text-black/60 font-light text-xs">
                            — Sarah M.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: '2',
                  content: (
                    <div className="paper-card bg-[#fefefe] rounded-lg border border-black/10 p-4 sm:p-5 relative h-full w-full flex flex-col">
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
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-3 h-3 text-[#d2b48c] fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        
                        {/* Quote text */}
                        <blockquote className="text-center mb-3 flex-1 flex items-center">
                          <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed italic">
                            "The online coaching program is incredibly flexible and effective. I've seen amazing results while working around my busy schedule."
                          </p>
                        </blockquote>
                        
                        {/* Author */}
                        <div className="text-center">
                          <p className="text-black/60 font-light text-xs">
                            — Jessica L.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: '3',
                  content: (
                    <div className="paper-card bg-[#fefefe] rounded-lg border border-black/10 p-4 sm:p-5 relative h-full w-full flex flex-col">
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
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-3 h-3 text-[#d2b48c] fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        
                        {/* Quote text */}
                        <blockquote className="text-center mb-3 flex-1 flex items-center">
                          <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed italic">
                            "I can't recommend Dorsa enough. The attention to detail and personalized approach helped me achieve results I never thought possible."
                          </p>
                        </blockquote>
                        
                        {/* Author */}
                        <div className="text-center">
                          <p className="text-black/60 font-light text-xs">
                            — Emily R.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
              autoPlay={true}
              autoPlayInterval={6000}
              onItemClick={(index) => {
                setExpandedReview(reviews[index]);
              }}
            />
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
          <div className="paper-card bg-[#fefefe] rounded-lg border border-black/10 max-w-2xl w-full mx-4 p-8 sm:p-12 relative" onClick={(e) => e.stopPropagation()}>
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
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-6 h-6 text-[#d2b48c] fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              
              {/* Quote text */}
              <blockquote className="text-center mb-6">
                <p className="text-xl sm:text-2xl lg:text-3xl text-black/80 font-light leading-relaxed italic">
                  "{expandedReview.quote}"
                </p>
              </blockquote>
              
              {/* Author */}
              <div className="text-center">
                <p className="text-black/60 font-light text-lg sm:text-xl">
                  — {expandedReview.author}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
