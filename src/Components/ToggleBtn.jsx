import React, { useContext, useState } from "react";
import { MdOutlineNightsStay, MdOutlineWbSunny } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";

const ToggleBtn = () => {
  const { isDark, setIsDark } = useContext(AuthContext);
  const [spin, setSpin] = useState(false);

  const handleToggle = () => {
    setSpin(true);
    setIsDark(!isDark);

    setTimeout(() => setSpin(false), 1000);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleToggle}
        className=" flex items-center justify-center cursor-pointer transition-colors duration-1000"
      >
        <span
          className={`inline-block transform transition-transform duration-500 ${
            spin ? "animate-spin-once" : ""
          }`}
        >
          {isDark ? (
            <MdOutlineNightsStay size={24} className="text-purple-400" />
          ) : (
            <MdOutlineWbSunny size={24} className="text-orange-400" />
          )}
        </span>
      </button>
    </div>
  );
};

export default ToggleBtn;
