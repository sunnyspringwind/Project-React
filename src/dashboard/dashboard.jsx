import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import sideBarBg from "../assets/images/sideBarBg.jpg"
import pathBg from "../assets/images/pathBg.jpg";
import DestinationsDash from "./Dash-destinations";
import HotelsDash from "./Dash-hotels.jsx";
import TravelsDash from "./Dash-travels";
import UsersDash from "./Dash-users.jsx";
import TopDestinationsDash from "./Dash-topDestinations.jsx";
import ThingsToDoDash from "./Dash-thingsToDo.jsx";


function Admin() {
    

    return (
      <>
        <div className="flex h-screen overflow-hidden">
          <div className="w-[15vw] bg-[#07a9fa] h-screen ">
            <SideBar />
          </div>
          <div className=" w-[85vw] h-screen flex justify-center overflow-hidden">      
              <Paths />
          </div>
        </div>
      </>
    );
}

export default Admin;




const SideBar = () => {
  return (
    <div className=" h-full flex justify-center items-center w-full ">
      <ul className="z-10  font-fredericka flex flex-col gap-y-10 text-2xl text-[#ffffff]">
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
        <li className="hover:underline hover:text-red-500">
          <Link to="topDestinations">Top Destinations</Link>
        </li>
        <li className="hover:underline hover:text-red-500">
          <Link to="thingsToDo">Things To Do</Link>
        </li>
      </ul>
    </div>
  );
};


const Paths = () => {
  return (
    <div className=" w-full h-full">
      <Routes>
        <Route path="hotels" element={<HotelsDash />} />
        <Route path="users" element={<UsersDash />} />
        <Route path="destinations" element={<DestinationsDash />} />
        <Route path="travels" element={<TravelsDash />} />
        <Route path="topDestinations" element={<TopDestinationsDash />} />
        <Route path="thingsToDo" element={<ThingsToDoDash />} />
      </Routes>
    </div>
  );
};

