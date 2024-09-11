import React, {useEffect, useState} from "react";
import Header from "./Header";
import axios from "axios";
import { Navigate } from "react-router";

export default function Profile( {isAuthenticated}) {
  const [isFormVisible, setFormVisibilty] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    userId: "",
    username: "",
    email : "",
    image: "",
    coverImage: "",
    bio: "",
  });

   const [formData, setFormData] = useState({
     username: "",
     image: "",
     coverImage: "",
     bio: "",
   });

  //fetch data from the api
  const verifyToken = async() =>{
    const token = localStorage.getItem("token")
    if (token)
      try {
        const response = await axios.get(
          "http://localhost:5058/wandermate_backend/Account/verify-token",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );

        await getUserData(response.data);

      } catch (error) {
        console.log(error);
      }
  }

  const getUserData = async(userId) =>{
    try {
    const response = await axios.get(
      `http://localhost:5058/wandermate_backend/Account/${userId}`
    );
    setUserCredentials(response.data);   
    } catch (error) {
      console.error("Error fetching data..")
    }
   
  }

 const updateUserData = async () => {
      const token = localStorage.getItem("token");
      if (token)
   try {
     const response = await axios.put(
       "http://localhost:5058/wandermate_backend/Account/userUpdate",
       formData,
        {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
      }
     );

     // Call getUserData after successfully updating user data
     await getUserData(userCredentials.userId);
   } catch (error) {
     console.log("Error updating user data:", error);
     // Handle error as needed
   }
 };

  
 useEffect(()=>{
  verifyToken();
 },[])

 const resetForm = () =>{
   setFormData({
     ...formData,
     username: userCredentials.username,
     image: userCredentials.image,
     coverImage: userCredentials.coverImage,
     bio: userCredentials.bio,
   });
 }
  useEffect(() => {
   resetForm()
  }, [userCredentials]);


   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value,
     });
   };
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Disable the form while submitting
  setIsSubmitting(true);
  
  try {
    await updateUserData(); // Perform async operation
    console.log(userCredentials, "value");
    // Handle success logic (e.g., update state or UI)
  } catch (error) {
    console.error("Error submitting form", error);
  } finally {
    // Re-enable the form after submission is done
    setIsSubmitting(false);
    setFormVisibilty(false);
  }
};

  return (
    <>
      <div className="relative w-[86vw] h-screen  mx-[7vw]">
        <Header />
        <div className="relative bg-red-400 w-full h-[55%] rounded mb-[70px] ">
          <img
            src={
              userCredentials.coverImage ||
              "https://marketplace.canva.com/EAED_WYebUA/2/0/1600w/canva-explore-brush-script-photo-facebook-cover-nmLQj7f0bVU.jpg"
            }
            className="w-full h-full object-cover"
          />
          <div className="bg-green-300 absolute w-[150px] h-[150px] rounded-full left-[10%] -bottom-[18%] overflow-hidden">
            <img
              src={
                userCredentials.image ||
                "https://i.pinimg.com/originals/50/f0/c3/50f0c3351809f62d2d8d3fe255a72fa5.jpg"
              }
              className="object-cover w-full h-full"
            />
          </div>
          <button
            className="bg-blue-500 border-2 absolute -bottom-[10%] right-[10%] text-xl rounded-l-2xl rounded-r-2xl py-1 px-5"
            onClick={() => setFormVisibilty(true)}
          >
            Edit Profile
          </button>
        </div>
        {isFormVisible && (
          <div className=" w-full h-full fixed inset-0 flex items-center justify-center">
            <div className="bg-white text-blue-500 w-1/2 h-2/3 drop-shadow-md rounded-md overflow-auto">
              <form
                onSubmit={handleSubmit}
                className="flex-col text-center font-mono text-xl"
              >
                <p className="mt-10">Update User Information</p>
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    className="bg-gray-200 m-2 mt-16"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isSubmitting} // Disable input while submitting
                  />
                </div>

                <div>
                  <label>Profile Image URL:</label>
                  <input
                    type="text"
                    className="bg-gray-200 m-2 "
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    disabled={isSubmitting} // Disable input while submitting
                  />
                </div>

                <div>
                  <label>Cover Image URL:</label>
                  <input
                    type="text"
                    className="bg-gray-200 m-2 "
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    disabled={isSubmitting} // Disable input while submitting
                  />
                </div>

                <div className="flex items-center justify-center ">
                  <label>Bio:</label>
                  <textarea
                    name="bio"
                    className="bg-gray-200 m-2 overflow-auto h-36 resize-none"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={isSubmitting} // Disable input while submitting
                  />
                </div>
                <div className="flex gap-14 justify-center mt-10">
                  <button
                    type="submit"
                    className=" hover:text-red-500"
                    disabled={isSubmitting} // Disable input while submitting
                  >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setFormVisibilty(false);
                    }}
                    className=" hover:text-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div>
          <h1 className="font-fredericka font-semibold text-xl">
            {userCredentials.username}
          </h1>
          <p>{userCredentials.bio}</p>
        </div>
        <div className="my-4">
          <h1 id="hotelBooking" className="font-semibold text-xl">
            Hotel Booking
          </h1>
        </div>
        <div className="my-4">
          <h1 className="font-semibold text-xl">Travel Packages Bookings</h1>
        </div>
      </div>
    </>
  );
}