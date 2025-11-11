import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Loader";
import { CalendarDays, MapPin } from "lucide-react";
import defaultProfile from "../assets/profile.png";
import defaultThumbnail from "../assets/thumbnail.png";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";

const EventDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useAuth();
  const { user } = useAuth();
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/event/${id}`)
      .then((data) => {
        setEvent(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [axiosInstance, id]);

  useEffect(() => {
    axiosInstance
      .get(`/isJoined/${user.email}/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setJoined(true);
        }
      });
  }, [axiosInstance, user, id]);

  const handleJoin = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const newJoin = {
      eventId: id,
      userEmail: user.email,
      eventDate: event.eventDate,
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
        }
      })
      .catch((error) => console.log(error));
  };

  if (loading) return <Loader />;

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

  const formattedDate = new Date(eventDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-12"
    >
      <h3 className="text-3xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent w-fit mx-auto pb-4">
        Event Details
      </h3>
      {/* line */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-pink-400/30 to-transparent mb-12"></div>

      <div
        className={`grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border ${
          isDark ? "border-white/10" : "border-gray-200"
        }`}
      >
        {/* left side */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[300px] md:h-auto"
        >
          <img
            src={thumbnail || defaultThumbnail}
            alt={title}
            className="w-full h-full object-cover brightness-75"
          />
          {/* title background */}
          <div
            className={`absolute inset-0 bg-linear-to-t ${
              isDark ? " from-black/70" : "from-white/70"
            } via-transparent to-transparent `}
          />

          <div className="absolute bottom-6 left-6">
            <span className="inline-block bg-purple-400/40 border border-purple-400/60 px-4 py-1 rounded-full text-sm font-medium shadow">
              {category}
            </span>
            <h1 className="mt-3 text-2xl md:text-4xl font-bold drop-shadow-lg bg-linear-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
              {title}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-pink-400" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal-400" />
                {location}
              </div>
            </div>
          </div>
        </motion.div>

        {/* right side */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-between p-8 md:p-10 
            bg-linear-to-br from-pink-500/5 to-purple-600/20"
        >
          <div>
            <h2 className="text-2xl text-pink-500 font-semibold drop-shadow mb-1">
              --- About This Event
            </h2>
            <p className="leading-relaxed text-base md:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-8 border-t border-white/20 pt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <img
                src={creatorPhotoURL || defaultProfile}
                alt={creatorName}
                className="w-12 h-12 rounded-full border border-white/40 object-cover shadow-md"
              />
              <div>
                <p className="font-semibold">{creatorName}</p>
                <p className="text-sm text-gray-400">{creatorEmail}</p>
              </div>
            </div>

            {joined ? (
              <motion.button className="px-6! py-3! rounded-2xl bg-purple-400/20 border border-purple-400/30 font-semibold">
                Joined
              </motion.button>
            ) : (
              <motion.button
                onClick={() => handleJoin(_id)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(236,72,153,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6! py-3! rounded-2xl btn-primary"
              >
                Join Event
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetails;
