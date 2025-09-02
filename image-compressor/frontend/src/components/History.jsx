import React, { useState } from "react";
import { motion } from "framer-motion";
import { register as registerApi } from "../services/auth"; // Renamed import
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSpinner } from "../context/SpinnerContext";
import { getHistory } from "../services/history";
import DownloadCard from "./DownloadCard";

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  const fetchHistory = async () => {
    try {
      // Example API call
      const res = await getHistory();
      console.log("history res", res);
      setImages(res?.data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-gray-700">
      {/* History Button */}
      <button
        onClick={fetchHistory}
        className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg cursor-pointer"
      >
        History
      </button>

      {/* Slide Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-700 shadow-lg transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">History</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-500 text-white cursor-pointer"
          >
            ✖
          </button>
        </div>

        {/* Images */}
        <div className="overflow-y-auto h-[calc(100%-56px)] p-4">
          {images?.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {images.map((img, idx) => {
                const file = {
                  url: img?.compressedPath,
                  name: img?.originalFilename,
                  compressed: {
                    s3ImageUrl: img?.compressedPath,
                    record: {
                      originalSize: img?.originalSize,
                      compressedSize: img?.compressedSize,
                    },
                  },
                  original: {
                    name: img?.originalFilename,
                  },
                };
                return <DownloadCard key={idx} file={file} />;
              })}
            </div>
          ) : (
            <p className="text-gray-500">No history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
