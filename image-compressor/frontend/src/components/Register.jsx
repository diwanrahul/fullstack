import React, { useState } from "react";
import { motion } from "framer-motion";
import { register as registerApi } from "../services/auth"; // Renamed import
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSpinner } from "../context/SpinnerContext";

const Register = ({ isOpen, onClose }) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
  const { toggleSpinner } = useSpinner();
  const {
    register: formRegister, // Renamed to avoid conflict
    handleSubmit,
    formState: { errors },
    reset, // Added reset function
  } = useForm();

  const submitForm = async (data) => {
    setIsSubmitting(true);
    try {
      toggleSpinner(true);
      const res = await registerApi(data);
      console.log("register res=>", res);

      reset();
      onClose();
      toggleSpinner(false);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      toggleSpinner(false);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }} // Added exit animation
        className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
              {...formRegister("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Please enter valid name",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
              {...formRegister("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
                {...formRegister("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <span
                onClick={() => setIsEyeOpen(!isEyeOpen)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
              >
                {isEyeOpen ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-400 hover:text-white transition-colors cursor-pointer"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default Register;
