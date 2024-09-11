
import React, {useState, useEffect} from "react";
import FetchData from "../utils/FetchData";

import HeartIcon from "../utils/HeartIcon";


const TopHotels = () => {

  let [topHotels, setTopHotels] = useState([]);
  let [isVisible, setVisibility] = useState(false);



  useEffect(() => {
    FetchData("hotel", setTopHotels);
  }, []); // Empty dependency array ensures this runs only once
 
   if (!topHotels || topHotels.length === 0) {
     return <div>...Loading</div>;
   }

   const changeVisibility = () => {
     !isVisible ? setVisibility(true): setVisibility(false);
   }
  return (
    <>
      <button
        onClick={changeVisibility}
        className=" w-full h-10 text-left pl-2 mb-2 flex items-center  font-serif text-2xl "
      >
        <img className="h-8 w-8 rounded-3xl mr-2" src={topHotels[0].image[0]} />
        Top Hotels
      </button>

      {/* true and something is true false and something is false */}
      {isVisible && (
        <div className="grid mb-6 grid-cols-4 gap-3 ">
          {topHotels.slice(0, 4).map((hotel) => (
            <div
              key={hotel.id}
              className="relative h-[310px] rounded-lg overflow-hidden m-2 hover:-translate-y-4"
            >
              <img src={hotel.image[0]} className="h-full w-full object-cover " />
              <button className="absolute top-3 left-3 ">
                <HeartIcon />
              </button>
              <span className="backdrop-blur-sm absolute bottom-3 left-3 text-white font-semibold">
                {hotel.name}
              </span>
              <span className="backdrop-blur-sm absolute bottom-3 right-3 text-white font-semibold">
                ${hotel.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopHotels;
