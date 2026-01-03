import React from "react";
import profile from "../assets/profile.png";
import useAuth from "../Hooks/useAuth";

const Testimonials = () => {
  const { isDark } = useAuth();
  const items = [
    {
      name: "Aisha Khan",
      text: "Volunteering with WeCare changed the way I see community. Very rewarding!",
    },
    {
      name: "Rahul Mehta",
      text: "Organised and transparent — a great platform to give back.",
    },
    {
      name: "Priya Sharma",
      text: "Met inspiring people and helped many families through events.",
    },
  ];

  return (
    <section className="pt-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12">
        Testimonials
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((it) => (
          <div
            key={it.name}
            className={`relative rounded-2xl p-6 ${
              isDark ? "bg-white/5" : "bg-white"
            } border ${
              isDark ? "border-white/5" : "border-purple-400/2"
            }`}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]">
              <img src={profile} alt="" className="w-10 h-10 rounded-full" />
            </div>

            <div className="mt-8 text-center">
              <div className="font-semibold mb-2">{it.name}</div>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-600"
                } text-sm`}
              >
                "{it.text}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
