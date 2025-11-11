import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Loader";
import EventCard from "../Components/EventCard";
import { motion } from "motion/react";
motion;
import useAuth from "../Hooks/useAuth";
import { Filter, Search } from "lucide-react";

const UpcomingEvents = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // all upcoming data
  useEffect(() => {
    axiosInstance.get("/events").then((data) => {
      setUpcomingEvents(data.data);
      setLoading(false);
    });
  }, [axiosInstance, user]);

  // searched data
  useEffect(() => {
    axiosInstance.get(`/events/${search}`).then((data) => {
      setUpcomingEvents(data.data);
      setLoading(false);
    });
  }, [axiosInstance, search]);

  // filtered events
  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      axiosInstance.get("/events").then((res) => {
        setUpcomingEvents(res.data);
      });
    } else {
      axiosInstance.get(`/events/category/${value}`).then((res) => {
        setUpcomingEvents(res.data);
      });
    }
  };

  if (loading) return <Loader />;

  const eventTypes = [
    "Tree Plantation",
    "Cleanup",
    "Blood Donation",
    "Clothes Donation",
    "Education Campaign",
    "Health Camp",
    "Food Distribution",
    "Disaster Relief",
    "Child Welfare",
    "Community Development",
    "Cultural Event",
    "Training",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h3 className="text-3xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent w-fit mx-auto pb-4">
          Upcoming Events
        </h3>
        {/* line */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-pink-400/30 to-transparent mb-6"></div>

        {/*------- search and filter --------*/}
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 p-4 rounded-2xl shadow-md backdrop-blur-sm mb-12">
          {/* --------- search bar -------------- */}
          <div className="relative w-full mx-12">
            <Search className="absolute left-3 top-2.5 text-pink-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-pink-400/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-gray-400"
            />
          </div>
          {/*----------- category --------- */}
          <div className="flex justify-end">
            <div className="relative w-fit">
              <Filter className="absolute left-3 top-2.5 text-purple-400 w-5 h-5" />
              <select
                onChange={handleFilterChange}
                className="w-fit pl-10 pr-4 py-2 bg-white/10 border border-purple-400/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-500"
              >
                <option value="" selected>
                  Select Event Type
                </option>
                <option value="all">All Events</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 xl:gap-16">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <EventCard
                event={event}
                upcomingEvents={upcomingEvents}
                setUpcomingEvents={setUpcomingEvents}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingEvents;
