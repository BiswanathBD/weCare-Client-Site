import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import defaultProfile from "../assets/profile.png";
import defaultThumbnail from "../assets/thumbnail.png";
import { CalendarDays, MapPin, TagIcon } from "lucide-react";
import { motion } from "framer-motion";
motion;
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

  const handleRemoveJoin = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      const req = axiosInstance.delete(`joinedEvent/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      toast.promise(req, {
        loading: "Removing...",
        success: (res) => {
          if (res.data && res.data.deletedCount === 1) {
            const newJoinedEvents = joinedEvents.filter((ev) => ev._id !== id);
            setJoinedEvents(newJoinedEvents);
            return "Removed successfully";
          }
          return "Nothing removed";
        },
        error: (err) => err?.message || "Failed to remove",
      });

      req.catch((err) => console.error(err));
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex flex-col items-center sm:items-stretch gap-4 p-3 rounded-2xl border border-pink-400/20 bg-linear-to-r from-purple-500/10 via-purple-600/10 to-pink-400/10 h-full"
    >
      <div className="w-full aspect-4/3 rounded-lg overflow-hidden shrink-0 relative">
        <img
          src={thumbnail || defaultThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute z-50 bottom-2 left-2">
          <div className="flex items-center gap-2 text-sm mb-1 text-gray-400">
            <CalendarDays size={15} className="text-pink-400" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm mb-1 text-gray-400">
            <MapPin size={15} className="text-teal-400" />
            <span>{location}</span>
          </div>
        </div>
        <div className="absolute h-full w-full bg-linear-to-t from-black z-30 bottom-0"></div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-400 bg-blue-400/20 w-fit px-2 py-1 rounded-full border border-blue-400/30">
          <TagIcon size={15} className="text-blue-400" />
          <span>{category}</span>
        </div>

        <h2 className="text-2xl font-semibold my-3">{title}</h2>

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
          scale: 1.01,
        }}
        whileTap={{ scale: 0.95 }}
        className="mt-3 w-full px-5 py-2 rounded-lg border border-pink-500/40 font-medium hover:text-white hover:border-pink-500 bg-pink-500/10 transition-all"
      >
        Remove
      </motion.button>
    </motion.div>
  );
};

export default JoinedList;
