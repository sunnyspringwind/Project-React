import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

export default function TravelsDash() {
  const [travelList, setTravelPackages] = useState([]);
  const [currentTravelIndex, setCurrentTravelIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newTravelPackage, setNewTravelPackage] = useState({
    id: "",
    name: "",
    price: 0,
    img: "",
    desc: "",
  });

  const saveTravelPkgToLocalStorage = (updatedList) => {
  localStorage.setItem("travelPkgs", JSON.stringify(updatedList));
  }

  const getTravelPkgFromLocalStorage = () => {
    const storedData = localStorage.getItem("travelPkgs");
    if (storedData) {
      setTravelPackages(JSON.parse(storedData));
      console.log(travelList);
    }
  };

  useEffect(() => {
    getTravelPkgFromLocalStorage();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewTravelPackage((prevState) => {
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
    setCurrentTravelIndex(index);
    setNewTravelPackage(travelList[index]);
   
   };

   const handleDelete = (index) => {
     const updatedList = [...travelList];
     updatedList.splice(index, 1);
     setTravelPackages(updatedList);
     saveTravelPkgToLocalStorage(updatedList);
   };

  const handleSaveTravel = () => {
     let updatedList;
     if (editMode)
      updatedList = travelList.map((travelPkg, index) => currentTravelIndex === index ? newTravelPackage : travelPkg);
    else
     updatedList = ([...travelList, newTravelPackage]);

    setTravelPackages(updatedList);
    saveTravelPkgToLocalStorage(updatedList);
    setNewTravelPackage({
      id: "",
      name: "",
      price: 0,
      img: "",
      desc: "",
    });
  };

  return (
    <>
      <div className="w-full text-white h-full pt-5 flex-col overflow-auto">
        <h1 className="w-full text-center text-black font-fredericka font-semibold text-3xl mb-7">
          Travel Package Settings
        </h1>
        <div className="flex flex-col items-center px-10">
          <table className=" bg-yellow-400  border-separate table-fixed w-full">
            <thead className=" bg-blue-600 ">
              <tr>
                <th className="w-[4rem] h-[3rem]">Id</th>
                <th>Title</th>
                <th className="w-[8rem]">Price $</th>
                <th>Image</th>
                <th className="w-[26rem]">Description</th>
                <th className="w-[8rem]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {travelList.map((travekPkg, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono text-center "
                  key={index}
                >
                  <td className="py-2">{travekPkg.id}</td>
                  <td>{travekPkg.name}</td>
                  <td>{travekPkg.price}</td>
                  <td>{travekPkg.img}</td>
                  <td className=" overflow-hidden overflow-ellipsis text-left px-2">
                    {travekPkg.desc}
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
                    ? "Update Travel Package"
                    : "Add New Traval Package"}
                </h1>
                <form className=" text-blue-500 text-xl">
                  <label htmlFor="id">Id :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newTravelPackage.id}
                    name="id"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newTravelPackage.name}
                    name="name"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="price">Price :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newTravelPackage.price}
                    name="price"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="img">Image :</label>
                  <input
                    type="text"
                    onChange={
                      handleChange
                    }
                    value={newTravelPackage.img}
                    name="img"
                    className="mb-4 mx-5 pl-2 overflow-auto"
                  ></input>
                  <br />
                  <label htmlFor="desc">Description :</label>
                  <textarea
                    onChange={handleChange}
                    value={newTravelPackage.desc}
                    name="desc"
                    className="mb-4 mx-5 w-[90%] overflow-auto"
                  ></textarea>
                  <br />

                  <button
                    type="button"
                    onClick={handleSaveTravel}
                    className="bg-white px-2 mx-10"
                  >
                    {editMode ? "Upadate Package" : "Save Pacakge"}
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
