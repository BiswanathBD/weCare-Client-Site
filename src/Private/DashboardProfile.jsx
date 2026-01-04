import React, { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import useAuth from "../Hooks/useAuth";
import { motion } from "framer-motion";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";
import { Pencil, Check, X } from "lucide-react";
import profile from "../assets/profile.png";

const DashboardProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName, photoURL });
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setEditMode(false);
    } catch (err) {
      console.error("Profile update error:", err);
      Swal.fire({
        icon: "error",
        title: "Profile update failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-12 p-8 md:p-12 rounded-3xl shadow-lg backdrop-blur-md flex flex-col lg:flex-row items-center gap-10"
    >
      {/* Profile Image */}
      <div className="shrink-0 w-36 lg:w-48 xl:w-64 aspect-square rounded-full overflow-hidden shadow-md">
        <img
          src={photoURL || profile}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex-1 w-full space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
            Your Profile
          </h2>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 text-pink-400 hover:text-pink-500 font-semibold transition"
            >
              <Pencil size={18} /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleUpdateProfile}
                className="flex items-center gap-2 text-green-500 font-semibold hover:text-green-600 transition"
                disabled={loading}
              >
                <Check size={18} /> Update
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setDisplayName(user.displayName || "");
                  setPhotoURL(user.photoURL || "");
                }}
                className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 mb-1">Name</span>
            {editMode ? (
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full py-2 px-4 text-lg bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            ) : (
              <p className="text-lg lg:text-2xl xl:text-3xl font-medium">
                {displayName}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-400 mb-1">Email</span>
            <p className="text-lg font-medium py-2 px-4">{user.email}</p>
          </div>

          <div className="flex flex-col md:col-span-2">
            <span className="text-sm text-gray-400 mb-1">Photo URL</span>
            {editMode ? (
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full py-2 px-4 text-lg bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter photo URL"
              />
            ) : (
              <p className="text-lg text-gray-600 truncate">
                {photoURL || "No photo"}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardProfile;
