import React from "react";
import { Link } from "react-router-dom";


export default function Nav() {

  return (
    <>
      <nav id="navItems" >
        <ul className="flex  text-[#000000] font-bold text-xl space-x-14">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/destinations">Destination</Link>
          </li> 
          <li>
            <Link to="/travelpackages">Travel Packages</Link>
          </li>
          <li>
            <Link to="/hotels">Hotels</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}