import React from "react";
import { Link } from "react-router";

const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to={"/dashboard/manageEvents"}
          className="p-4 rounded-xl border border-pink-400/5 bg-white/90 hover:shadow-md"
        >
          <h4 className="text-pink-400 font-semibold">Manage Events</h4>
          <p className="text-sm text-gray-600">
            View and manage events you created.
          </p>
        </Link>

        <Link
          to={"/dashboard/joinedEvent/user/"}
          className="p-4 rounded-xl border border-pink-400/5 bg-white/90 hover:shadow-md"
        >
          <h4 className="text-pink-400 font-semibold">Joined Events</h4>
          <p className="text-sm text-gray-600">See events you have joined.</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
