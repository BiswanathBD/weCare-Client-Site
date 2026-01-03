import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";
import JoinedList from "../Components/JoinedList";
import { motion } from "framer-motion";
import NoDataFound from "../Components/NoDataFound";
motion;

const JoinedEvents = () => {
  const { user, isDark } = useAuth();
  const [loading, setLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState(null);
  const axiosInstance = useAxios();

  console.log(joinedEvents);

  useEffect(() => {
    axiosInstance
      .get(`/joinedEvent/user/${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setJoinedEvents(res.data);
        setLoading(false);
      });
  }, [axiosInstance, user]);

  if (loading) return <Loader />;

  return (
    <div
      className={`max-w-7xl mx-auto ${
        isDark ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <h3 className="text-3xl md:text-4xl font-black text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent w-fit mx-auto pb-4">
        Joined Events
      </h3>

      <div className="w-full h-px bg-linear-to-r from-transparent via-pink-400/30 to-transparent mb-8"></div>

      {/* event list */}
      {joinedEvents && joinedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {joinedEvents.map((e, index) => (
            <motion.div
              key={e._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <JoinedList
                e={e}
                joinedEvents={joinedEvents}
                setJoinedEvents={setJoinedEvents}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-8">
          <NoDataFound />
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
