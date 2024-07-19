import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Landing from "./components/Landing.jsx";
import SignUp from "./components/SignUp.jsx";
import HotelList from "./components/HotelPage.jsx";
import Destinations from "./components/Destinations.jsx";
import TravelPackages from "./components/TravelPackages.jsx";
import TravelPage from "./components/TravelPage.jsx";
import Home from "./components/Home.jsx";
import Hotels from "./components/Hotels.jsx";
import HotelPage from "./components/HotelPage.jsx";
import Profile from "./components/ProfilePage.jsx";

export default function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/travelpackages" element={<TravelPackages />} />
            <Route path="/travelpackages/:id" element={<TravelPage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
