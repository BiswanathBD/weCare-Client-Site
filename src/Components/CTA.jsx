import React from "react";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";

const CTA = () => {
  const { isDark } = useAuth();

  return (
    <section className="pt-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-10">
        Ready to help your community?
      </h3>

      <div
        className={`rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border ${
          isDark ? "border-white/10" : "border-purple-400/20"
        }`}
      >
        <p
          className={`${
            isDark ? "text-gray-300" : "text-gray-700"
          } text-center md:text-left`}
        >
          Join as a volunteer, start an event or donate — small steps matter.
        </p>

        <div className="flex gap-3">
          <Link to={"/createEvent"} className="btn-primary">
            Create Event
          </Link>
          <Link to={"/contact-us"} className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
