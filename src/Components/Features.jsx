import React from "react";
import { motion } from "framer-motion";
motion;
import {
  CalendarPlus,
  Search,
  Settings,
  CalendarDays,
  ShieldCheck,
  MonitorSmartphone,
} from "lucide-react";

const featuresData = [
  {
    title: "Effortless Event Creation",
    description:
      "Create and publish events in just a few clicks — add title, description, date, and category effortlessly.",
    icon: CalendarPlus,
  },
  {
    title: "Smart Search & Filters",
    description:
      "Quickly find events by name or category using intelligent search and filtering options.",
    icon: Search,
  },
  {
    title: "Manage Your Events",
    description:
      "View, edit, or delete your created events in one organized dashboard.",
    icon: Settings,
  },
  {
    title: "Upcoming Events Highlight",
    description:
      "Stay informed with automatically sorted upcoming events displayed in chronological order.",
    icon: CalendarDays,
  },
  {
    title: "Secure Google Authentication",
    description:
      "Log in safely using your Google account with Firebase-backed authentication.",
    icon: ShieldCheck,
  },
  {
    title: "Modern & Responsive Design",
    description:
      "Enjoy a clean, colorful, and mobile-friendly interface that looks great on any device.",
    icon: MonitorSmartphone,
  },
];

const Features = () => {
  return (
    <section className="py-12">
      <div className="px-6">
        <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-16">
          Application Features
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-between gap-8">
          {featuresData.map((feature, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                key={index}
                className="bg-linear-to-br from-purple-500/3 to-pink-400/5 hover:to-pink-400/20 border border-purple-400/2 rounded-2xl p-6 shadow-lg h-full relative"
              >
                <div className="absolute -top-5 right-1/2 translate-x-1/2 flex items-center justify-center mx-auto drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]">
                  <feature.icon size={50} />
                </div>
                <h3 className="text-lg font-semibold text-pink-400 text-center mt-8 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-center text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
