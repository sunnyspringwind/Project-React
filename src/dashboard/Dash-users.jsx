import React, { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";
import axios from "axios";

export default function UsersDash() {
  const [usersList, setUsersList] = useState([]);

  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "@Wandermate123",
  });

  const addNewUser = async() => {
   try {
     const response = await axios.post(
       "http://localhost:5058/wandermate_backend/Account/register",
       newUser
     );
     getUsersFromApi();   
   } catch (error) {
    console.log(error)
   }
  };

  const getUsersFromApi = async() => {
   try {
     const response = await axios.get(
       "http://localhost:5058/wandermate_backend/Account/getAll"
     );
     if (response.data) {
       setUsersList(response.data);
     }  
   } catch (error) {
    console.log(error);
   }
  };

  const deleteUser = async (userId) =>{
    try {
      const response = await axios.delete(
        `http://localhost:5058/wandermate_backend/Account/${userId}`
        
      );
      getUsersFromApi();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{getUsersFromApi()}, []);

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

  const handleSaveUser = (e) => {
    // e.preventDefault();
    addNewUser();
    getUsersFromApi();
    resetForm();
  };

  const resetForm = () => {
    setNewUser({
      username: "",
      email: "",
      password: "@Wandermate123",
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
                <th className="w-10 py-3">SN</th>
                <th>Username</th>
                <th>Email</th>
                <th>UserId</th>
                <th className="w-[90px]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono break-words text-center whitespace-normal "
                  key={index}
                >
                  <td className="py-2">{index+1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.userId}</td>
                  <td>
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => {
                        deleteUser(user.userId);
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
                resetForm();
              }}
            >
              Add New
            </button>

            {newFormVisible && (
              <div className="bg-[#444745] w-[400px] p-4 font-fredericka flex flex-col justify-center rounded-md">
                <h1 className="text-center text-2xl mb-5">
                 Add New User
                </h1>
                <form className=" text-blue-500 text-xl">
                  <label htmlFor="name">Username :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newUser.username}
                    name="username"
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

                  <button
                    type="button"
                    onClick={handleSaveUser}
                    className="bg-white px-2 mx-10"
                  >
                    Save User
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

