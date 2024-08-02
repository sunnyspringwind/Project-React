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

  const saveHotelToLocalStorage = (updatedList) => {
    localStorage.setItem("hotels", JSON.stringify(updatedList));
  };

  const getHotelFromLocalStorage = () => {
    const storedData = localStorage.getItem("hotels");
    if (storedData) {
      setHotelList(JSON.parse(storedData));
      console.log(hotelList);
    }
  }
  useEffect(getHotelFromLocalStorage,[]);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      setNewHotel((prevState) => {
        const newState = {
          ...prevState,
          [name]: type === "checkbox" ? checked : value, //checked ticked  is true
        };
        return newState;
      });
    };

    //Edit Mode From Here   check edit button and delete 
  const [currentHotelIndex, setCurrentHotelIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = (index) => {
    setNewFormVisibility(true);

    setCurrentHotelIndex(index);
    setNewHotel(hotelList[index]);
    setEditMode(true);
  };

  const handleDelete = (index) => {
    const updatedList = [...hotelList];
    updatedList.splice(index, 1);
    setHotelList(updatedList);
    saveHotelToLocalStorage(updatedList);
  };

  const handleSaveHotel = (e) => {
    // e.preventDefault();
    let updatedList;
    if (editMode)
      updatedList = hotelList.map((hotel, index) =>
        currentHotelIndex === index ? newHotel : hotel
      );
    else updatedList = [...hotelList, newHotel];

    setHotelList(updatedList);
    saveHotelToLocalStorage(updatedList);
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
      <div className="w-full h-full text-white pt-5 flex-col items-center relative overflow-auto ">
        <h1 className="w-full text-center text-black font-fredericka font-semibold text-3xl mb-7">
          Hotels Settings
        </h1>
        <div className="flex text-white flex-col items-center w-full px-10 ">
          <table className=" border-separate table-fixed w-full bg-yellow-400">
            <thead className=" bg-blue-600 center">
              <tr>
                <th className="w-10 py-3">Id</th>
                <th>Name</th>
                <th className="w-[110px]">Price</th>
                <th>Image</th>
                <th className="w-[60px]">Rating</th>
                <th className="w-[100px]">Free Cancellation</th>
                <th className="w-[80px]">Reserve Now</th>
                <th className="w-[210px]">Description</th>
                <th className="w-[90px]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {hotelList.map((hotel, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono break-words text-center whitespace-normal "
                  key={index}
                >
                  <td className="py-2">{(newHotel.id = index + 1)}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.price}</td>
                  <td>{hotel.img}</td>
                  <td>{hotel.rating}</td>
                  <td>{hotel.freeCancellation ? "True" : "False"}</td>
                  <td>{hotel.reserveNow ? "True" : "False"}</td>
                  <td className=" px-2 text-left whitespace-nowrap overflow-hidden text-ellipsis ">
                    {hotel.desc}
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="hover:underline hover:text-red-500"
                      onClick={() => handleEditMode(index)}
                    >
                      Edit
                    </button>
                    |
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
          <div>
            <button
              className="p-2 py-1  my-7 rounded font-fredericka bg-blue-500"
              onClick={() => {
                setNewFormVisibility(true);
                setEditMode(false);
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
              }}
            >
              Add New
            </button>

            {newFormVisible && (
              <div className="bg-[#444745] w-[400px] p-4 font-fredericka flex flex-col justify-center rounded-md">
                <h1 className="text-center text-2xl mb-5">
                  {editMode ? "Update Hotel" : "Add New Hotel"}
                </h1>
                <form className=" text-blue-500 text-xl">
                  {/* <label htmlFor="id">Id :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newHotel.id}
                    name="id"
                    className="mb-4 mx-5 pl-2"
                  ></input> */}
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
                    {editMode ? "Update Hotel" : "Save Hotel"}
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
