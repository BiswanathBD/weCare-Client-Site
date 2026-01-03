import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import defaultImg from "../assets/thumbnail.png";
import { motion } from "framer-motion";
motion;
import { Link } from "react-router";
import { CalendarDays, MapPin } from "lucide-react";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [eventGallery, setEventGallery] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/featuresEvents").then((res) => {
      setEventGallery(res.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  if (loading) return;

  if (!eventGallery || eventGallery.length === 0) return null;

  const gallery1 = eventGallery[0];
  const remainingGallery = eventGallery.slice(1, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-16"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12">
        Our Gallery
      </h3>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
        <Link
          to={`/eventDetails/${gallery1._id}`}
          className="col-span-2 row-span-2 group block relative rounded-sm sm:rounded-xl overflow-hidden"
        >
          <motion.img
            className="w-full h-full object-cover rounded-sm sm:rounded-xl hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] border-2 border-pink-400/20 hover:border-white transform transition-transform duration-300 ease-out group-hover:scale-105"
            src={gallery1.thumbnail || defaultImg}
            alt={gallery1.title}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <h4 className="text-lg font-bold drop-shadow">{gallery1.title}</h4>
            <div className="flex flex-wrap gap-3 text-sm mt-2 items-center">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-pink-300" />
                {new Date(gallery1.eventDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal-300" />
                {gallery1.location}
              </div>
            </div>
          </div>
        </Link>

        {remainingGallery.map((gallery) => (
          <Link
            key={gallery._id}
            to={`/eventDetails/${gallery._id}`}
            className="group block relative rounded-sm sm:rounded-xl overflow-hidden"
          >
            <motion.img
              src={gallery.thumbnail || defaultImg}
              alt={gallery.title}
              className="w-full h-full object-cover rounded-sm sm:rounded-xl hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] border border-pink-400/20 hover:border-white transform transition-transform duration-300 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
              <h5 className="font-semibold drop-shadow text-sm">
                {gallery.title}
              </h5>
              <div className="flex gap-2 text-xs mt-1 items-center">
                <CalendarDays className="w-3 h-3 text-pink-300" />
                <span>{new Date(gallery.eventDate).toLocaleDateString()}</span>
                <MapPin className="w-3 h-3 text-teal-300 ml-2" />
                <span>{gallery.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default Gallery;
