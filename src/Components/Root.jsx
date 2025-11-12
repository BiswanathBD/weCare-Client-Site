import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

const Root = () => {
  const { isDark, loading } = useContext(AuthContext);

  if (loading) return;

  return (
    <div
      className={`min-h-screen flex flex-col bg-linear-to-br ${
        isDark
          ? "from-[#1b131d] to-black text-white"
          : "from-pink-100 to-white text-black"
      } transition-all`}
    >
      <Navbar />

      <motion.nav
        className="grow container mx-auto px-4 md:px-10 lg:px-20 my-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <Outlet />
      </motion.nav>

      <Footer />

      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            background: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(236,72,153,0.3)",
            color: isDark ? "white" : "black",
            padding: "12px 20px",
            borderRadius: "12px",
            fontWeight: "500",
            fontSize: "14px",
            boxShadow: isDark
              ? "0 8px 25px rgba(236,72,153,0.3)"
              : "0 8px 25px rgba(236,72,153,0.2)",
          },
        }}
      />
    </div>
  );
};

export default Root;
