'use client';

import { useState } from 'react';

export default function TrainerMobile() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="lg:hidden fixed top-8 right-4 z-50">
      {/* Floating circular badge */}
      <div
        className={`relative cursor-pointer transition-all duration-500 ease-out ${
          isExpanded ? 'w-80' : 'w-24'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Outer glow/pulse animation to indicate it's tappable - only when collapsed */}
        {!isExpanded && (
          <div className="absolute inset-0 rounded-full bg-[#d2b48c]/20 animate-ping" style={{ animationDuration: '2s' }}></div>
        )}
        
        {/* Main circular badge */}
        <div className="relative bg-gradient-to-br from-[#d2b48c] to-[#d2b48c]/80 rounded-full shadow-2xl border-2 border-white/50 overflow-hidden transition-all duration-500">
          {!isExpanded ? (
            // Collapsed state - larger circular photo
            <div className="w-24 h-24 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d2b48c]/20 to-[#d9d4c7]/40 flex items-center justify-center border-2 border-white/80">
                <svg
                  className="w-10 h-10 text-black/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              {/* Tap indicator */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                <svg
                  className="w-4 h-4 text-[#d2b48c] animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          ) : (
            // Expanded state - shows full info with larger image
            <div className="p-4 space-y-3 min-w-[320px]">
              <div className="flex items-start gap-3">
                {/* Larger circular photo */}
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-[#d2b48c]/20 to-[#d9d4c7]/40 flex items-center justify-center border-2 border-white/80">
                  <svg
                    className="w-10 h-10 text-black/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-light text-sm mb-0.5 tracking-tight">Your Trainer</h3>
                  <div className="h-px w-8 bg-white/40 mb-1.5"></div>
                  <p className="text-white/90 text-xs font-light leading-snug">
                    Certified fitness professional with years of experience helping clients achieve their goals.
                  </p>
                </div>
                
                {/* Close indicator */}
                <button
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                >
                  <svg
                    className="w-4 h-4 text-white"
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
