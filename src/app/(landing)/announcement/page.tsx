"use client";

import React from "react";

const AnnouncementPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 mt-20 mx-auto max-w-4xl w-full">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-7xl lg:text-8xl text-uppercase letter-spacing-heading font-sacco text-white">
          ANNOUNCEMENT
        </h1>
      </div>

      <div className="max-w-3xl">
        <img
          src="/guidelines.png"
          alt="Guidelines and Rules"
          className="w-full h-auto object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default AnnouncementPage;
