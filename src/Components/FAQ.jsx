import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
motion;
import { AuthContext } from "../Context/AuthContext";
import { BsPlusLg } from "react-icons/bs";

const faqData = [
  {
    q: "How do I create an event?",
    a: "Create an account (or log in), then open the Create Event form. Fill in the title, detailed description, date & time, location, and category. Add images or resources if available, set any capacity or privacy settings, and publish. You can always edit the event later from your Manage Events dashboard.",
  },
  {
    q: "Is there a fee to join events?",
    a: "Most events listed on weCare are free to join. If an organizer charges a fee, the event details page will clearly display pricing, payment instructions, and any refund policy. Always check the event description before signing up and reach out to the organizer for questions about costs.",
  },
  {
    q: "How do I manage attendees?",
    a: "Open the Manage Events area in your dashboard to see attendees, pending requests, and registration details. From there you can approve or remove participants, export attendee lists, send updates, or edit event information. The dashboard centralizes common organizer actions to make event administration straightforward.",
  },
  {
    q: "How is my privacy handled?",
    a: "weCare uses Firebase authentication to securely manage accounts and minimizes data sharing. We only share the information you explicitly provide to event organizers (such as your name or email when you sign up for an event). Review our privacy settings and contact support if you have specific concerns about data handling.",
  },
  {
    q: "Can I host recurring events?",
    a: "Yes — when creating an event you can indicate if it repeats (weekly, monthly, etc.) and provide recurrence details in the description. If you need advanced recurrence rules, include them in the event notes and/or create separate events for each occurrence. Recurring events help build consistent community engagement.",
  },
  {
    q: "How do I report inappropriate content or behavior?",
    a: "If you encounter inappropriate content, harassment, or unsafe behavior, report it immediately using the contact form or support email listed on the Contact page. Provide event details, user information, and screenshots if possible. Our team reviews reports promptly and will follow up with actions such as warnings, removals, or account suspensions as needed.",
  },
];

const FAQ = () => {
  const { isDark } = useContext(AuthContext);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-12">
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-10">
        Frequently Asked Questions
      </h3>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border overflow-hidden self-start ${
                isDark
                  ? "bg-black/60 border-pink-400/10"
                  : "bg-white/90 border-pink-400/10"
              }`}
            >
              <button
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4"
              >
                <h4 className="font-semibold text-pink-400">{item.q}</h4>
                <span
                  className={`text-pink-400 font-bold transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <BsPlusLg />
                </span>
              </button>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  isOpen
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div className="p-6 pt-0">
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } text-sm leading-relaxed`}
                  >
                    {item.a}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
