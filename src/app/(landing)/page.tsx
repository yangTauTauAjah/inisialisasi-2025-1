"use client";

import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import GuidelinesSection from "@/components/landing/GuidelinesSection";
import OutfitSection from "@/components/landing/OutfitSection";
import CriteriaSection from "@/components/landing/CriteriaSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <GuidelinesSection />
      {/* <OutfitSection /> */}
      <CriteriaSection />
    </>
  );
};

export default LandingPage;
