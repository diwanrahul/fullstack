import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "../context/AuthContext";
import History from "./History";

const Header = ({ isLoginOpen, setIsLoginOpen }) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <motion.header
      className="w-full py-6 bg-gray-900 text-white text-center shadow-lg flex flex-row items-end justify-between px-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-wide">Kilobyte Kutter</h1>
        <p className="text-sm text-gray-400 mt-1">
          Compress your images quickly & efficiently
        </p>
      </div>
      {/* <div className="flex bg-gray-100"> */}

      <div className="flex items-end justify-end space-x-4">
        {isAuthenticated ? (
          <>
            {/* <button
              // onClick={() => logout()}
              className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg cursor-pointer"
            >
              
            </button> */}
              <History/>
            <button
              onClick={() => logout()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
            >
              Register
            </button>
          </>
        )}
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      {/* </div> */}
    </motion.header>
  );
};

export default Header;
