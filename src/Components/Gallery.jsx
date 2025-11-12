import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import defaultImg from "../assets/thumbnail.png";
import { motion } from "motion/react";
motion;

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

  const gallery1 = eventGallery[0];
  const remainingGallery = eventGallery.slice(1, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-16 px-6"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-12">
        Our Gallery
      </h3>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
        <motion.img
          className="col-span-2 row-span-2 w-full h-full object-cover rounded-sm sm:rounded-xl hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] border-2 border-pink-400/20 hover:border-white"
          src={gallery1.thumbnail || defaultImg}
          alt={gallery1.title}
          whileHover={{
            scale: 1.02,
          }}
          transition={{ duration: 0.4 }}
        />

        {remainingGallery.map((gallery) => (
          <motion.img
            key={gallery._id}
            src={gallery.thumbnail || defaultImg}
            alt={gallery.title}
            className="w-full h-full object-cover rounded-sm sm:rounded-xl hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] border border-pink-400/20 hover:border-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Gallery;
