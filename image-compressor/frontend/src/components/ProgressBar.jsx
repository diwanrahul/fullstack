import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full max-w-md bg-gray-700 rounded-full h-4 overflow-hidden">
      <motion.div
        className="h-4 bg-indigo-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default ProgressBar;
