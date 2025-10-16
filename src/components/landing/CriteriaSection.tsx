'use client'

import React from 'react';

const CriteriaSection = () => {
  return (
    <section id="criteria" className="relative py-16">
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
              POINTS RULE
            </span>
          </h2>
        </div>

        {/* Reward Image */}
        <div className="flex justify-center items-center mb-12">
          <img
            src="/reward.png"
            alt="Reward Frame"
            className="w-full max-w-5xl h-auto object-contain"
            draggable={false}
            aria-hidden="true"
          />
        </div>

        {/* Main Content - Two Column Layout with Images */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Penalty Left Image */}
          <div className="flex items-center justify-center">
            <img
              src="/penalty-left.png"
              alt="Pengurangan poin keterlambatan mengikuti acara"
              className="w-full max-w-md h-auto object-contain"
              draggable={false}
            />
          </div>
          {/* Right Column - Penalty Right Image */}
          <div className="flex items-center justify-center">
            <img
              src="/penalty-right.png"
              alt="Pelanggaran selama acara"
              className="w-full max-w-md h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* Bottom Section - Graduation Requirements */}
        <div className="flex justify-center items-center mb-12">
          <img
            src="/pass-requirement.png"
            alt="Syarat Kelulusan"
            className="w-full max-w-5xl h-auto object-contain"
            draggable={false}
          />
        </div>
        
        {/* Punishment Image */}
        <div className="flex justify-center items-center my-12">
          <img
            src="/punishment.png"
            alt="Punishment Frame"
            className="w-full max-w-5xl h-auto object-contain"
            draggable={false}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default CriteriaSection; 