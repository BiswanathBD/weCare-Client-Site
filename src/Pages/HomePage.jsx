import React from "react";
import Newsletter from "../Components/NewsLetter";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import FAQ from "../Components/FAQ";
import Gallery from "../Components/Gallery";
import Services from "../Components/Services";
import Stats from "../Components/Stats";
import Testimonials from "../Components/Testimonials";
import Team from "../Components/Team";
import CTA from "../Components/CTA";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Services />
      <Stats />
      <Gallery />
      <Testimonials />
      <Team />
      <FAQ />
      <CTA />
      <Newsletter />
    </div>
  );
};

export default HomePage;
