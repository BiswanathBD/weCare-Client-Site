import React from "react";
import useAuth from "../Hooks/useAuth";

const Stats = () => {
  const { isDark } = useAuth();
  const data = [
    { label: "Events Hosted", value: 128 },
    { label: "Active Volunteers", value: 542 },
    { label: "People Helped", value: 12480 },
    { label: "Years", value: 6 },
  ];

  return (
    <section className="pt-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12">
        Impact &amp; Stats
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {data.map((d) => (
          <div
            key={d.label}
            className={`rounded-2xl p-6 ${
              isDark ? "bg-white/5" : "bg-white/90"
            } border ${
              isDark ? "border-white/5" : "border-purple-400/2"
            }`}
          >
            <div className="text-3xl font-bold text-pink-500">{d.value}</div>
            <div
              className={`${
                isDark ? "text-gray-300" : "text-gray-600"
              } text-sm mt-1`}
            >
              {d.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
