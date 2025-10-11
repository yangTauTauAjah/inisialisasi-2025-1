'use client'

import React, { useRef, useState } from 'react';

const outfitSlides = [
  {
    alt: 'Outfit Boy',
    src: '/outfit-boy.png',
  },
  {
    alt: 'Outfit Girl',
    src: '/outfit-girl.png',
  }
];

const OutfitSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const slide = scrollRef.current.children[index] as HTMLElement;
      if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const slideWidth = offsetWidth;
      const index = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % outfitSlides.length;
    setCurrentSlide(next);
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + outfitSlides.length) % outfitSlides.length;
    setCurrentSlide(prev);
    scrollToSlide(prev);
  };

  return (
    <section id="outfit" className="relative py-16 bg-primary-bg">
      <div className="max-w-6xl mx-auto px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-7xl text-uppercase letter-spacing-heading font-sacco">
            INISIALISASI 2025{' '}
            <span
              className="italic"
              style={{
                color: '#0D89E9',
                textShadow: '0px 4.66px 52.43px rgba(50, 95, 236, 0.25)',
              }}
            >
              OUTFIT
            </span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Slides - Scrollable with Snap */}
          <div
            ref={scrollRef}
            className="relative h-[420px] md:h-[520px] flex overflow-x-auto rounded-xl bg-secondary-bg scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onScroll={handleScroll}
          >
            {outfitSlides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full flex items-center justify-center snap-center"
                style={{ minWidth: '100%' }}
                aria-hidden={index !== currentSlide}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="max-h-full max-w-full object-contain mx-auto"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {outfitSlides.length > 1 && (
            <>
              <button
                onClick={() => {
                  if (currentSlide === 0) {
                    setCurrentSlide(outfitSlides.length - 1);
                    scrollToSlide(outfitSlides.length - 1);
                  } else {
                    prevSlide();
                  }
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-accent-text/20 hover:bg-accent-text/40 text-white rounded-full flex items-center justify-center transition-colors z-20"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={() => {
                  if (currentSlide === outfitSlides.length - 1) {
                    setCurrentSlide(0);
                    scrollToSlide(0);
                  } else {
                    nextSlide();
                  }
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-accent-text/20 hover:bg-accent-text/40 text-white rounded-full flex items-center justify-center transition-colors z-20"
                aria-label="Next slide"
              >
                →
              </button>
            </>
          )}
        </div>
        {/* Pagination Dots at the bottom */}
        {outfitSlides.length > 1 && (
          <div className="flex justify-center mt-8 space-x-3 z-30 relative">
            {outfitSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-4 h-4 rounded-full border-2 border-accent-text transition-colors focus:outline-none ${
                  index === currentSlide ? 'bg-accent-text' : 'bg-transparent'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}

      <style jsx global>{`
        .no-scrollbar {
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      </div>
    </section>
  );
};

export default OutfitSection; 