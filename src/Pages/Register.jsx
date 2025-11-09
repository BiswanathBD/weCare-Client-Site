import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { updateProfile } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "motion/react";

const Register = () => {
  const { user, setUser, googleSignIn, signUpEmailPass, loading } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  if (user) return <Navigate to={"/"} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    if (password.length < 6) {
      return toast.error("Use at least 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      return toast.error("Add one uppercase letter");
    } else if (!/[a-z]/.test(password)) {
      return toast.error("Add one lowercase letter");
    }
    const confirmPassword = form.confirmPassword.value;
    if (confirmPassword !== password) {
      return toast.error("Password not Matched!");
    }
    const email = form.email.value;
    const displayName = `${form.firstName.value} ${form.lastName.value}`;
    const photoURL = form.photoUrl.value;

    // create account with email&pass
    signUpEmailPass(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName, photoURL });
        setUser(user);
        Swal.fire({
          title: "Registration Successful",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => toast.error(error.code));
  };

  // google sign in
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) =>
      setUser(result.user).catch((error) => toast.error(error.code))
    );
  };

  if (loading) return;

  return (
    <motion.nav initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col items-center justify-center px-4 min-h-[80vh]">
        <h2 className="text-4xl font-bold mb-6 text-center tracking-wide">
          Create Account
        </h2>

        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-pink-200/20 backdrop-blur-sm">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              {/* name */}
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`w-1/2 px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400`}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`w-1/2 px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400`}
                required
              />
            </div>
            {/* email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`w-full px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400`}
              required
            />
            {/* password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`w-full px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400`}
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-pink-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`w-full px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400`}
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-pink-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>
            {/* photo Url */}
            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              className={`w-full px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400`}
            />

            <button
              type="submit"
              className="btn-primary mt-4 w-full bg-linear-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-400 shadow-lg transition-all"
            >
              Register
            </button>
          </form>

          <div className="flex items-center gap-2 mt-6">
            <hr className="flex-1 border-gray-500/20" />
            <span className="text-gray-500/50">or</span>
            <hr className="flex-1 border-gray-500/20" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full btn-secondary flex items-center justify-center gap-4"
          >
            <FcGoogle size={20} /> Sign in with Google
          </button>
          <p className="text-center mt-6 text-sm text-pink-400/50">
            Already have an account?{" "}
            <Link to={"/login"} className="font-semibold text-pink-400 ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.nav>
  );
};

export default Register;
