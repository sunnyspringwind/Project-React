import React, { useEffect, useState } from "react";
import signupboat from "../assets/signupboat.svg";
import { Link } from "react-router-dom";

function SignUp() {

  const [userCredentials, setCredentialsList] = useState([]);
  const [userData, setUserData] = useState({
    username : "",
    name : "",
    email : "",
    password : "",
  })


  const saveCredentialsToLocalStorage = () => {
    const updatedList = [...userCredentials, userData];
    setCredentialsList(updatedList);
    localStorage.setItem("userCredentials", JSON.stringify(updatedList));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCredentialsToLocalStorage();
    setUserData({
      username: "",
      email: "",
      password: "",
      name: "",
    });
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]:value})
  }

    return (
      <>
        <div className="flex fixed bg-black w-screen h-screen justify-center items-center">
          <div className="flex flex-col w-[60vh] ml-[6vw] h-[60vh] justify-center items-center">
            <h1 className="text-4xl text-center m-4  text-blue-500 font-semibold">
              Sign Up
            </h1>

            <form className="grid gap-6 w-full h-full " onSubmit={handleSubmit}>
              <input
                className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md "
                type="text"
                id="userName"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
              <input
                className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md "
                type="text"
                id="name"
                placeholder="Full name"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              <input
                className="border-2  border-blue-400 text-xl indent-5  w-full rounded-md"
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              <input
                className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md"
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <input
                className="border-2 border-blue-400 text-xl indent-5  w-full rounded-md"
                type="password"
                id="confirmPassowrd"
                placeholder="Confirm Password"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              <button className="w-full bg-blue-500 rounded-md">Sign Up</button>
              <div className="flex justify-center -mt-2">
                <input
                  id="termsConditions"
                  className="w-4 h-4 mt-2"
                  type="checkbox"
                />
                <label htmlFor="termsConditions" className="ml-3 py-1 px-1">
                  I agree to all
                  <span className="text-blue-500"> Terms and Conditions</span>
                </label>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-[40%] h-[60%]  justify-center items-center overflow-hidden">
            <div className="w-[70%] h-[60%] overflow-hidden">
              <img
                className="w-full h-full"
                src={signupboat}
                alt="signup boat"
              ></img>
            </div>
            <p className="ml-3 py-1 px-1">
              Already a Member?{" "}
              <span className="text-blue-500">
                <Link to="/signin">Sign In</Link>
              </span>
            </p>
          </div>
        </div>
      </>
    );
}
export default SignUp;