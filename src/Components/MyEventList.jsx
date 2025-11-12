import React from "react";
import defaultThumbnail from "../assets/thumbnail.png";
import { CalendarDays, Edit, MapPin, TagIcon, Trash2 } from "lucide-react";

import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";
motion;

const MyEventList = ({ event, myEvents, setMyEvents }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { thumbnail, title, description, location, eventDate, category, _id } =
    event;

  const formattedDate = new Date(eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleDelete = (eventId) => {
    axiosInstance
      .delete(`/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.deletedCount === 1) {
          Swal.fire({
            title: "Event Deleted Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          const remainingEvents = myEvents.filter(
            (event) => event._id !== eventId
          );
          setMyEvents(remainingEvents);
        }
      });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 p-4 rounded-2xl border border-pink-400/20 bg-linear-to-r from-purple-500/10 via-purple-600/10 to-pink-400/10 h-full"
    >
      {/* image */}
      <div className="w-full sm:w-48 h-40 rounded-xl overflow-hidden shrink-0 shadow-md">
        <img
          src={thumbnail || defaultThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* content */}
      <div className="flex flex-col gap-1 justify-between grow">
        <div>
          <h2 className="text-2xl font-semibold mb-1">{title}</h2>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>

        <div className="h-px bg-pink-400/20 w-full"></div>

        <div className="flex gap-4 justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm mb-1">
              <CalendarDays size={15} className="text-pink-400" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 text-sm mb-1">
              <MapPin size={15} className="text-teal-400" />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <TagIcon size={15} className="text-blue-400" />
              <span>{category}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-4">
            <Link
              to={`/updateEvent/${_id}`}
              className="px-3 py-1.5 text-sm rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 flex items-center gap-1"
            >
              <Edit size={14} /> Edit
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="px-3 py-1.5 text-sm rounded-lg bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 flex items-center gap-1"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyEventList;
