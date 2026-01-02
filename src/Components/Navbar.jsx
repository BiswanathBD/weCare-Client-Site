import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { Link, NavLink } from "react-router";
import ToggleButton from "./ToggleBtn";
import { motion } from "framer-motion";
motion;
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { HiOutlineHome } from "react-icons/hi2";
import {
  TbCalendarCog,
  TbCalendarCheck,
  TbCalendarPlus,
  TbCalendarUp,
  TbLayoutDashboard,
} from "react-icons/tb";
import { TiContacts } from "react-icons/ti";
import { FaRegCircleQuestion } from "react-icons/fa6";

const Navbar = () => {
  const { user, setUser, loading, logOut, isDark } = useAuth();
  const [dropShow, setDropShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You are Logged Out");
        setUser(null);
        setDropShow(false);
      })
      .catch((error) => toast.error(error.code));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          className="nav hidden text-sm lg:flex gap-4 font-light bg-linear-to-r from-pink-400/10 via-transparent to-pink-400/8 px-4 md:px-6 xl:px-8 py-1 border-l-2 border-r-2 border-pink-400"
        >
          <NavLink className="flex items-center gap-1" to={"/"}>
            <HiOutlineHome size={18} color="#ed6fae" /> <span>Home</span>
          </NavLink>
          <NavLink className="flex items-center gap-1" to={"/upcomingEvents"}>
            <TbCalendarUp size={18} color="#ed6fae" />
            <span>Upcoming Events</span>
          </NavLink>
          <NavLink
            to={"/about-us"}
            onClick={() => setDropShow(!dropShow)}
            className="flex items-center gap-1"
          >
            <IoIosInformationCircleOutline size={18} color="#ed6fae" />
            <span>About Us</span>
          </NavLink>
          <NavLink
            to={"/contact-us"}
            onClick={() => setDropShow(!dropShow)}
            className="flex items-center gap-1"
          >
            <TiContacts size={18} color="#ed6fae" />
            <span>Contact Us</span>
          </NavLink>
          <NavLink
            to={"/faq"}
            onClick={() => setDropShow(!dropShow)}
            className="flex items-center gap-1"
          >
            <FaRegCircleQuestion size={18} color="#ed6fae" />
            <span>FAQ</span>
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <ToggleButton />
          <div className="relative" ref={dropdownRef}>
            {/* Profile */}
            <div className="group">
              {user && (
                <img
                  onClick={() => setDropShow(!dropShow)}
                  className="w-10 h-10 rounded-full border border-pink-400/80 shadow-[0_0_10px_2px_rgba(244,114,182,0.4)] bg-white"
                  src={user.photoURL || profile}
                  alt="User"
                />
              )}
            </div>

            {/* dropdown menu */}
            <div
              id="dropdown"
              className={`absolute p-4  right-0 z-100 border border-pink-400/40 box-shadow rounded-lg backdrop-blur-3xl flex flex-col gap-4 transition-all
              ${isDark ? "bg-black/90" : "bg-white/90"}
              ${
                dropShow
                  ? "top-14 opacity-100"
                  : "top-8 opacity-0 pointer-events-none"
              }
              `}
            >
              <Link
                to={"/"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2 md:hidden"
              >
                <HiOutlineHome size={18} color="#ed6fae" /> <span>Home</span>
              </Link>

              <Link
                to={"/upcomingEvents"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2 md:hidden"
              >
                <TbCalendarUp size={18} color="#ed6fae" />
                <span>Upcoming Events</span>
              </Link>

              <Link
                onClick={() => setDropShow(!dropShow)}
                to={"/createEvent"}
                className="flex items-center gap-2"
              >
                <TbCalendarPlus size={18} color="#ed6fae" />
                <span>Create Event</span>
              </Link>

              <Link
                to={"/manageEvents"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2"
              >
                <TbCalendarCog size={18} color="#ed6fae" />
                <span>Manage Events</span>
              </Link>

              <Link
                to={`/joinedEvent/user/${user?.email}`}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-2"
              >
                <TbCalendarCheck size={18} color="#ed6fae" />
                <span>Joined Events</span>
              </Link>
              <Link
                to={"/about-us"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-1"
              >
                <IoIosInformationCircleOutline size={18} color="#ed6fae" />
                <span>About Us</span>
              </Link>
              <Link
                to={"/contact-us"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-1"
              >
                <TiContacts size={18} color="#ed6fae" />
                <span>Contact Us</span>
              </Link>
              <Link
                to={"/faq"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-1"
              >
                <FaRegCircleQuestion size={18} color="#ed6fae" />
                <span>FAQ</span>
              </Link>
              <Link
                to={"/dashboard"}
                onClick={() => setDropShow(!dropShow)}
                className="flex items-center gap-1 border border-pink-400/20 rounded-md px-3 py-2 justify-center"
              >
                <TbLayoutDashboard size={18} color="#ed6fae" />
                <span>Dashboard</span>
              </Link>

              {user && (
                <div>
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

                  <button
                    onClick={handleLogOut}
                    className="btn-primary w-full! mt-4"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
          {!user && (
            <Link to={"/login"} className="btn-primary">
              Login
            </Link>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
