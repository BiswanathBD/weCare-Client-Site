import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Loader";
import { motion } from "motion/react";
motion
import MyEventList from "../Components/MyEventList";

const ManageEvents = () => {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/events/user/${user.email}`).then((res) => {
      setMyEvents(res.data);
      setLoading(false);
    });
  }, [axiosInstance, user]);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-3xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent w-fit mx-auto pb-4">
        Manage My Events
      </h3>
      <div className="w-full h-px bg-linear-to-r from-transparent via-pink-400/30 to-transparent mb-8"></div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {myEvents.map((event, i) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-linear-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl border border-pink-400/20 shadow-lg overflow-hidden hover:shadow-pink-400/20 transition-all duration-300"
          >
            <MyEventList
              event={event}
              myEvents={myEvents}
              setMyEvents={setMyEvents}
            ></MyEventList>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ManageEvents;
