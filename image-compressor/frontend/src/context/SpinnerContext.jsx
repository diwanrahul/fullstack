// SpinnerContext.js
import { createContext, useContext, useState } from "react";

// create context
const SpinnerContext = createContext();

// provider
export const SpinnerProvider = ({ children }) => {
  const [isSpinner, setIsSpinner] = useState(false);

  // function to toggle spinner
  const toggleSpinner = (value) => {
    setIsSpinner(value);
  };

  return (
    <SpinnerContext.Provider value={{ isSpinner, toggleSpinner }}>
      {isSpinner && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-20 z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </SpinnerContext.Provider>
  );
};

// hook for easy usage
export const useSpinner = () => useContext(SpinnerContext);
