import React, { useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { Link, NavLink } from "react-router";
import ToggleButton from "./ToggleBtn";
import { TbHomeFilled } from "react-icons/tb";
import {
  BiSolidCalendarCheck,
  BiSolidCalendarEdit,
  BiSolidCalendarPlus,
  BiSolidCalendarWeek,
} from "react-icons/bi";
import { motion } from "framer-motion";
motion;
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, setUser, loading, logOut, isDark } = useAuth();
  const [dropShow, setDropShow] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You are Logged Out");
        setUser(null);
        setDropShow(false)
      })
      .catch((error) => toast.error(error.code));
  };

  if (loading) return;

  return (
    <motion.nav
      className="sticky top-0 backdrop-blur-3xl z-50"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="container mx-auto px-4 md:px-10 lg:px-20 my-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
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
        </Link>

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
          <NavLink className="flex items-center gap-1" to={"/upcomingEvents"}>
            <BiSolidCalendarWeek size={18} color="#ed6fae" />
            <span>Upcoming Events</span>
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <ToggleButton />
          <div className="relative group z-100">
            {/* Profile */}
            {user && (
              <img
                onClick={() => setDropShow(!dropShow)}
                className="w-10 h-10 rounded-full border border-pink-400/80 shadow-[0_0_10px_2px_rgba(244,114,182,0.4)] bg-white"
                src={user.photoURL || profile}
                alt="User"
              />
            )}

            {/* hover user name show */}
            <p className="absolute top-1/2 -translate-y-1/2 text-nowrap right-8 bg-pink-400 px-3 py-1 rounded-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:right-10 transition-all">{user?.displayName}</p>

            {/* dropdown menu */}
            <div
              className={`absolute p-4  right-1/2 translate-x-1/2 z-100 border border-pink-400/40 box-shadow rounded-lg backdrop-blur-3xl flex flex-col gap-4 transition-all
              ${isDark ? "bg-black/90" : "bg-white/90"}
              ${
                dropShow
                  ? "top-10 opacity-100"
                  : "top-6 opacity-0 pointer-events-none"
              }
              `}
            >
              <Link
                to={"/"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2 md:hidden"
              >
                <TbHomeFilled size={18} color="#ed6fae" /> <span>Home</span>
              </Link>

              <Link
                to={"/upcomingEvents"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2 md:hidden"
              >
                <BiSolidCalendarWeek size={18} color="#ed6fae" />
                <span>Upcoming Events</span>
              </Link>

              <Link
                onClick={() => setDropShow(!dropShow)}
                to={"/createEvent"}
                className="flex items-center gap-2"
              >
                <BiSolidCalendarPlus size={18} color="#ed6fae" />
                <span>Create Event</span>
              </Link>

              <Link
                to={"/manageEvents"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2"
              >
                <BiSolidCalendarEdit size={18} color="#ed6fae" />
                <span>Manage Events</span>
              </Link>

              <Link
                to={`/joinedEvent/user/${user?.email}`}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2"
              >
                <BiSolidCalendarCheck size={18} color="#ed6fae" />
                <span>Joined Events</span>
              </Link>

              {user && (
                <div
                  className={`mt-8 flex items-center gap-2 border border-pink-400/20 rounded-md p-2 w-full backdrop-blur-3xl
                ${isDark ? "bg-black" : "bg-white"}
                `}
                >
                  <img
                    className="w-8 h-8 rounded-full border border-pink-400/30 shrink-0"
                    src={user.photoURL || profile}
                    alt=""
                  />
                  <div className="flex-1 overflow-hidden">
                    <h5 className="text-pink-400 font-semibold text-sm truncate">
                      {user.displayName}
                    </h5>
                    <p className="text-[8px] text-gray-400 wrap-break-word">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* sign btn */}
          {user ? (
            <button onClick={handleLogOut} className="btn-primary">
              Log Out
            </button>
          ) : (
            <Link to={"/login"} className="btn-primary">
              Login
            </Link>
          )}

          {/* Toggle icon */}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
