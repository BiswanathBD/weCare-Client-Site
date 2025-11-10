import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Loader";
import EventCard from "../Components/EventCard";
import { motion } from "motion/react";

const UpcomingEvents = () => {
  const axiosInstance = useAxios();
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/event")
      .then((data) => {
        setUpcomingEvents(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [axiosInstance]);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h3 className="text-2xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent w-fit mx-auto pb-4">Upcoming Events</h3>
        {/* line */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-pink-400/30 to-transparent mb-6"></div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 xl:gap-16">
          {upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingEvents;
