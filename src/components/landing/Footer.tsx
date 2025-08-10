'use client'

import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-primary-bg overflow-hidden" style={{
      background: 'linear-gradient(#0D3FCB 0%, #071129 100%)',
    }}>
      <div className="max-w-6xl grid-pattern mx-auto p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Section */}
          <div className="mb-6 md:mb-0">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <span className="text-white text-sm font-medium text-uppercase letter-spacing-nav font-ubuntu">
                Instagram Inisialisasi
              </span>
              <a
                href="https://instagram.com/inisialisasi2025"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                {/* Instagram Icon */}
                <div className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center hover:border-accent-text hover:bg-accent-text transition-colors">
                  <div className="relative w-3 h-3">
                    {/* Instagram Camera Body */}
                    <div className="w-3 h-3 border-2 border-white rounded-sm group-hover:border-accent-text transition-colors"></div>
                    {/* Instagram Camera Lens */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full group-hover:bg-accent-text transition-colors"></div>
                    {/* Instagram Camera Flash */}
                    <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white rounded-full group-hover:bg-accent-text transition-colors"></div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-8 space-x-4">
          <div className="w-1 h-1 bg-accent-text rounded-full"></div>
          <div className="w-1 h-1 bg-accent-text rounded-full"></div>
          <div className="w-1 h-1 bg-accent-text rounded-full"></div>
        </div>

        {/* Copyright at the bottom */}
        <div className="mt-8 text-center w-full">
          <p className="text-white text-sm opacity-80 font-ubuntu">
            © 2025 Inisialisasi - D4 Teknik Informatika
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 