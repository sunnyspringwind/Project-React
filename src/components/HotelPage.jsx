import React from "react";
import { useState, useEffect } from "react";
import FetchData from "../utils/FetchData";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"
import Reviews from "./Reviews"
import GiveStars from "../utils/GiveStars";

function HotelPage() {

    const {id} = useParams();

    const [hotel, setHotel] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/hotels/${id}`);
          const data = await response.json();
          setHotel(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [id]);
   
  

     const scrollToSection = (id) => {
       document.getElementById(id).scrollIntoView({ behavior: "smooth" });
     };

     if (!hotel) {
       return <h2>Loading...</h2>;
     }


    return (
      <>
        <div className="relative w-[86vw] mx-[7vw] h-screen">
          <Header />

          <div className="relative w-full h-[78%]">
            <div key={hotel.id}>
              <div className="flex w-full h-[80vh]">
                <div className="w-[60%] pr-4 ">
                  <img
                    src={hotel.img}
                    className="w-full h-full rounded-md object-cover"
                  ></img>
                </div>
                <div className="relative w-[40%] flex flex-wrap">
                  <div className="w-[50%] h-[50%] pr-2">
                    <img
                      src={hotel.img}
                      className="h-full object-cover rounded-md "
                    ></img>
                  </div>
                  <div className="w-[50%] h-[50%] ">
                    <img
                      src={hotel.img}
                      className="h-full object-cover rounded-md "
                    ></img>
                  </div>
                  <div className="w-[50%] h-[50%] pr-2 pt-2 ">
                    <img
                      src={hotel.img}
                      className="h-full object-cover rounded-md"
                    ></img>
                  </div>
                  <div className="w-[50%] h-[50%] pt-2">
                    <img
                      src={hotel.img}
                      className="h-full object-cover rounded-md "
                    ></img>
                  </div>
                </div>
              </div>
              <div className="flex w-full my-4 gap-6 font-fredericka text-2xl">
                <button
                  onClick={() => {
                    scrollToSection("about");
                  }}
                >
                  About
                </button>
                <button
                  onClick={() => {
                    scrollToSection("location");
                  }}
                >
                  Location
                </button>
                <button
                  onClick={() => {
                    scrollToSection("reviews");
                  }}
                >
                  Reviews
                </button>
              </div>

              <div
                id="about"
                className="relative w-full h-34 bg green-400 text-left p-4 border-2"
              >
                <span className="text-2xl font-bold font-fredericka">
                  <GiveStars rating = {hotel.rating}/>
                </span>
                <p className="w-[75%] font-fredericka">{hotel.desc}</p>
                <button className="absolute right-[10%] top-[40%] bg-blue-500 py-2 px-5 rounded text-white font-mono">
                  Book Now
                </button>
              </div>
              <div
                id="location"
                className="bg-emerald-100 w-full h-[400px] my-4"
              ></div>
              <div id="reviews">
                <Reviews hotelId={hotel.id} />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}


export default HotelPage;