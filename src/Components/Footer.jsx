import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  const { isDark } = useContext(AuthContext);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-8 py-10 bg-linear-to-bl from-[#1b131d] to-black backdrop-blur-xl text-white border-t border-pink-400/10"
    >
      <div className="container mx-auto px-4 md:px-10 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">
            we<span className="text-pink-400">Care</span>
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            Empowering wellness, one step at a time.
          </p>
        </div>

        <div className="flex gap-4 footer-nav">
          <Link
            to={"https://www.facebook.com/Biswanath.Sarker.BD"}
            target="blank"
          >
            <FaFacebookF />
          </Link>
          <Link
            to={"https://www.instagram.com/biswanath.sarker.bd/"}
            target="blank"
          >
            <FaInstagram />
          </Link>
          <Link to={"https://x.com/Biswanath08BD"} target="blank">
            <FaXTwitter />
          </Link>
          <Link to={"https://github.com/BiswanathBD"} target="blank">
            <FaGithub />
          </Link>
        </div>

        {/* Copyright */}
        <div
          className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          } text-center`}
        >
          © {new Date().getFullYear()} weCare. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
