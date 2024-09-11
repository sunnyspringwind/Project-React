import React, { useState, useEffect } from "react";
import FetchData from "../utils/FetchData";

import HeartIcon from "../utils/HeartIcon";

const TopTravelPacakges = () => {
  let [topTravelPackages, setTopTravelPacakges] = useState([]);
  let [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    FetchData("travelPackages", setTopTravelPacakges);
  }, []); // Empty dependency array ensures this runs only once

  if (!topTravelPackages || topTravelPackages.length === 0) {
    return <div>...Loading</div>;
  }

  const changeVisibility = () => {
    !isVisible ? setVisibility(true) : setVisibility(false);
  };
  return (
    <>
      <button
        onClick={changeVisibility}
        className=" w-full h-10 text-left pl-2 mb-2 flex items-center font-serif text-2xl"
      >
        <img
          className="h-8 w-8 rounded-3xl mr-2"
          src={topTravelPackages[1].image[0]}
        />
        Top Travel Packages
      </button>

      {/* true and something is true false and something is false */}
      {isVisible && (
        <div className="grid mb-6 grid-flow-col gap-3">
          {topTravelPackages.slice(0, 4).map((travelPackage) => (
            <div
              key={travelPackage.id}
              className="relative h-[310px] rounded-lg overflow-hidden m-2 hover:-translate-y-4 "
            >
              <img
                src={travelPackage.image[0]}
                className="h-full object-cover w-full"
              />
              <button className="absolute top-3 left-3 ">
                <HeartIcon />
              </button>
              <span className="backdrop-blur-sm absolute bottom-3 left-3 text-white font-semibold">
                {travelPackage.title}
              </span>
              <span className="backdrop-blur-sm absolute bottom-3 right-3 text-white font-semibold ">
                {travelPackage.weather.slice(0, 10)}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopTravelPacakges;
