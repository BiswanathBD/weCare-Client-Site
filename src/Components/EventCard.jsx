import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
motion;
import { CalendarDays, MapPin } from "lucide-react";
import defaultProfile from "../assets/profile.png";
import defaultThumbnail from "../assets/thumbnail.png";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";

const EventCard = ({ event }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  const {
    _id,
    title,
    description,
    category,
    thumbnail,
    location,
    eventDate,
    creatorName,
    creatorEmail,
    creatorPhotoURL,
  } = event;

  useEffect(() => {
    axiosInstance
      .get(`/isJoined/${user?.email}/${_id}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setJoined(true);
        }
      });
  }, [axiosInstance, user, _id]);

  const formattedDate = new Date(eventDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleJoin = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const newJoin = {
      eventId: id,
      userEmail: user?.email,
      eventDate,
    };
    axiosInstance
      .post("/joinEvent", newJoin, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          setJoined(true);
          toast.success("Joined Successfully");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative h-full flex flex-col md:flex-row bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-2xl transition-all duration-300 md:ml-8 w-full mx-auto"
    >
      {/* category tag */}
      <button className="absolute right-6 bg-purple-800 text-white font-semibold text-sm rounded-full px-3 py-1 top-0 -translate-y-1/2">
        {category}
      </button>

      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-500/10 via-transparent to-cyan-400/10 blur-2xl opacity-70 rounded-2xl" />

      <div className="relative w-full md:w-3/7 group p-4 md:p-0">
        <img
          className="w-full object-cover rounded-xl aspect-5/3
                     border-3 border-purple-400 shadow-[0_0_25px_rgba(236,72,153,0.6)]
                     md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-8 md:aspect-5/4"
          src={thumbnail || defaultThumbnail}
          alt={title}
        />
      </div>

      <div className="md:w-4/7 w-full p-5 md:p-8 flex flex-col justify-between relative z-10">
        <div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-purple-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-teal-500" />
              <span>{location || "Online"}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed line-clamp-3 text-gray-600">
            {description || "No description provided for this event."}
          </p>
        </div>

        {/* Creator info */}
        <div className="mt-4 flex items-center gap-3">
          <img
            src={creatorPhotoURL || defaultProfile}
            alt={creatorName}
            className="w-10 h-10 rounded-full border border-purple-400/40 object-cover"
          />
          <div>
            <p className="text-sm font-medium">{creatorName || "Host"}</p>
            <p className="text-xs text-gray-500">{creatorEmail || "N/A"}</p>
          </div>
        </div>

        {/* join btn */}
        <div className="flex gap-3 mt-5">
          {joined ? (
            <motion.button className="flex-1 px-4 py-2 rounded-lg border border-purple-400/40 text-sm font-medium bg-purple-500/20 text-white/50 text-nowrap transition-all">
              Joined
            </motion.button>
          ) : (
            <motion.button
              onClick={() => handleJoin(_id)}
              whileHover={{ scale: 1.05 }}
              className="flex-1 px-4 py-2 rounded-lg border border-purple-400/40 text-sm font-medium text-purple-600 hover:bg-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all text-nowrap"
            >
              Join Event
            </motion.button>
          )}

          <Link to={`/eventDetails/${_id}`} className="grow">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex-1 px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 text-sm text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
