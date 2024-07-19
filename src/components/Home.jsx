import React, {useState, useEffect} from "react";

import FetchData from "../utils/FetchData.jsx";
import TopDestinations from "./TopDestinations.jsx";
import TopHotels from "./TopHotels.jsx";
import TopTravelPacakges from "./TopTravelPackages.jsx";
import ThingsToDo from "./ThingsToDo.jsx";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import homeImage from "../assets/images/headerImg9.jpg";



export default function Home() {

    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        FetchData("destination", setDestinations)

    }, [])

// console.log('dest in home', destinations)
    return (
      <div className="relative w-[86vw] h-screen  mx-[7vw]">
        <Header />
        <div className=" h-[78%] w-full relative flex text-right mt-5 overflow-hidden">
          <img className="object-cover w-full rounded-lg" src={homeImage}></img>
          <div className="flex absolute w-full h-full justify-center items-center ">
            <input
              className="w-1/3 px-6 h-[4rem] rounded-md text-2xl stroke-none font-fredericka"
              type="text"
              name="homeSearch"
              placeholder="Search Your Places, Destination..."
            />
            <button className="bg-blue-500 w-[3rem] h-[3rem] pt-1 rounded-full absolute left-[62%]">
              <i
                className="fas fa-magnifying-glass text-white text-2xl"
                // style={{ color: "#ffffff", fontSize: 18}}
              />
            </button>
          </div>
          {/* <Slider imgApi={destinations} /> */}
        </div>
        <div className="mt-10 w-ful grid gap-2">
          <TopDestinations />
          <TopHotels />
          <TopTravelPacakges />
          <ThingsToDo />
        </div>
        <div className="pb-2">
          <Footer />
        </div>
      </div>
    );
}