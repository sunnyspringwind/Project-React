import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

export default function ThingsToDoDash() {
  const [thingsToDo, setThingsToDo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentToDoIndex, setCurrentToDoIndex] = useState(null);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newToDo, setNewToDo] = useState({
    id: "",
    name: "",
    price: "",
    img: "",
  });

  const saveThingsToDoToLocalStorage = (updatedList) => {
    localStorage.setItem("thingsToDo", JSON.stringify(updatedList));
  };
  const getThingsToDoFromLocalStorage = () => {
    const storedData = localStorage.getItem("thingsToDo");
    if (storedData) {
      setThingsToDo(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    getThingsToDoFromLocalStorage();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewToDo((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };

  const handleEditMode = (index) => {
    setNewFormVisibility(true);
    setEditMode(true);
    setCurrentToDoIndex(index);
    setNewToDo(thingsToDo[index]);
  };

  const handleDelete = (index) => {
    const updatedList = [...thingsToDo];
    updatedList.splice(index, 1);
    setThingsToDo(updatedList);
    saveThingsToDoToLocalStorage(updatedList);
  };

  const handleSaveToDo = () => {
    let updatedList;
    if (editMode)
      updatedList = thingsToDo.map((desti, index) =>
        currentToDoIndex === index ? newToDo : desti
      );
    else updatedList = [...thingsToDo, newToDo];

    setThingsToDo(updatedList);
    saveThingsToDoToLocalStorage(updatedList);
    setNewToDo({
      id: "",
      name: "",
      price: "",
      img: "",
    });
  };

  return (
    <>
      <div className="flex h-full text-white pt-5 flex-col items-center relative ">
        <h1 className="w-full text-black text-center font-fredericka font-semibold text-3xl mb-7">
          Things To Do Settings
        </h1>
        <div className="flex flex-col items-center px-10">
          <table className=" bg-yellow-400  border-separate table-fixed w-full">
            <thead className=" bg-blue-600 ">
              <tr>
                <th className="w-[4rem] py-2">Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th className="w-[9rem]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {thingsToDo.map((toDo, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono text-center break-words whitespace-normal"
                  key={index}
                >
                  <td className="py-3\2">{toDo.id}</td>
                  <td>{toDo.name}</td>
                  <td>{toDo.price}</td>
                  <td>{toDo.img}</td>
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
                  {editMode ? "Update Things To Do" : " Add Things To Do"}
                </h1>
                <form className=" text-blue-500 text-xl">
                  <label htmlFor="id">Id :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newToDo.id}
                    name="id"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newToDo.name}
                    name="name"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="price">Price :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newToDo.price}
                    name="price"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="img">Image :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newToDo.img}
                    name="img"
                    className="mb-4 mx-5 pl-2 overflow-auto"
                  ></input>
                  <br />

                  <button
                    type="button"
                    onClick={handleSaveToDo}
                    className="bg-white px-2 mx-10"
                  >
                    {editMode
                      ? "Update Things To Do"
                      : " Save Things To Do"}
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
