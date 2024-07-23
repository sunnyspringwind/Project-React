import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

import GiveStars from "../utils/GiveStars";

function Hotels() {
  const freeCancellation = (
    <span className=" text-black pr-2"> &#x2713; Free Cancellation</span>
  );
  const noFreeCancellation = (
    <span className=" text-black pr-2"> &#x2717; Free Cancellation</span>
  );

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    FetchData("hotels", setHotels);
  }, []);

  return (
    <>
      <div className="relative w-[86vw] h-screen  lg:mx-[7vw]">
        <Header />
        <div className="relative w-full h-auto flex flex-col">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="relative w-full h-[300px] shadow-lg flex mb-5 overflow-hidden gap-5 "
            >
              <div className=" w-2/4 h-full object-cover">
                <img src={hotel.img}></img>
              </div>
              <div className=" w-2/4 h-full flex justify-center items-center flex-col gap-2">
                <span className="font-semibold text-xl">{hotel.name}</span>
                <span className="font-semibold text-xl">${hotel.price}</span>

                <Link
                  to={`${hotel.id}`}
                  className="bg-blue-600 px-5 text-xl rounded text-white"
                >
                  View Deal
                </Link>
                <ul>
                  <li>
                    {hotel.freeCancellation
                      ? freeCancellation
                      : noFreeCancellation}
                  </li>
                  <li>
                    {hotel.reserveNow ? (
                      <span className=" text-black pr-2">
                        &#x2713; Reserve now, Pay at stay
                      </span>
                    ) : (
                      <span className=" text-black pr-2">
                        &#x2717; No Reserve now
                      </span>
                    )}
                  </li>
                  <li className="ml-4">
                    <GiveStars rating={hotel.rating} />
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Hotels;
