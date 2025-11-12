import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";
motion;

const EditEvent = () => {
  const { user } = useAuth();
  const [eventDate, setEventDate] = useState(null);
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/event/${id}`).then((res) => {
      setEvent(res.data);
      setLoading(false);
      if (res.data.eventDate) {
        setEventDate(new Date(res.data.eventDate));
      }
    });
  }, [axiosInstance, user, id]);

  if (loading) return <Loader />;

  // event categories
  const eventTypes = [
    "Tree Plantation",
    "Cleanup",
    "Blood Donation",
    "Clothes Donation",
    "Education Campaign",
    "Health Camp",
    "Food Distribution",
    "Disaster Relief",
    "Child Welfare",
    "Community Development",
    "Cultural Event",
    "Training",
  ];

  const handleEditEvent = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedEvent = {
      title: form.title.value,
      category: form.category.value,
      thumbnail: form.thumbnail.value,
      description: form.description.value,
      location: form.location.value,
      eventDate,
    };

    const token = await user.getIdToken();
    axiosInstance
      .put(`/updateEvent/${event._id}`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          toast.success("Edited Successfully");
          navigate("/manageEvents");
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto mt-10 border border-purple-400/20 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-semibold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
        Update Event
      </h2>

      <form onSubmit={handleEditEvent} className="space-y-5 create-event">
        {/* title and category */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 ">Event Title</label>
            <input
              type="text"
              name="title"
              defaultValue={event.title}
              className="placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 ">Event Category</label>
            <select name="category" defaultValue={event.category} required>
              <option value="" selected disabled>
                Select Category
              </option>
              {eventTypes.map((type, index) => (
                <option key={index} value={type} className="text-gray-800">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* description */}
        <div>
          <label className="block text-sm mb-1 ">Description</label>
          <textarea
            name="description"
            defaultValue={event.description}
            className="h-32 placeholder-gray-400"
            required
          ></textarea>
        </div>

        {/* location and date */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 ">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={event.location}
              className="placeholder-gray-400"
              required
            />
          </div>

          {/* date */}
          <div>
            <label className="block text-sm mb-1 ">Event Date</label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              minDate={new Date()}
              defaultValue={event.eventDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        {/* thumbnail */}
        <div>
          <label className="block text-sm mb-1 ">Event Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            placeholder="Enter thumbnail image URL"
            defaultValue={event.thumbnail}
            className=" placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn-primary px-6! py-3! rounded-xl! hover:opacity-90 transition"
        >
          Update Now
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditEvent;
