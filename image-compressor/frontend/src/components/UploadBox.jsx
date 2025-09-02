import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineUpload } from "react-icons/ai";
import { compressImage } from "../services/compress";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useSpinner } from "../context/SpinnerContext";

const UploadBox = ({ setUploadedFiles, setProgress, uploadedFiles }) => {
  const fileInputRef = useRef();
  const { isAuthenticated } = useContext(AuthContext);
  const [quality, setQuality] = useState(80);
  const { toggleSpinner } = useSpinner();
  const handleFiles = (files) => {
    if (!isAuthenticated) {
      alert("Please login first");
      return;
    }

    const uploaded = Array.from(files);
    setUploadedFiles(uploaded);
  };

  const compressAllImage = async () => {
    setProgress(0);
    toggleSpinner(true);
    Promise.all(
      uploadedFiles.map((file) =>
        compressImage(file, quality, (prog) => setProgress(prog))
      )
    )
      .then((compressedFiles) => {
        toggleSpinner(false);
        setProgress(100);
        setUploadedFiles(
          compressedFiles.map((data, idx) => ({
            original: uploadedFiles[idx],
            compressed: data, // API response (with imageUrl, sizes, etc.)
          }))
        );
      })
      .catch((err) => {
        toggleSpinner(false);
        console.error("Compression error:", err);
        setProgress(0);
      });
  };

  return (
    <>
      <motion.div
        className="w-full max-w-md border-2 border-dashed border-gray-500 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
        onClick={() => fileInputRef.current.click()}
        whileHover={{ scale: 1.05 }}
      >
        <AiOutlineUpload className="text-6xl text-indigo-500 mb-4" />
        <p className="text-gray-300 mb-2">
          Drag & Drop images here or click to upload
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </motion.div>
      <div className="border-2 p-3 rounded-xl border-gray-500 flex justify-center items-center gap-2 ">
        {" "}
        <label>Quality : </label>
        <input
          type="range"
          min={20}
          max={80}
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="cursor-pointer"
        />
      </div>

      <button
        type="button"
        onClick={compressAllImage}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 
             p-3 rounded-lg cursor-pointer 
             transition-all duration-500 ease-in-out 
             transform hover:scale-105 hover:to-indigo-500 text-white font-semibold shadow-md"
      >
        Compress
      </button>
    </>
  );
};

export default UploadBox;
