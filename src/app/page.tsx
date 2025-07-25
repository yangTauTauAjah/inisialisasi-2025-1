'use client'

import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import GuidelinesSection from "./components/GuidelinesSection";
import OutfitSection from "./components/OutfitSection";
import CriteriaSection from "./components/CriteriaSection";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'radial-gradient(ellipse at 50% 10%, #06142E 0%, #123AA9 57%, #182F56 100%)',
      }}
    >
      <Navigation />
      <HeroSection />
      <AboutSection />
      <GuidelinesSection />
      <OutfitSection />
      <CriteriaSection />
      <Footer />
    </div>
  );
};

export default LandingPage;