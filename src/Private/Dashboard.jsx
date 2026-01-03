import React from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { TbCalendarCog, TbCalendarCheck } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi2";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  const { user, logOut, setUser, isDark } = useAuth();
  const navigate = useNavigate();

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
      className={`min-h-screen ${
        isDark ? "bg-neutral-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="grid grid-cols-[auto_1fr] md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <aside
          className={`h-screen p-2 md:p-4 flex flex-col justify-between
          w-20 md:w-fit
          ${
            isDark
              ? "bg-linear-to-br from-black to-neutral-800"
              : "bg-white shadow-lg"
          }`}
        >
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <img src={logo} alt="weCare" className="w-8 h-8" />
              <h4 className="hidden md:block text-lg font-bold">
                we<span className="text-pink-400">Care</span>
              </h4>
            </Link>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 items-center md:items-stretch">
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
                  <span className="hidden md:inline">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            {/* User Info (hidden on small) */}
            <div className="hidden md:flex mb-6 items-center gap-3">
              <img
                src={user?.photoURL || ""}
                alt="User"
                className="h-10 aspect-square rounded-full border border-pink-400 p-px"
              />
              <div>
                <div className="font-semibold text-sm">
                  {user?.displayName || "User"}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user?.email}
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogOut}
              className={`w-full py-2 rounded-md font-semibold transition text-xs md:text-sm text-nowrap
              ${
                isDark
                  ? "bg-pink-600 hover:bg-pink-700 text-white"
                  : "bg-pink-500 hover:bg-pink-600 text-white"
              }`}
            >Log Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`${isDark ? "bg-neutral-900" : "bg-gray-50"}`}>
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
