import React from "react";
import { motion } from "framer-motion";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

const DownloadCard = ({ file }) => {
  const [open, setOpen] = useState(false);

  // if (!file?.compressed) {
  //   return;
  // }
  const handleDownload = async (url, name) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="font-semibold text-white">{file?.original?.name}</h3>
        <p className="text-gray-400 text-sm">
          {/* {(file.size / 1024).toFixed(2)} KB /{" "} */}
          {(file?.compressed?.record?.originalSize / 1024).toFixed(2)} KB /{" "}
          {(file?.compressed?.record?.compressedSize / 1024).toFixed(2)} KB
        </p>
      </div>

      <div className="flex gap-2">
        <a
          // href={file?.compressed?.s3ImageUrl || file.url}
          // target="_blank"
          className="bg-indigo-500 p-2 rounded hover:bg-indigo-600 transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <AiOutlineEye className="text-white" onClick={() => setOpen(true)} />
        </a>

        <button
          onClick={() => handleDownload(file.url, file.name)}
          className="bg-indigo-500 p-2 rounded hover:bg-indigo-600 transition-colors cursor-pointer"
        >
          <AiOutlineDownload className="text-white" />
        </button>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: file?.compressed?.s3ImageUrl }]}
      />
    </motion.div>
  );
};

export default DownloadCard;
