import React, { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { TbCalendarCog, TbCalendarCheck } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi2";
import useAuth from "../Hooks/useAuth";
import profile from "../assets/profile.png";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Dashboard = () => {
  const { user, logOut, setUser, isDark } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You are Logged Out");
        setUser(null);
        navigate("/");
      })
      .catch((err) => toast.error(err?.message || "Logout failed"));
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-linear-to-br ${
        isDark
          ? "from-[#1b131d] to-black text-white"
          : "from-pink-100 to-white text-black"
      } transition-all`}
    >
      {/* navbar */}
      <nav className="flex justify-between items-center px-4 md:px-6 py-3 fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 justify-center">
          <img src={logo} alt="weCare" className="w-10 h-10" />
          <h4 className="hidden md:block text-2xl font-bold">
            we<span className="text-pink-400">Care</span>
          </h4>
        </Link>
        {/* profile with dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex-1 overflow-hidden text-right">
              <h5 className="text-pink-400 font-semibold truncate">
                {user.displayName}
              </h5>
              <p className="text-xs text-gray-400 wrap-break-word">
                {user?.email}
              </p>
            </div>

            <div className="relative">
              <img
                className="w-10 h-10 rounded-full border border-pink-400/80 shadow-[0_0_10px_2px_rgba(244,114,182,0.4)] bg-white"
                src={user.photoURL || profile}
                alt="User"
              />
              <FaBars
                size={14}
                color="white"
                className={`bg-[#ed6fae] p-0.5 rounded-full absolute bottom-0 right-0 shadow`}
              />
            </div>
          </div>
        </div>

        {/* dropdown */}
        <div
          className={`absolute p-4 right-6 z-100 border border-pink-400/40 box-shadow rounded-lg backdrop-blur-3xl flex flex-col gap-4 transition-all text-nowrap
            ${isDark ? "bg-black/90" : "bg-white/90"}
            ${
              isDropdownOpen
                ? "top-16 opacity-100"
                : "top-12 opacity-0 pointer-events-none"
            }`}
        >
          <NavLink className="flex items-center gap-2" to={"/upcomingEvents"}>
            <FaRegUser size={18} color="#ed6fae" />
            <span>My Profile</span>
          </NavLink>
          <NavLink className="flex items-center gap-2" to={"/dashboard"}>
            <HiOutlineHome size={20} color="#ed6fae" />
            <span>Dashboard Home</span>
          </NavLink>

          <div>
            <button onClick={handleLogOut} className="btn-primary w-full! mt-4">
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <div className="grow grid grid-cols-[auto_1fr] mt-16">
        {/* Sidebar */}
        <aside className="p-2 lg:p-4 flex flex-col justify-between w-fit">
          <div>
            {/* Navigation */}
            <nav className="flex flex-col gap-2 items-center lg:items-stretch">
              {[
                {
                  to: "/dashboard",
                  icon: <HiOutlineHome size={20} />,
                  label: "Overview",
                  end: true,
                },
                {
                  to: "/dashboard/manageEvents",
                  icon: <TbCalendarCog size={20} />,
                  label: "Manage Events",
                },
                {
                  to: `/dashboard/joinedEvent/user/${user?.email}`,
                  icon: <TbCalendarCheck size={20} />,
                  label: "Joined Events",
                },
              ].map(({ to, icon, label, end }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-md transition w-full
                    ${
                      isActive
                        ? isDark
                          ? "bg-pink-500/20 text-pink-400"
                          : "bg-pink-50 text-pink-500"
                        : isDark
                        ? "text-gray-400 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {icon}
                  <span className="hidden lg:inline">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="p-4 md:p-8 m-4 rounded-xl bg-white/3">
          <Outlet />
        </div>
      </div>

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

export default Dashboard;
