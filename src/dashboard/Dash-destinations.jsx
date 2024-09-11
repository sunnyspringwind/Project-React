import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DestinationsDash() {
  const [destinationList, setDestinationList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentDestiId, setCurrentDestiId] = useState(null);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [imgList, setImageList] = useState([]);
  const [imgFields, setImageFields] = useState([1]);
  const [newDestination, setNewDestination] = useState({
    title: "",
    weather: "",
    image: [],
    description: "",
  });

  const addDestinationToApi = async() => {
     try {
         const response = axios.post(
           "http://localhost:5058/wandermate_backend/destination",
           newDestination
         );
       await getDestinationsFromApi(); //updateList afterwards
     } catch (error) {
       console.log(error);
     }
 
  };
  const getDestinationsFromApi = async() => {
     try{
    const response = await axios.get(
      `http://localhost:5058/wandermate_backend/destination`
    );
    const sortedDestinations = response.data.sort((a, b) => a.id - b.id);
    setDestinationList(sortedDestinations);
  }
  catch(error){
    console.log(error);
  }
  };

  const updateDestination = async(id, desti) => {
      try {
        await axios.put(
          `http://localhost:5058/wandermate_backend/destination/${id}`,
          desti
        );
        const updatedList = destinationList.map((oldDesti) =>
          id === oldDesti.id ? desti : oldDesti
        );
        return updatedList;
      } catch (error) {
        console.log(error);
      }
  }

    const deleteDestination = async (id) => {
      try {
        await axios.delete(
          `http://localhost:5058/wandermate_backend/destination/${id}`
        );
        setDestinationList((prevList) => prevList.filter((destination) => destination.id !== id));
      } catch (error) {
        console.log(console.error);
      }
    };

  useEffect(() => {
    getDestinationsFromApi();    
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("image")) {
      const index = parseInt(name.split("-")[1], 10);
   
      const newImgList = [...imgList];
      newImgList[index] = value || "";
      setImageList(newImgList);
    }
    else
    setNewDestination((prevState) => {
      const newState = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value, //checked ticked  is true
      };
      return newState;
    });
  };

   const validateImages = () => {
     const inputList = [...imgList];
     const validList = inputList.filter((value) => value);  //makes sures truthy values
      if (JSON.stringify(validList) !== JSON.stringify(imgList)) {
        setImageList(validList);
      }
   };

  useEffect(()=>{
    validateImages();
    setNewDestination((prevState)=>({
      ...prevState,
      image: imgList
    }));
  },[imgList]);

   const handleEditMode = (id) => {
     setNewFormVisibility(true);
     setEditMode(true);
     setCurrentDestiId(id);
    destinationList.map(desti =>{
      if (id === desti.id) {
      setNewDestination(desti);
      setImageList(desti.image);
      }
    })
   };

   const handleDelete = (id) => {
      deleteDestination(id);
   };

     const resetForm = () => {
       setNewDestination({
         name: "",
         price: 0,
         image: [],
         rating: 0,
         freeCancellation: false,
         reserveNow: false,
         description: "",
       });
       setImageList([]);
       setImageFields([1]);
     };

  const handleSaveDestination = async() => {
    let updatedList;
    if(editMode)  {
      updatedList = await updateDestination(currentDestiId, newDestination);
      setDestinationList(updatedList); 
    }
    else
    {
    await addDestinationToApi(newDestination);
    await getDestinationsFromApi();
    }
    resetForm();
  };



  const addMoreImageFields = () =>{
    if (imgFields.length < 5)
      setImageFields(
        [...imgFields, imgFields.length + 1]
      )}

  return (
    <>
      <div className="flex h-full text-white pt-5 flex-col items-center relative overflow-auto">
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
                  <td>
                    <div className="h-40 flex overflow-auto">
                      {desti.image.map((imgSrc, index) => (
                        <img
                          key={index}
                          className=" h-full w-full object-contain px-1"
                          src={imgSrc}
                          alt={`Desti ${desti.id} Image ${index}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className=" overflow-hidden overflow-ellipsis text-left px-2">
                    {desti.description}
                  </td>
                  <td>
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => handleEditMode(desti.id)}
                    >
                      Edit
                    </button>
                    |
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => handleDelete(desti.id)}
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
                resetForm();
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
                  <label htmlFor="image">
                    Destination Images :
                    <button
                      type="button"
                      onClick={addMoreImageFields}
                      hidden={imgFields.length >= 5}
                    >
                      Add More
                    </button>
                  </label>
                  {imgFields.map((index, imgIndex) => (
                    <div key={index}>
                      <label>Image {index} :</label>
                      <input
                        type="url"
                        onChange={handleChange}
                        value={newDestination.image[imgIndex]}
                        name={`image-${imgIndex}`}
                        alt={`Hotel {index} Index${imgIndex}`}
                        className="mb-4 mx-5 overflow-auto"
                      ></input>
                    </div>
                  ))}
                  <label htmlFor="description">Description :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newDestination.description}
                    name="description"
                    className="mb-4 mx-5 overflow-auto"
                  ></input>
                  <br />

                  <button
                    type="button"
                    onClick={handleSaveDestination}
                    className="bg-white px-2 mx-10"
                  >
                    {editMode ? "Update Destination" : " Add Destination"}
                  </button>
                  <button
                    type="button"
                    className="bg-white px-2 pl-2"
                    onClick={() => {
                      setNewFormVisibility(false);
                      resetForm();
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
