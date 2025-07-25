"use client";

import React from "react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col justify-center min-h-[60vw] py-16 overflow-hidden"
    >
      {/* Background image, centered, 70vw width, no blur or mask */}
      <div className="absolute inset-0 flex justify-center items-end pointer-events-none select-none">
        <img
          src="/about-background.png"
          alt="Crowd background"
          className="w-[70vw] h-auto object-contain object-center"
          draggable={false}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Title */}
        <h2 className="text-7xl text-uppercase letter-spacing-heading mb-50 font-sacco">
          <span className="text-white">WHAT IS </span>
          <span
            className="text-accent-text italic"
            style={{
              color: "#0D89E9",
              textShadow: "0px 4.66px 52.43px rgba(50, 95, 236, 0.25)",
            }}
          >
            INISIALISASI
          </span>
        </h2>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-25">
          <p className="text-white text-center text-lg font-medium md:text-xl leading-relaxed font-ubuntu">
            INISIALISASI merupakan serangkaian kegiatan yang rutin
            diselenggarakan setiap tahunnya oleh Himpunan Mahasiswa Teknik
            Informatika (HIMTI) Universitas Airlangga. Kegiatan ini bertujuan
            untuk memberikan bekal awal kepada Mahasiswa Baru D4 Teknik
            Informatika, baik dalam hal akademik maupun non-akademik.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-8">
          <div className="w-2 h-2 bg-accent-text rounded-full"></div>
          <div className="w-2 h-2 bg-accent-text rounded-full"></div>
          <div className="w-2 h-2 bg-accent-text rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
