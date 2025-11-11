import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";
import JoinedList from "../Components/JoinedList";
import { motion } from "motion/react";
motion;

const JoinedEvents = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState(null);
  const axiosInstance = useAxios();

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

  if (loading) return <Loader></Loader>;

  return (
    <div>
      <h3 className="text-3xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent w-fit mx-auto pb-4">
        Joined Events
      </h3>
      {/* line */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-pink-400/30 to-transparent mb-12"></div>

      {/* event list */}
      <div className="grid xl:grid-cols-2 gap-4">
        {joinedEvents.map((e, index) => (
          <motion.div
            key={e._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.2,
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
    </div>
  );
};

export default JoinedEvents;
