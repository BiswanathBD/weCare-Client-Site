import React, { useContext } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { Link, NavLink } from "react-router";
import ToggleButton from "./ToggleBtn";
import { TbHomeFilled } from "react-icons/tb";
import { BiSolidCalendarWeek } from "react-icons/bi";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, loading, logOut } = useContext(AuthContext);
  if (loading) return;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You are Logged Out");
        setUser(null);
      })
      .catch((error) => toast.error(error.code));
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="container mx-auto px-4 md:px-10 lg:px-20 my-2 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-1"
        >
          <img
            className="w-10 aspect-square animate-spin-once"
            src={logo}
            alt="We care Logo"
          />
          <h4 className="text-3xl font-bold">
            we<span className="text-pink-400">Care</span>
          </h4>
        </motion.div>

        {/* Nav options */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden md:flex gap-8 font-light bg-linear-to-r from-pink-400/10 via-transparent to-pink-400/8 px-4 md:px-8 xl:px-16 py-1 border-l-2 border-r-2 border-pink-400"
        >
          <NavLink className="flex items-center gap-1" to={"/"}>
            <TbHomeFilled size={18} color="#ed6fae" /> <span>Home</span>
          </NavLink>
          <NavLink className="flex items-center gap-1" to={"/upcomingEvent"}>
            <BiSolidCalendarWeek size={18} color="#ed6fae" />
            <span>Upcoming Events</span>
          </NavLink>
        </motion.div>

        {/* Right section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {/* Profile */}
          {user && (
            <img
              className="w-8 h-8 border border-pink-400/30 p-px  shadow-[0_0_10px_2px_rgba(244,114,182,0.4)] bg-white"
              src={user.photoURL || profile}
              alt="User"
            />
          )}

          {/* Auth Button */}
          {user ? (
            <button onClick={handleLogOut} className="btn-primary">
              Log Out
            </button>
          ) : (
            <Link to={"/login"} className="btn-primary">
              Login
            </Link>
          )}

          {/* Theme Toggle */}
          <ToggleButton />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
