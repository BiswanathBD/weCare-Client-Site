import React from "react";
import profile from "../assets/profile.png";
import useAuth from "../Hooks/useAuth";

const Team = () => {
  const { isDark } = useAuth();
  const members = [
    { name: "Biswanath Sarker", role: "Founder" },
    { name: "Arjun Gupta", role: "Program Lead" },
    { name: "Leena Roy", role: "Community Manager" },
  ];

  return (
    <section className='pt-16'>
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12">
        Meet the Team
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {members.map((m) => (
          <div
            key={m.name}
            className={`relative rounded-2xl p-6 text-center ${
              isDark ? "bg-white/5" : "bg-white"
            } border ${
              isDark ? "border-white/5" : "border-purple-400/2"
            }`}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <img
                src={profile}
                alt={m.name}
                className="w-20 h-20 rounded-full border-2 border-white"
              />
            </div>
            <div className="mt-12">
              <div className="font-semibold">{m.name}</div>
              <div
                className={`${
                  isDark ? "text-gray-300" : "text-gray-500"
                } text-sm`}
              >
                {m.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
