import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

//Components
import Landing from "./components/Landing.jsx";
import SignUp from "./components/SignUp.jsx";
import Destinations from "./components/Destinations.jsx";
import TravelPackages from "./components/TravelPackages.jsx";
import TravelPage from "./components/TravelPage.jsx";
import Home from "./components/Home.jsx";
import Hotels from "./components/Hotels.jsx";
import HotelPage from "./components/HotelPage.jsx";
import Profile from "./components/ProfilePage.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
import SignIn from "./components/SignIn.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5058/wandermate_backend/Account/verify-token"
          );
          console.log(response);
          setIsAuthenticated(true);
          setLoading(true);
        } catch (error) {
          handleLogout();
        }
      }
      setLoading(false);
    };
    validateToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setLoading(false);
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
            />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/travelpackages" element={<TravelPackages />} />
            <Route path="/travelpackages/:id" element={<TravelPage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/signin"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <SignIn setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile isAuthenticated={isAuthenticated}/>
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route path="/admin/*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
