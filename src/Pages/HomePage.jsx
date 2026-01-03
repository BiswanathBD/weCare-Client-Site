import React from "react";
import Newsletter from "../Components/NewsLetter";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import FAQ from "../Components/FAQ";
import Gallery from "../Components/Gallery";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <FAQ />
      <Gallery />
      <Newsletter />
    </div>
  );
};

export default HomePage;
