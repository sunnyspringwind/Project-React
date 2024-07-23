import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

export default function HotelsDash() {
  const [hotelList, setHotelList] = useState([]);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newHotel, setNewHotel] = useState({
    id: "",
    name: "",
    price: 0,
    img: "",
    rating: 0,
    freeCancellation: false,
    reserveNow: false,
    desc: "",
  });

  const saveHotelToLocalStorage = () =>
    setHotelList([...hotelList, newHotel]);
    localStorage.setItem("hotels", JSON.stringify(hotelList));

  const getHotelFromLocalStorage = () => {
    const storedData = localStorage.getItem("hotel");
    if (storedData) {
      setHotelList(JSON.parse(storedData));
      console.log(hotelList)
    }
  };

  useEffect(() => {
    getHotelFromLocalStorage();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewHotel((prevState) => {
      const newState = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,  //checked ticked  is true
      };
      return newState;
    });
  };

  const handleSaveHotel = () => {
   saveHotelToLocalStorage();
   setNewHotel({
     id: "",
     name: "",
     price: 0,
     img: "",
     rating: 0,
     freeCancellation: false,
     reserveNow: false,
     desc: "",
   });

  };

  return (
    <>
      <div className="flex h-full text-white p-10 flex-col items-center relative ">
        <h1 className="w-full text-center font-fredericka font-semibold text-3xl mb-7">
          Hotels Settings
        </h1>
        <div>
          <table className=" border-yellow-400 border-2  border-separate w-auto">
            <thead className=" bg-blue-600 border-2 border-red-400">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Rating</th>
                <th>Free Cancellation</th>
                <th>Reserve Now</th>
                <th>Description</th>
                <th>Updates</th>
              </tr>
            </thead>
            <tbody>
              {hotelList.map((hotel, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono text-center "
                  key={index}
                >
                  <td className="p-3">{hotel.id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.price}</td>
                  <td>{hotel.img}</td>
                  <td>{hotel.rating}</td>
                  <td>{hotel.freeCancellation ? "True" : "False"}</td>
                  <td>{hotel.reserveNow ? "True" : "False"}</td>
                  <td className="overflow-auto">
                    {hotel.desc.slice(0, 50)}...
                  </td>
                  <td>
                    <button className="hover:underline hover:text-red-500">
                      Edit
                    </button>
                    |{" "}
                    <button className="hover:underline hover:text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
          <div>
            <button
              className="p-2 py-1  my-7 rounded font-fredericka bg-blue-500"
              onClick={() => {
                setNewFormVisibility(true);
              }}
            >
              Add New
            </button>

            {newFormVisible && (
              <div className="bg-[#444745] w-[400px] p-4 font-fredericka flex flex-col justify-center rounded-md">
                <h1 className="text-center text-2xl mb-5">Add New Hotel</h1>
                <form className=" text-blue-500 text-xl">
                  <label htmlFor="id">Id :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newHotel.id}
                    name="id"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newHotel.name}
                    name="name"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="price">Price :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newHotel.price}
                    name="price"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="img">Image :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newHotel.img}
                    name="img"
                    className="mb-4 mx-5 pl-2 overflow-auto"
                  ></input>
                  <br />
                  <label htmlFor="rating">Rating :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newHotel.rating}
                    name="rating"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />

                  <label htmlFor="freeCancellation">Free Cancellation :</label>
                  <input
                    name="freeCancellation"
                    type="checkbox"
                    onChange={handleChange}
                    checked={newHotel.freeCancellation}
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="reserveNow">Reserve Now :</label>
                  <input
                    name="reserveNow"
                    type="checkbox"
                    onChange={handleChange}
                    checked={newHotel.reserveNow}
                    className="mb-4 mx-5"
                  ></input>
                  <br />
                  <label htmlFor="desc">Description :</label>

                  <input
                    type="text"
                    onChange={handleChange}
                    value={newHotel.desc}
                    name="desc"
                    className="mb-4 mx-5 overflow-auto"
                  ></input>
                  <br />

                  <button
                    type="button"
                    onClick={handleSaveHotel}
                    className="bg-white px-2 mx-10"
                  >
                    Save Hotel
                  </button>
                  <button
                    type="button"
                    className="bg-white px-2 pl-2"
                    onClick={() => {
                      setNewFormVisibility(false);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
