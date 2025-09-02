import React, { useState } from "react";
import { motion } from "framer-motion";
import UploadBox from "../components/UploadBox";
import ProgressBar from "../components/ProgressBar";
import DownloadCard from "../components/DownloadCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  console.log("uploadedFiles", uploadedFiles);
  return (
    <div className="flex flex-col flex-1">
      <Header isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
      <main className="flex flex-col items-center justify-center flex-1 p-6 space-y-6">
        <UploadBox
          setUploadedFiles={setUploadedFiles}
          setProgress={setProgress}
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={setIsLoginOpen}
          uploadedFiles={uploadedFiles}
        />
        {/* {progress > 0 && <ProgressBar progress={progress} />} */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {uploadedFiles[0]?.compressed &&
            uploadedFiles?.length > 0 &&
            uploadedFiles?.map((file, idx) => (
              <DownloadCard key={idx} file={file} />
            ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
