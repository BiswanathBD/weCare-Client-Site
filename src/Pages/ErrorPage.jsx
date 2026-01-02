import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const { isDark } = use(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      className={`h-screen w-screen flex justify-center items-center 
        bg-linear-to-r ${
          isDark
            ? "from-[#1b131d] to-black text-white"
            : "from-pink-100 to-white text-black"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-8 py-10"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold 
                     bg-linear-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent
                     drop-shadow-[0_0_80px_rgba(236,72,153,0.6)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Error.
        </motion.h1>

        <motion.h4
          className="mt-4 text-lg md:text-2xl opacity-90 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Something went wrong. Please try again later.
        </motion.h4>

        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 px-6 py-3 rounded-full font-semibold 
                     bg-linear-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent
                     flex items-center justify-end w-full
                     shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="h-px bg-pink-400/20 grow"></div>
          <span className="group flex items-center gap-2 border border-pink-400/20 hover:border-pink-400/40 p-4 py-2 rounded-2xl hover:bg-linear-to-r from-purple-500/30 to-pink-400/20">
            <Home size={18} className="text-purple-500" /> Go Home
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
