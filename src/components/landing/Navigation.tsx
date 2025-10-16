'use client'

import React, { useState } from 'react';
import { useGlobalState } from '@/contexts/GlobalStateContext';

const Navigation = () => {
  const { state } = useGlobalState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'TATA TERTIB', href: '/#guidelines' },
    { name: 'REWARD & PUNISHMENT', href: '#criteria' },
    { name: 'PENUGASAN', href: '/assignment' }
  ];

  const handleNavigation = (href: string) => {
    window.location.href = href;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Redirect to home page after logout
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 backdrop-blur">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavigation('#home')} 
          className="text-white font-bold text-3xl text-uppercase letter-spacing-heading hover:text-accent-text transition-colors font-sacco"
        >
          INISIALISASI 2025
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className="text-white font-medium text-sm text-uppercase letter-spacing-nav hover:text-accent-text transition-colors font-ubuntu"
            >
              {item.name}
            </button>
          ))}
          
          {/* Login/Logout Button */}
          {state.isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-white text-[#06142E] font-bold text-sm text-uppercase px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-ubuntu"
            >
              LOG OUT
            </button>
          ) : (
            <button
              onClick={() => handleNavigation('/auth')}
              className="bg-white text-[#06142E] font-bold text-sm text-uppercase px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-ubuntu"
            >
              LOG IN
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-white my-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary-bg backdrop-blur border-t border-accent-text/20">
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.href);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-white font-medium text-sm text-uppercase letter-spacing-nav hover:text-accent-text transition-colors font-ubuntu"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Login/Logout Button */}
            {state.isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full bg-white text-[#06142E] font-bold text-sm text-uppercase px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-center font-ubuntu"
              >
                LOG OUT
              </button>
            ) : (
              <button
                onClick={() => {
                  handleNavigation('/auth');
                  setIsMenuOpen(false);
                }}
                className="block w-full bg-white text-[#06142E] font-bold text-sm text-uppercase px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-center font-ubuntu"
              >
                LOG IN
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 