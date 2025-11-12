import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import defaultProfile from "../assets/profile.png";
import defaultThumbnail from "../assets/thumbnail.png";
import { CalendarDays, MapPin, TagIcon } from "lucide-react";
import { motion } from "framer-motion";
motion;
import toast from "react-hot-toast";

const JoinedList = ({ e, joinedEvents, setJoinedEvents }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get(`/event/${e.eventId}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance, e]);

  if (loading) return;

  const {
    thumbnail,
    title,
    location,
    eventDate,
    category,
    creatorName,
    creatorEmail,
    creatorPhotoURL,
  } = event;

  const formattedDate = new Date(eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleRemoveJoin = (id) => {
    axiosInstance
      .delete(`joinedEvent/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.deletedCount === 1) {
          toast.success("Removed Successfully");
          const newJoinedEvents = joinedEvents.filter((ev) => ev._id !== id);
          setJoinedEvents(newJoinedEvents);
        }
      });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 p-4 rounded-2xl border border-pink-400/20 bg-linear-to-r from-purple-500/10 via-purple-600/10 to-pink-400/10 h-full"
    >
      <div className="w-full sm:w-48 h-40 rounded-xl overflow-hidden shrink-0 shadow-md">
        <img
          src={thumbnail || defaultThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>

        <div className="flex sm:flex-col gap-4 sm:gap-0">
          <div className="flex items-center gap-2 text-sm mb-1 text-gray-400">
            <CalendarDays size={15} className="text-pink-400" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm mb-1 text-gray-400">
            <MapPin size={15} className="text-teal-400" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <TagIcon size={15} className="text-blue-400" />
            <span>{category}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <img
            src={creatorPhotoURL || defaultProfile}
            alt={creatorName}
            className="w-8 h-8 rounded-full border border-pink-400/40"
          />
          <p className="flex flex-col">
            <span className="font-semibold text-sm">{creatorName}</span>
            <span className="text-sm text-gray-400">{creatorEmail}</span>
          </p>
        </div>
      </div>

      {/* remove btn */}
      <motion.button
        onClick={() => handleRemoveJoin(e._id)}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        className="mt-3 w-full sm:w-fit sm:mt-0 sm:self-center px-5 py-2 rounded-lg border border-pink-500/40 font-medium hover:text-white hover:border-pink-500 bg-pink-500/10 transition-all"
      >
        Remove
      </motion.button>
    </motion.div>
  );
};

export default JoinedList;
