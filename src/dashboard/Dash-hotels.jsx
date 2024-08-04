import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HotelsDash() {
  const [hotelList, setHotelList] = useState([]);
  const [imgList, setImageList] = useState([]);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newHotel, setNewHotel] = useState({
   
    name: "",
    price: 0,
    image: [],
    rating: 0,
    freeCancellation: false,
    reserveNow: false,
    description: "",
  });


  const getHotelsFromApi = async () => {
    try{
    const response = await axios.get(
      `http://localhost:5058/wandermate_backend/hotel`
    );
    const sortedHotels = response.data.sort((a, b) => a.id - b.id);
    setHotelList(sortedHotels);
  }
  catch(error){
    console.log(error);
  }
  }

  const addHotelToApi = async (hotel) => {
    //post needs a data as well
    try {
      const response = await axios.post(
        `http://localhost:5058/wandermate_backend/hotel`, hotel
      );
      await getHotelsFromApi();
    } catch (error) {
      console.log(error);
    }
  }; 
  
  const updateHotel = async (id, hotel) => {
    try {
      await axios.put(
        `http://localhost:5058/wandermate_backend/hotel/${id}`, hotel);
      const updatedList =hotelList.map((oldHotel) => (id === oldHotel.id) ? hotel : oldHotel)
        return updatedList;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteHotel = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5058/wandermate_backend/hotel/${id}`
      );
       setHotelList((prevList) => prevList.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.log(console.error);
    }
  }

    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      //for image
      setNewHotel((prevState) => {
          // if (type === "file") {
          //   console.log(Array.from(files));
          //   const images = Array.from(files);
          //   setImageList(()=>{
          //     images.map(img=>{
          //       img.name}
          //     )
          //   })
            // Handle file input
            // return {
              // ...prevState,
              // [name]:imgList // Convert FileList to Array
          //   };
          // }
          // else{
        const newState = {
          ...prevState,
          [name]: type === "checkbox" ? checked : value, //checked ticked  is true
        }
        return newState;
      }
    )
    };

    //Edit Mode From Here   check edit button and delete 
  const [currentHotelId, setCurrentHotelId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = (id) => {
    setNewFormVisibility(true);
    setCurrentHotelId(id);

    hotelList.map(hotel => {
      if (id == hotel.id) 
        setNewHotel(hotel)})

    setEditMode(true);
  };

  const handleDelete =async (id) => {
    deleteHotel(id);
  };

  const handleSaveHotel = async (e) => {
    // e.preventDefault();
    let updatedList;
    if (editMode){
    updatedList = await updateHotel(currentHotelId, newHotel);    //handles the updating hotel directly dont need to iterate through list returns the list as well. 
      }
    else {
      addHotelToApi(newHotel);
      updatedList = [...hotelList];
    }
    setHotelList(updatedList);
    setNewHotel({
      
      name: "",
      price: 0,
      image: [],
      rating: 0,
      freeCancellation: false,
      reserveNow: false,
      description: "",
    });
  };

     useEffect(() => {
       getHotelsFromApi();
                
     }, []);

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
                  <td className="py-2">{hotel.id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.price}</td>
                  <td>{hotel.image[0]}</td>
                  <td>{hotel.rating}</td>
                  <td>{hotel.freeCancellation ? "True" : "False"}</td>
                  <td>{hotel.reserveNow ? "True" : "False"}</td>
                  <td className=" px-2 text-left whitespace-nowrap overflow-hidden text-ellipsis ">
                    {hotel.description}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="hover:underline hover:text-red-500"
                      onClick={() => handleEditMode(hotel.id)}
                    >
                      Edit
                    </button>
                    |
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => {
                        handleDelete(hotel.id);
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
                  name: "",
                  price: 0,
                  image: [],
                  rating: 0,
                  freeCancellation: false,
                  reserveNow: false,
                  description: "",
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
                  {/* <label htmlFor="image">Image :</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleChange}
                    name="image"
                    className="mb-4 mx-5 pl-2 overflow-auto"
                  ></input> */}
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
                  <label htmlFor="description">Description :</label>

                  <input
                    name="description"
                    type="text"
                    onChange={handleChange}
                    value={newHotel.description}
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
