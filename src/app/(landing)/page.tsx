"use client";

import React from "react";
import HeroSection from "@/app/components/landing/HeroSection";
import AboutSection from "@/app/components/landing/AboutSection";
import GuidelinesSection from "@/app/components/landing/GuidelinesSection";
import OutfitSection from "@/app/components/landing/OutfitSection";
import CriteriaSection from "@/app/components/landing/CriteriaSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <GuidelinesSection />
      <OutfitSection />
      <CriteriaSection />
    </>
  );
};

export default LandingPage;
