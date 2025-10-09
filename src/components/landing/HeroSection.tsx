"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "transparent",
      }}
    >
      {/* Grid SVG as background */}
      <img
        src="/hero-grid.svg"
        alt="3D grid background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
        aria-hidden="true"
      />

      {/* Hero Text */}

      <div className="relative z-10 w-full flex flex-col items-center w-full">
        <h1
          className="font-sacco text-white text-center text-[3.5rem] md:text-[5rem] lg:text-[6rem] tracking-[0.25em] uppercase"
          style={{
            letterSpacing: "0.22em",
            fontStretch: "condensed",
            lineHeight: 1.05,
          }}
        >
          ARE YOU READY TO
        </h1>
        <h2
          className="font-sacco italic text-center text-[5rem] md:text-[8rem] lg:text-[10rem] uppercase mt-4 tracking-[0.18em]"
          style={{
            letterSpacing: "0.18em",
            fontStretch: "condensed",
            lineHeight: 1.05,
            color: "#0D89E9",
            textShadow: "0px 4.66px 52.43px rgba(50, 95, 236, 0.25)",
          }}
        >
          INITIALIZE
        </h2>

        {/* Main Logo - Absolutely positioned at bottom */}
        <img
          src="/main-logo-hero.png"
          alt="Inisialisasi Logo"
          className="absolute bottom-[-200px] md:bottom-[-250px] left-1/2 transform -translate-x-1/2 w-xs md:w-md pointer-events-none select-none z-20"
          draggable={false}
        />
      </div>
    </section>
  );
};

export default HeroSection;
