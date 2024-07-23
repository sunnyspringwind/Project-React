import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import sideBarBg from "../assets/images/sideBarBg.jpg"
import pathBg from "../assets/images/pathBg.jpg";
import Users from "./Users";
import DestinationsDash from "./Dash-destinations";
import HotelsDash from "./Dash-hotels.jsx";
import TravelsDash from "./Dash-travels";


function Admin() {
    

    return (
      <>
        <div className="flex">
          <div>
            <SideBar />
          </div>
          <div className="relative">
            <Paths />
          
          </div>
        </div>
      </>
    );
}

export default Admin;




const SideBar = () => {
  return (
    <div className="relative w-[25vw] h-screen flex flex-col justify-center items-center">
      <img src={sideBarBg} className="fixed object-cover h-screen"></img>
      <ul className="z-10 fixed  font-fredericka flex flex-col gap-y-10 text-2xl text-yellow-300 ">
        <li className="hover:underline hover:text-red-500">
          <Link to="/admin">Home</Link>
        </li>
        <li className="hover:underline hover:text-red-500">
          <Link to="users">Users</Link>
        </li>
        <li className="hover:underline hover:text-red-500">
          <Link to="hotels">Hotel Functiosn</Link>
        </li>
        <li className="hover:underline hover:text-red-500">
          <Link to="travels">Travel Functions</Link>
        </li>
        <li className="hover:underline hover:text-red-500">
          <Link to="destinations">Destinations</Link>
        </li>
      </ul>
    </div>
  );
};


const Paths = ()=> {
  return (
    <div className="relative w-[75vw] h-screen">
      <img src={pathBg} className="fixed object-cover w-full h-full"></img>
      <div className="">
        <Routes>
          <Route path="hotels" element={<HotelsDash />} />
          <Route path="users" element={<Users />} />
          <Route path="destinations" element={<DestinationsDash />} />
          <Route path="travels" element={<TravelsDash />} />
        </Routes>
      </div>
    </div>
  );
}


