import config from "./config";
import axios from "axios";

export const compressImage = async (file, quality, onProgress) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("quality", quality);

    const res = await axios.post(`${config.baseurl}/api/compress`, formData, {
      withCredentials: true, // ✅ include cookies if needed for auth
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return res.data;
  } catch (error) {
    console.error("Compression API error:", error);
    throw error;
  }
};

// module.exports  = compressImage;
