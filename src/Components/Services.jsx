import React from "react";
import { TbHandClick, TbGift, TbCalendarPlus } from "react-icons/tb";
import useAuth from "../Hooks/useAuth";

const Services = () => {
  const items = [
    {
      title: "Volunteer Programs",
      desc: "Join local drives and community outreach programs to make a direct impact.",
      icon: <TbHandClick size={28} color="#ed6fae" />,
    },
    {
      title: "Donations & Support",
      desc: "Secure and transparent channels to donate funds, supplies or time.",
      icon: <TbGift size={28} color="#ed6fae" />,
    },
    {
      title: "Community Events",
      desc: "Organise and participate in events that bring people together for good.",
      icon: <TbCalendarPlus size={28} color="#ed6fae" />,
    },
  ];

  const { isDark } = useAuth();

  return (
    <section className="pt-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12">
        Our Services
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((it) => (
          <div
            key={it.title}
            className={`relative rounded-2xl p-6 shadow-lg h-full border transition-all ${
              isDark ? "border-white/5" : "border-purple-400/2"
            } bg-linear-to-br from-purple-500/3 to-pink-400/5 hover:to-pink-400/20`}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full w-16 h-16 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] bg-white/90">
              {it.icon}
            </div>
            <div className="mt-8 text-center">
              <h4 className="text-lg font-semibold text-pink-400 mb-2">
                {it.title}
              </h4>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-600"
                } text-sm`}
              >
                {it.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
