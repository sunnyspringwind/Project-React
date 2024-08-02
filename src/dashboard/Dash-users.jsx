import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";

export default function UsersDash() {
  const [usersList, setUsersList] = useState([]);

  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    img: "",
    password: "",
    coverImage: "",
  });

  const saveUsersToLocalStorage = (updatedList) => {
    localStorage.setItem("users", JSON.stringify(updatedList));
  };

  const getUsersFromLocalStorage = () => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsersList(JSON.parse(storedData));
    }
  };
  useEffect(getUsersFromLocalStorage, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prevState) => {
      const newState = {
        ...prevState,
        [name] : value
      };
      return newState;
    });
  };

  //Edit Mode From Here   check edit button and delete
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = (index) => {
    setNewFormVisibility(true);

    setCurrentUserIndex(index);
    setNewUser(usersList[index]);
    setEditMode(true);
  };

  const handleDelete = (index) => {
    const updatedList = [...usersList];
    updatedList.splice(index, 1);
    setUsersList(updatedList);
    saveUsersToLocalStorage(updatedList);
  };

  const handleSaveUsers = (e) => {
    // e.preventDefault();
    let updatedList;
    if (editMode)
      updatedList = usersList.map((user, index) =>
        currentUserIndex === index ? newUser : user
      );
    else updatedList = [...usersList, newUser];

    setUsersList(updatedList);
    saveUsersToLocalStorage(updatedList);
    setNewUser({
      id: "",
      name: "",
      email: "",
      img: "",
      password: "",
      coverImage: "",
    });
  };

  return (
    <>
      <div className="w-full h-full text-white pt-5 flex-col items-center relative overflow-auto ">
        <h1 className="w-full text-center text-black font-fredericka font-semibold text-3xl mb-7">
          Users Settings
        </h1>
        <div className="flex text-white flex-col items-center w-full px-10 ">
          <table className=" border-separate table-fixed w-full bg-yellow-400">
            <thead className=" bg-blue-600 center">
              <tr>
                <th className="w-10 py-3">Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Image</th>
                <th className="w-[210px]">Cover Image</th>
                <th className="w-[90px]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono break-words text-center whitespace-normal "
                  key={index}
                >
                  <td className="py-2">{(newUser.id = index + 1)}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.img}</td>
                  <td>{user.coverImage}</td>
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
                setNewUser({
                  id: "",
                  name: "",
                  email: "",
                  img: "",
                  password: "",
                  coverImage: "",
                });
              }}
            >
              Add New
            </button>

            {newFormVisible && (
              <div className="bg-[#444745] w-[400px] p-4 font-fredericka flex flex-col justify-center rounded-md">
                <h1 className="text-center text-2xl mb-5">
                  {editMode ? "Update User" : "Add New User"}
                </h1>
                <form className=" text-blue-500 text-xl">
                  <label htmlFor="id">Id :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newUser.id}
                    name="id"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newUser.name}
                    name="name"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    onChange={handleChange}
                    value={newUser.email}
                    name="email"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="password">Password :</label>
                  <input
                    type="password"
                    onChange={handleChange}
                    value={newUser.password}
                    name="password"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="img">Image :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newUser.img}
                    name="img"
                    className="mb-4 mx-5 pl-2 overflow-auto"
                  ></input>
                  <br />
                  <label htmlFor="coverImage">Cover Image :</label>

                  <input
                    type="text"
                    onChange={handleChange}
                    value={newUser.coverImage}
                    name="coverImage"
                    className="mb-4 mx-5 overflow-auto"
                  ></input>
                  <br />

                  <button
                    type="button"
                    onClick={handleSaveUsers}
                    className="bg-white px-2 mx-10"
                  >
                    {editMode ? "Update User" : "Save User"}
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
