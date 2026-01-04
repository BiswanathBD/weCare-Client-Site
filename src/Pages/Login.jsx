import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

const Login = () => {
  const { user, setUser, loading, setLoading, googleSignIn, passwordSignIn } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPassword, setDemoPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  if (user) return <Navigate to={state || "/"} />;
  if (loading) return;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    passwordSignIn(email, password)
      .then((result) => {
        toast.success("You are logged in");
        setUser(result.user);
        setLoading(false);
        navigate(state || "/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Invalid Email or Password");
        } else {
          console.log(error);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        navigate(state || "/");
      })
      .catch((error) => toast.error(error.code));
  };

  const fillDemoCredentials = () => {
    setDemoEmail("demo.user@gmail.com");
    setDemoPassword("demoUser@1234");
  };

  return (
    <motion.nav initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col items-center justify-center px-4 min-h-[80vh]">
        <h2 className="text-4xl font-bold mb-6 text-center tracking-wide">
          Welcome Back
        </h2>

        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-pink-200/20 backdrop-blur-sm">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={demoEmail}
              onChange={(e) => setDemoEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={demoPassword}
                onChange={(e) => setDemoPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-pink-300/30 focus:ring-2 focus:ring-pink-400 transition-all bg-transparent placeholder:text-gray-400"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-pink-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            <button
              type="submit"
              className="btn-primary mt-4 w-full bg-linear-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-400 shadow-lg transition-all"
            >
              Login
            </button>

            {/* Demo User Button */}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-2 w-full bg-pink-100 text-pink-500 font-semibold py-2 rounded-lg hover:bg-pink-200 transition"
            >
              Fill Demo User
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
            Don't have an account?{" "}
            <Link to={"/register"} className="font-semibold text-pink-400 ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.nav>
  );
};

export default Login;
