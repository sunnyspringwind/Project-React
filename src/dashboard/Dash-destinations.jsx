import React, { useEffect, useState } from "react";

export default function DestinationsDash() {
  const [destinationList, setDestinationList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentDestiIndex, setCurrentDestiIndex] = useState(null);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newDestination, setNewDestination] = useState({
    id: "",
    title: "",
    weather: "",
    img: "",
    desc: "",
  });

  const saveDestinationToLocalStorage = (updatedList) => {
    localStorage.setItem("destinations", JSON.stringify(updatedList));
  };
  const getDestinationFromLocalStorage = () => {
    const storedData = localStorage.getItem("destinations");
    if (storedData) {
      setDestinationList(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    getDestinationFromLocalStorage();
         
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

  const handleSaveDestination = (e) => {
    let updatedList;
    if(editMode)  
   updatedList = destinationList.map((desti, index) =>
     currentDestiIndex === index ? newDestination : desti
   );
 
    
    else
      updatedList = [...destinationList, newDestination];
    setDestinationList(updatedList);
    saveDestinationToLocalStorage(updatedList);
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
      <div className="flex h-full text-white pt-5 flex-col items-center relative ">
        <h1 className="w-full text-center text-black font-fredericka font-semibold text-3xl mb-7">
          Destinations Settings
        </h1>
        <div className="flex flex-col items-center px-10">
          <table className=" bg-yellow-400  border-separate table-fixed w-full">
            <thead className=" bg-blue-600 ">
              <tr>
                <th className="w-[4rem] h-[3rem]">Id</th>
                <th>Title</th>
                <th className="w-[11rem]">Weather</th>
                <th>Image</th>
                <th className="w-[22rem]">Description</th>
                <th className="w-[7rem]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {destinationList.map((desti, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono text-center break-words whitespace-normal"
                  key={index}
                >
                  <td className="py-2">{desti.id}</td>
                  <td>{desti.title}</td>
                  <td>{desti.weather}</td>
                  <td>{desti.img}</td>
                  <td className=" overflow-hidden overflow-ellipsis text-left px-2">
                    {desti.desc}
                  </td>
                  <td>
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => handleEditMode(index)}
                    >
                      Edit
                    </button>
                    |
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => handleDelete(index)}
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
              }}
            >
              Add New
            </button>

            {newFormVisible && (
              <div className="bg-[#444745] w-[400px] p-4 font-fredericka flex flex-col justify-center rounded-md">
                <h1 className="text-center text-2xl mb-5">
                  {editMode ? "Update Destination" : " Add New Destination"}
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
                    onClick={handleSaveDestination}
                    className="bg-white px-2 mx-10"
                  >
                    {editMode
                      ? "Update Destination"
                      : " Add Destination"}
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
