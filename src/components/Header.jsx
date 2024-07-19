 import React from "react";
 import userProfile from "../assets/images/userProfile.jpg";
 import Nav from "./Nav.jsx";
import { Link } from "react-router-dom";

function Header() {
    return (
      <>
        <header className=" flex justify-between my-6 items-center">
          <span className=" text-blue-500 text-2xl  font-bold">WanderMate</span>
          <Nav />
          <button className="flex items-center gap-2 font-fredericka">
            <span>DandalionFarmar</span>
            <Link to="/profile" >
              <img className="w-11 rounded-3xl " src={userProfile} />
            </Link>
          </button>
        </header>
      </>
    );
}

export default Header;