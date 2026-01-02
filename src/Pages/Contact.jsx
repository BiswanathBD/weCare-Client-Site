import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";
import Newsletter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import { Link } from "react-router";
import toast from "react-hot-toast";

const Contact = () => {
  const { isDark } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    e.target.reset();
  };

  return (
    <div>
      <section className="py-12 container mx-auto px-4 md:px-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-fuchsia-500 to-rose-500">
              Get in <span className="text-pink-400">Touch</span>
            </h1>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}>
              If you have questions, partnership ideas, or need help with an
              event, reach out — we’d love to hear from you.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-pink-400 font-semibold">Email</h4>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  biswanath.sarker.bd@gmail.com
                </p>
              </div>

              <div>
                <h4 className="text-pink-400 font-semibold">Phone</h4>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  +880 1628-284848
                </p>
              </div>

              <div>
                <h4 className="text-pink-400 font-semibold">Address</h4>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={"/about-us"}
                  className="text-xs text-pink-400 underline"
                >
                  Learn more about our mission
                </Link>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="border border-purple-600/20 rounded-xl p-6 space-y-4 create-event"
            >
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  className="mt-1 w-full rounded-md border px-3 py-2 h-32"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button className="btn-primary">Send Message</button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 md:px-10">
        <h3 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
          Support & Help
        </h3>
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-600">
          We typically respond within 1-2 business days. <br /> For urgent
          requests, please call the phone number above.
        </div>
      </section>
    </div>
  );
};

export default Contact;
