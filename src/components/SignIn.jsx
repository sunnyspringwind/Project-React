import React, { useState, useEffect } from "react";
import signin from "../assets/signin.svg";
import { Link } from "react-router-dom";

function SignIn() {

  const [userCredentials, setCredentialsList] = useState([]);

  let [formData, setFormData] = useState({
    username : "",
    password : ""
  });

  const getCredentialsFromLocalStorage = () => {
    const storedData = localStorage.getItem("userCredentials");
   
    if (storedData) {
      const data = JSON.parse(storedData);
      setCredentialsList(data);
    } 
  };
  useEffect(() => getCredentialsFromLocalStorage, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("submitted", formData);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]:value})
  }
  console.log("data",userCredentials);

  return (
    <>
      <div className="flex fixed bg-black w-screen h-screen justify-center items-center">
        <div className="flex flex-col w-[60vh] ml-[6vw] h-[43vh] justify-center items-center">
          <h1 className="text-4xl text-center m-4  text-blue-500 font-semibold">
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid gap-[2rem] w-full h-full"
          >
            <input
              className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md "
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
            />

            <input
              className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />

            <div className="flex justify-center -mt-2 mb-0">
              <input id="rememberMe" className="w-4 h-4 mt-2" type="checkbox" />
              <label htmlFor="rememberMe" className="ml-3 py-1 px-1">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 rounded-md -mt-12 mb-12"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="flex flex-col w-[40%] h-[60%]  justify-center items-center overflow-hidden">
          <div className="w-[70%] h-[60%] overflow-hidden">
            <img
              className="w-full h-full"
              src={signin}
              alt="sign-in boat"
            ></img>
          </div>
          <p className="ml-3 py-1 px-1">
            New Here?{" "}
            <span className="text-blue-500">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
export default SignIn;
