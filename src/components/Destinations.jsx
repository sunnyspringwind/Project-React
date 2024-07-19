
import { useEffect, useState } from "react";
import React from "react";
import FetchData from "../utils/FetchData";
import Slider from "../utils/Slider";
import Header from "./Header.jsx";
import TopHotels from "./TopHotels.jsx";
import TopTravelPacakges from "./TopTravelPackages.jsx";
import ThingsToDo from "./ThingsToDo.jsx";
import Footer from "./Footer.jsx"

export default function Destinations() {

    // useState hook to keep state changing variable
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
FetchData("destination", setDestinations)}, [])
  // change state of destinations
  return (
    <>
      <div className="relative w-[86vw] h-screen  mx-[7vw]">
        <Header />
        <div className=" h-[80%] w-full relative flex text-right mt-5 overflow-hidden">
          <Slider imgApi={destinations} />
        </div>
        <div className="mt-10 w-ful grid gap-2">
          <TopHotels />
          <TopTravelPacakges />
          <ThingsToDo />
          <Footer/>
        </div>
      </div>
    </>
  );
}
