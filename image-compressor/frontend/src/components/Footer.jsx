import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-gray-400 bg-gray-900 mt-auto">
      &copy; {new Date().getFullYear()} Rahul Kumar Diwan. All rights reserved.
    </footer>
  );
};

export default Footer;
