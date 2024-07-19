import React  from "react";
import Nav from "./Nav.jsx";
import bgImg from "../assets/images/bg8.jpg"
import temple from "../assets/temple.jpg";
import Destinations from "./Destinations.jsx"
import TopDestinations from "./TopDestinations.jsx"
import ThingsToDo from "./ThingsToDo.jsx";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
      <>
        <div className="flex w-screen h-screen relative overflow-hidden">
          <div className="flex relative w-full h-full  overflow-hidden">
            <img
              src={bgImg}
              alt="bgImage"
              className="fixed h-screen w-screen"
            ></img>

            <span className="text-4xl text-[#ea580c] font-semibold relative p-6 ">
              <Link to="/signup" className="absolute z-20">
                Explore
              </Link>
            </span>
            <div className="flex justify-center w-full absolute py-9 z-10">
              <Nav />
            </div>

            <div className="mr-[-5.7rem] mt-[-3rem] w-[17.8rem] h-[15rem] relative ml-auto overflow-hidden">
              <img
                src={temple}
                alt="temple"
                className=" w-full origin-center rotate-[35deg]"
              ></img>
            </div>
            <div className="flex justify-center items-center absolute w-full h-full">
              <div className="flex-col">
                <p className="font-bold  text-center text-2xl text-emerald-300">
                  The Country of Himalayas
                </p>
                <p className="font-bold text-9xl  text-[#ea580c] ">
                  NEP<span className="text-white">AL</span>
                </p>
              </div>
            </div>
            <div className=" absolute font-semibold w-[17vw] h-[4.4vw] m-2 bottom-12">
              <p className="text-emerald-300">
                Visit Nepal. You will never regret it. This is something
                incredible, fantastic, mesmerizing and lifetime experience.
              </p>
            </div>
            <div className="absolute m-2 bottom-3 right-0">
              <ul className="flex text-[#fef2f2] font-bold text-xl space-x-14 ">
                <li>
                  <a href="https://www.facebook.com">Facebook</a>
                </li>
                <li>
                  <a href="https://www.twitter.com">Twitter</a>
                </li>
                <li>
                  <a href="https://www.instagram.com">Instagram</a>
                </li>
                <li>
                  <a href="https://www.youtube.com">Youtube</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}