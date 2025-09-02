const baseurl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_URL
    : "https://image-compressor-frontend.vercel.app";

const token = localStorage.getItem("token");
export default { baseurl, token };
