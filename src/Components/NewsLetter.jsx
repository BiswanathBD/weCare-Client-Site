import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import newsletterImg from "../assets/newsletterImg.png";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    // e.target.reset();
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 ">
      <div className="w-full rounded-3xl bg-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-pink-400/20">
        <div className="flex justify-center">
          <img
            src={newsletterImg}
            alt="Newsletter Illustration"
            className="w-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="min-w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-bold mb-2 text-center md:text-left tracking-wide">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-500/80 mb-4 text-center md:text-left">
            Stay updated with the latest events and social initiatives!
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center"
          >
            <div className="relative w-full sm:flex-1">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary px-6! py-3! rounded-xl! transition-all w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-400 dark:text-gray-500 mt-4 text-sm text-center md:text-left">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
