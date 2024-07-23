import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

export default function DestinationsDash() {
  const [destinationList, setDestinationList] = useState([]);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newDestination, setNewDestination] = useState({
    id: "",
    title: "",
    weather: "",
    img: "",
    desc: "",
  });

  const saveHotelToLocalStorage = () =>
    setDestinationList([...destinationList, newDestination]);
  localStorage.setItem("hotels", JSON.stringify(destinationList));

  const getHotelFromLocalStorage = () => {
    const storedData = localStorage.getItem("destinations");
    if (storedData) {
      setDestinationList(JSON.parse(storedData));
      console.log(destinationList);
    }
  };

  useEffect(() => {
    getHotelFromLocalStorage();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewDestination((prevState) => {
      const newState = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value, //checked ticked  is true
      };
      return newState;
    });
  };

  const handleSaveHotel = () => {
    saveHotelToLocalStorage();
    setNewDestination({
      id: "",
      title: "",
      weather: "",
      img: "",
      desc: "",
    });
  };

  return (
    <>
      <div className="flex h-full text-white p-10 flex-col items-center relative ">
        <h1 className="w-full text-center font-fredericka font-semibold text-3xl mb-7">
          Destinations Settings
        </h1>
        <div>
          <table className=" border-yellow-400 border-2  border-separate w-auto">
            <thead className=" bg-blue-600 border-2 border-red-400">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Weather</th>
                <th>Image</th>
                <th>Description</th>
                <th>Updates</th>
              </tr>
            </thead>
            <tbody>
              {destinationList.map((desti, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono text-center "
                  key={index}
                >
                  <td className="p-3">{desti.id}</td>
                  <td>{desti.title}</td>
                  <td>{desti.weather}</td>
                  <td>{desti.img}</td>
                  <td className="overflow-auto">
                    {desti.desc.slice(0, 50)}...
                  </td>
                  <td>
                    <button className="hover:underline hover:text-red-500">
                      Edit
                    </button>{" "}
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
                    value={newDestination.id}
                    name="id"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="title">Title :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newDestination.title}
                    name="title"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="weather">Weather :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newDestination.weather}
                    name="weather"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="img">Image :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newDestination.img}
                    name="img"
                    className="mb-4 mx-5 pl-2 overflow-auto"
                  ></input>
                  <br />
                  <label htmlFor="desc">Description :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newDestination.desc}
                    name="desc"
                    className="mb-4 mx-5 overflow-auto"
                  ></input>
                  <br />

                  <button
                    type="button"
                    onClick={handleSaveHotel}
                    className="bg-white px-2 mx-10"
                  >
                    Save Destination
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
