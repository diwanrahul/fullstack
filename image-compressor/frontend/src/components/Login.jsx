import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login as loginApi } from "../services/auth";
import { AuthContext } from "../context/AuthContext";
import { useSpinner } from "../context/SpinnerContext";

const Login = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const { login } = useContext(AuthContext);
  const { toggleSpinner } = useSpinner();

  const submitForm = async (data) => {
    try {
      toggleSpinner(true);
      const res = await loginApi(data);
      reset();
      onClose();
      login(res?.data?.token);
      toggleSpinner(false);
    } catch (error) {
      toggleSpinner(false);
      console.log(error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("email", {
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
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <div className="relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9.@#$%&*]{6,}$/,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <span
              onClick={() => setIsEyeOpen(!isEyeOpen)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {isEyeOpen ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors  cursor-pointer"
          >
            Login
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
