import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Profile() {
        

    return (
      <>
        <div className="relative w-[86vw] h-screen  mx-[7vw]">
          <Header />
          <div className="relative bg-red-400 w-full h-[55%] rounded mb-[70px] ">
            <div className="bg-green-300 absolute w-[150px] h-[150px] rounded-full left-[10%] -bottom-[18%]"></div>
            <Link
              to="/editprofile"
              className="bg-blue-500 border-2 absolute -bottom-[10%] right-[10%] text-xl rounded-l-2xl rounded-r-2xl py-1 px-5"
            >
              Edit Profile
            </Link>
          </div>
          <div>
            {" "}
            <h1 className="font-fredericka font-semibold text-xl">
              Daisy Sunflower
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut omnis
              tenetur nisi nulla saepe, voluptates modi velit aliquid. Quasi
              nihil soluta sed nisi itaque modi facere ab magni ducimus
              saepe?Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Delectus voluptas temporibus magnam rerum, incidunt optio esse ut
              repellat nihil magni quis expedita nesciunt non similique amet
              nobis quasi. Magni, ducimus. lore
            </p>
          </div>
          <div className="my-4">
            <h1 id="hotelBooking" className="font-semibold text-xl">Hotel Booking</h1>
          </div>

          <div className="my-4">
            <h1 className="font-semibold text-xl">Travel Packages Bookings</h1>
          </div>
        </div>
      </>
    );
}