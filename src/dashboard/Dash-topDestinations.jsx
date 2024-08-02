import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

export default function TopDestinationsDash() {
  const [destinationList, setDestinationList] = useState([]);
   const [editMode, setEditMode] = useState(false);
   const [currentDestiIndex, setCurrentDestiIndex] = useState(null);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newDestination, setNewDestination] = useState({
    id: "",
    name: "",
    price: "",
    img: "",
    desc: "",
  });

  const saveDestinationToLocalStorage = (updatedList) => {
    localStorage.setItem("topDestinations", JSON.stringify(updatedList));
  };
  const getDestinationFromLocalStorage = () => {
    const storedData = localStorage.getItem("topDestinations");
    if (storedData) {
      setDestinationList(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    getDestinationFromLocalStorage();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDestination((prevState) => {
      const newState = {
        ...prevState,
        [name]:value
      };
      return newState;
    });
  };

     const handleEditMode = (index) => {
       setNewFormVisibility(true);
       setEditMode(true);
       setCurrentDestiIndex(index);
       setNewDestination(destinationList[index]);
     };

     const handleDelete = (index) => {
       const updatedList = [...destinationList];
       updatedList.splice(index, 1);
       setDestinationList(updatedList);
       saveDestinationToLocalStorage(updatedList);
     };

  const handleSaveDestination = () => {
    let updatedList;
    if (editMode) 
 updatedList = destinationList.map((desti, index) =>
   currentDestiIndex === index ? newDestination : desti
 );
      
    else
        updatedList = [...destinationList, newDestination];

    setDestinationList(updatedList);
    saveDestinationToLocalStorage(updatedList);
    setNewDestination({
      id: "",
      name: "",
      price: "",
      img: "",
      desc: "",
    });
  };

  return (
    <>
      <div className="flex h-full text-white pt-5 flex-col items-center relative ">
        <h1 className="w-full text-black text-center font-fredericka font-semibold text-3xl mb-7">
          Top Destinations Settings
        </h1>
        <div className="flex flex-col items-center px-10">
          <table className=" bg-yellow-400  border-separate table-fixed w-full">
            <thead className=" bg-blue-600 ">
              <tr>
                <th className="w-[4rem] py-2">Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th className="w-[22rem]">Description</th>
                <th className="w-[9rem]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {destinationList.map((desti, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono text-center break-words whitespace-normal"
                  key={index}
                >
                  <td className="py-3\2">{desti.id}</td>
                  <td>{desti.name}</td>
                  <td>{desti.price}</td>
                  <td>{desti.img}</td>
                  <td className="overflow-hidden overflow-ellipsis text-left px-2">
                    {desti.desc}
                  </td>
                  <td>
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => {
                        handleEditMode(index);
                      }}
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
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
          <div>
            <button
              className="p-2 py-1  my-7 rounded font-fredericka bg-blue-500"
              onClick={() => {
                setNewFormVisibility(true);
                setEditMode(false);
              }}
            >
              Add New
            </button>

            {newFormVisible && (
              <div className="bg-[#444745] w-[400px] p-4 font-fredericka flex flex-col justify-center rounded-md">
                <h1 className="text-center text-2xl mb-5">
                  {editMode
                    ? "Update Top Destination"
                    : " Add Top Destination"}
                </h1>
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
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newDestination.name}
                    name="name"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="price">Price :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newDestination.price}
                    name="price"
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
                    onClick={handleSaveDestination}
                    className="bg-white px-2 mx-10"
                  >
                    {editMode
                      ? "Update Top Destination"
                      : " Save Top Destination"}
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
