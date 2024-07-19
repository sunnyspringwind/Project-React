import React from "react";

export default function Footer() {
    const abouts = ["About Us", "Home", "Destinations", "Tours", "Hotes"]
    const explore = ["Flights", "Car Rentals", "Activities", "Deals"]
    const advisorSites = ["Contact Us", "Terms of Service", "Privacy Policy", "Terms and Conditions"]
    
    return (
      <div className="flex relative justify-between h-[200px] p-10 pr-[200px] bg-red-500 mx-6 mt-6 mb-[30px] shadow-lg shadow-gray-500">
        <div key="xed" className=" flex flex-col ">
          <h2 className="font-semibold text-xl">About WanderMate</h2>
          {abouts.map((item) =>
           
              <button key={item} className="text-left py-1">
                {item}
              </button>
          
          )}
        </div>
        <div className=" flex flex-col">
          <h2 className="font-semibold text-xl">Explore</h2>
          {explore.map((item) => (
            <button key={item} className="text-left py-1">
              {item}
            </button>
          ))}
        </div>
        <div className=" flex flex-col">
          <h2 className="font-semibold text-xl">Trip-Advisor Sites</h2>
          {advisorSites.map((item) => (
            <button key={item} className="text-left py-1">
              {item}
            </button>
          ))}
        </div>
        <div className="absolute font-semibold left-[35%] bottom-10 text-xl">
          &#169; 2024 WanderMate LLC All rights reserved
        </div>
      </div>
    );
}