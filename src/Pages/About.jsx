import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import Newsletter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import { Link } from "react-router";

const About = () => {
  const { isDark } = useContext(AuthContext);

  return (
    <div>
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-10 py-12 rounded-xl">
        <div className="z-10 text-center md:text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-fuchsia-500 to-rose-500">
            About <span className="text-pink-400">weCare</span>
          </h1>
          <p
            className={`text-base md:text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            } mb-6`}
          >
            weCare is a community-driven platform dedicated to connecting
            compassionate people with local social and wellness events. Our
            mission is to amplify small acts of care into measurable impact — by
            making it easy to create, find, and join events that improve mental
            and physical wellbeing across neighborhoods.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link to={"/createEvent"} className="btn-primary">
              Create Event
            </Link>
            <Link
              to={"/upcomingEvents"}
              className="btn-secondary border border-pink-400/30 bg-transparent text-pink-500"
            >
              Upcoming Events
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="rounded-xl border border-pink-400/10 p-6">
            <h4 className="text-lg font-semibold text-pink-400 mb-2">
              Our Mission
            </h4>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-600"
              } text-sm mb-4`}
            >
              Build strong, supportive communities by empowering volunteers,
              organizers, and attendees to collaborate on meaningful local
              activities.
            </p>

            <h4 className="text-lg font-semibold text-pink-400 mb-2">
              Our Values
            </h4>
            <ul className="text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} list-disc ml-5 space-y-1">
              <li>Compassion — small acts matter.</li>
              <li>Inclusion — events for everyone.</li>
              <li>Safety — trustworthy sign-ups & verification.</li>
              <li>Impact — measure and share outcomes.</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="py-12">
        <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
          What We Do
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-pink-400/5 bg-linear-to-br from-purple-500/3 to-pink-400/5">
            <h4 className="font-semibold text-pink-400 mb-2">Connect</h4>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-600"
              } text-sm`}
            >
              We link volunteers with meaningful local events and causes.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-pink-400/5 bg-linear-to-br from-purple-500/3 to-pink-400/5">
            <h4 className="font-semibold text-pink-400 mb-2">Create</h4>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-600"
              } text-sm`}
            >
              Organizers can build events quickly and reach the right audience.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-pink-400/5 bg-linear-to-br from-purple-500/3 to-pink-400/5">
            <h4 className="font-semibold text-pink-400 mb-2">Support</h4>
            <p
              className={`${
                isDark ? "text-gray-300" : "text-gray-600"
              } text-sm`}
            >
              We provide tools to manage attendees and share results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
