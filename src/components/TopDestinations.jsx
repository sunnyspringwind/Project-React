import React, { useState, useEffect } from "react";
import FetchData from "../utils/FetchData";

import HeartIcon from "../utils/HeartIcon";

const TopDestinations = () => {

  let [topDestinations, setTopDestinations] = useState([]);
  let [isVisible, setVisibility] = useState(false);



  useEffect(() => {
    FetchData("destination", setTopDestinations);
  }, []); // Empty dependency array ensures this runs only once
 
   if (!topDestinations || topDestinations.length === 0) {
     return <div>...Loading</div>;
   }

   const changeVisibility = () => {
     !isVisible ? setVisibility(true): setVisibility(false);
   }
  return (
    <>
      <button
        onClick={changeVisibility}
        className=" w-full h-10 text-left pl-2 flex items-center font-serif text-2xl mb-2"
      >
        <img
          className="h-8 w-8 rounded-3xl mr-2"
          src={topDestinations[1].image[0]}
        />
        Top Destinations
      </button>

      {/* true and something is true false and something is false */}
      {isVisible && (
        <div className="grid grid-flow-col gap-3 mb-6">
          {topDestinations.slice(0,4).map((desti) => (
            <div
              key={desti.id}
              className="relative h-[310px] rounded-lg overflow-hidden m-2"
            >
              <img src={desti.image[0]} className="h-full object-cover " />
              <button className="absolute top-3 left-3 ">
                <HeartIcon />
              </button>
              <span className="absolute bottom-3 left-3 text-white font-semibold">
                {desti.title}
              </span>
              <span className="absolute bottom-3 right-3 text-white font-semibold">
                {desti.weather.slice(0,10)}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopDestinations;


