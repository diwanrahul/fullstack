import { createContext, useState, useEffect } from "react";
import { useSpinner } from "./SpinnerContext";
import { logout as loggedOut } from "../services/auth";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const { toggleSpinner } = useSpinner();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // toggleSpinner(true);
    window.location.reload();
    loggedOut();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // toggleSpinner(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
