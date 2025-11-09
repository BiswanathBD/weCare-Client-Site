import React, { useContext } from "react";
import { motion } from "motion/react";
import { AuthContext } from "../Context/AuthContext";
import heroImg from "../assets/hero.webp";

const Hero = () => {
  const { isDark } = useContext(AuthContext);

  return (
    <section className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 py-16 md:py-24 container mx-auto px-4 md:px-10 lg:px-20 rounded-xl border border-pink-400/10">
      {/* animation circle */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="z-10 text-center md:text-left max-w-xl"
      >
        <h1
          className={`text-4xl md:text-6xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-fuchsia-500 to-rose-500`}
        >
          Small Acts Big <br /> <span className="text-pink-400">Impact</span>
        </h1>
        <p
          className={`text-base md:text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          } mb-6`}
        >
          Be part of a community where small actions create lasting change. With{" "}
          <span className="text-pink-400 font-medium">weCare</span>, you can
          join, create, and support local social events that make a real impact.
          Together, we turn small acts into a movement for a better tomorrow.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary px-6! py-3! rounded-xl! transition-all w-full sm:w-auto"
          >
            Create Event
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 rounded-xl font-semibold border ${
              isDark
                ? "border-pink-400/50 text-pink-400 hover:bg-pink-400/10"
                : "border-pink-400/50 text-pink-500 hover:bg-pink-100/60"
            } transition-all`}
          >
            All Events
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full md:min-w-1/2 flex justify-center"
      >
        <div
          className={` relative rounded-full shadow-[0_0_40px_5px_rgba(244,114,182,0.3)]`}
        >
          <img
            src={heroImg}
            alt="wellness hero"
            className="border-4 border-pink-300/50 object-contain drop-shadow-[0_0_20px_rgba(244,114,182,0.5)]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
