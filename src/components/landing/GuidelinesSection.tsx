'use client'

import React from 'react';

const GuidelinesSection = () => {
  return (
    <section id="guidelines" className="relative py-16 bg-primary-bg">
      <div className="max-w-6xl mx-auto px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-7xl text-uppercase letter-spacing-heading font-sacco">
            INISIALISASI 2025 {" "}
            <span
              className="italic glow-text"
              style={{
                color: "#0D89E9",
                textShadow: "0px 4.66px 52.43px rgba(50, 95, 236, 0.25)",
              }}
            >
              RULES
            </span>
          </h2>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="w-16 h-0.5 bg-accent-text"></div>
            <div className="w-4 h-4 bg-accent-text rounded-full"></div>
            <div className="w-16 h-0.5 bg-accent-text"></div>
          </div>
        </div>

        {/* Guidelines Image */}
        <div className="flex justify-center items-center">
          <img
            src="/guidelines.png"
            alt="Guidelines Frame"
            className="w-full max-w-5xl h-auto object-contain"
            draggable={false}
            aria-hidden="true"
          />
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center mt-12 space-x-6">
          <div className="w-3 h-3 bg-accent-text rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-accent-text rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-accent-text rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection; 