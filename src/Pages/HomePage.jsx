import React from "react";
import Newsletter from "../Components/NewsLetter";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Gallery from "../Components/Gallery";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Gallery />
      <Newsletter />
    </div>
  );
};

export default HomePage;
