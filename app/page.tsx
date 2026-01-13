'use client';

import TrainerOval from './components/TrainerOval';
import Carousel from './components/Carousel';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<'in-person' | 'online' | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section 
        id="hero-section" 
        className={`relative h-screen overflow-hidden flex items-center justify-center bg-center bg-no-repeat overflow-x-hidden ${expandedCard ? '' : 'px-4 sm:px-6 lg:px-8'}`}
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
        <div className={`w-full ${expandedCard ? '' : 'max-w-6xl'} mx-auto py-24 sm:py-32 relative z-10`}>
          {/* Hero Content */}
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ease-out ${expandedCard ? 'hidden' : 'opacity-100 scale-100'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-6 transition-all duration-700 ease-out">
              Dorsa Wellness
          </h1>
            <p className="text-lg sm:text-xl text-black/70 max-w-2xl mx-auto font-light tracking-wide transition-all duration-700 ease-out">
              Premium personal training tailored to your goals
            </p>
          </div>

          {/* Coaching Cards */}
          <div className={`flex gap-6 sm:gap-8 w-full mx-auto transition-all duration-700 ${expandedCard ? 'justify-center relative' : 'max-w-5xl justify-center items-center'}`}>
            {/* In Person Coaching Card */}
            <div 
              className={`group bg-white border border-black/20 rounded-lg transition-all duration-700 ease-out overflow-hidden ${
                      expandedCard === 'in-person'
                        ? 'w-[90vw] lg:w-[70vw] h-[80vh] p-8 sm:p-12 lg:p-16 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                        : expandedCard === 'online'
                        ? 'w-0 opacity-0 pointer-events-none p-0 relative'
                        : 'w-1/2 p-6 sm:p-8 lg:p-10 cursor-pointer hover:border-black/40 hover:shadow-lg relative'
              }`}
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
                <div className={expandedCard === 'in-person' ? 'mb-6' : 'mb-0 flex-1 flex flex-col justify-center'}>
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
              className={`group bg-white border border-black/20 rounded-lg transition-all duration-700 ease-out overflow-hidden ${
                expandedCard === 'online'
                  ? 'w-[90vw] lg:w-[70vw] h-[80vh] p-8 sm:p-12 lg:p-16 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  : expandedCard === 'in-person'
                  ? 'w-0 opacity-0 pointer-events-none p-0 border-0 relative'
                  : 'w-1/2 p-6 sm:p-8 lg:p-10 cursor-pointer hover:border-black/40 hover:shadow-lg relative'
              }`}
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
      </section>

      {/* Before & After Carousel Section */}
      <section className="py-24 sm:py-32 bg-[#d9d4c7] overflow-x-hidden pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-light text-black mb-4 tracking-tight">
              Transformations
            </h2>
            <p className="text-lg text-black/70 font-light">
              Real results from real clients
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-hidden">
            <Carousel
              items={[
                {
                  id: '1',
                  imageSrc: '/images/transformation1.JPG',
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
                  imageSrc: '/images/Transformation2.JPG',
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
                  imageSrc: '/images/Transformation3.JPG',
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
            />
          </div>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <section className="pt-12 sm:pt-16 pb-24 sm:pb-32 bg-#d9d4c7 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-light text-black mb-4 tracking-tight">
              Client Reviews
            </h2>
            <p className="text-lg text-black/70 font-light">
              What our clients say
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-hidden">
            <Carousel
              items={[
                {
                  id: '1',
                  imageSrc: '/images/review1.jpeg',
                  content: (
                    <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src="/images/review1.jpeg"
                          alt="Client Review 1"
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
                  imageSrc: '/images/review2.jpeg',
                  content: (
                    <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                      <div className="aspect-[4/3] relative">
            <Image
                          src="/images/review2.jpeg"
                          alt="Client Review 2"
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
              autoPlayInterval={6000}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
