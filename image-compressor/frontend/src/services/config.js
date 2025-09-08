const baseurl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_URL // e.g. http://localhost:4000
    : "https://backend-tau-navy-49.vercel.app"; // your backend on Vercel

const token = localStorage.getItem("token");
export default { baseurl, token };
