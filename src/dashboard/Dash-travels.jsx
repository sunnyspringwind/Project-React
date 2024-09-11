import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TravelsDash() {
  const [travelList, setTravelPackages] = useState([]);
  const [currentTravelPkgId, setCurrentTravelPkgId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imgList, setImageList] = useState([]);
  const [imgFields, setImageFields] = useState([1]);
  const [newFormVisible, setNewFormVisibility] = useState(false);
  const [newTravelPackage, setNewTravelPackage] = useState({
    title: "",
    weather: "",
    image: [],
    description: "",
  });

  const getTravelPackagesFromApi = async() => {
    try {
        const response = await axios.get(
          "http://localhost:5058/wandermate_backend/travelPackages"
          );
          const sortedList =  response.data.sort((a,b)=>a.id - b.id);
            setTravelPackages(sortedList);
    } catch (error) {
      console.log(error);
    }
  }
  const addTravelPackageToApi = async (travelPackage) => {
    //post needs a data as well
    try {
      const response = await axios.post(
        `http://localhost:5058/wandermate_backend/travelPackages`,
        travelPackage
      );
      await getTravelPackagesFromApi(); //update afterwards
    } catch (error) {
      console.log(error);
    }
  }; 

    const updateTravelPackage = async (id, travelPkg) => {
      try {
        await axios.put(
          `http://localhost:5058/wandermate_backend/travelPackages/${id}`,
          travelPkg
        );
        const updatedList = travelList.map((oldPackage) =>
          id === oldPackage.id ? travelPkg : oldPackage
        );
        return updatedList;
      } catch (error) {
        console.log(error);
      }
    };

      const deleteTravelPackage = async (id) => {
        try {
          await axios.delete(
            `http://localhost:5058/wandermate_backend/travelPackages/${id}`
          );
          setTravelPackages((prevList) =>
            prevList.filter((travelPkg) => travelPkg.id !== id)
          );
        } catch (error) {
          console.log(console.error);
        }
      };

  useEffect(() => {
   getTravelPackagesFromApi();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("image")){
      const index = parseInt(name.split("-")[1],10);
      const newImageList = [...imgList];
      newImageList[index] = value || "";
      setImageList(newImageList);
    }
    else
    setNewTravelPackage((prevState) => {
      const newState = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value, //checked ticked  is true
      };
      return newState;
    });
  };

  //  useEffect(() => {
  //    if (editMode && currentTravelPkgId !== null) {
  //      // Update the image list of the package being edited
  //      setTravelPackages((prevList) =>
  //        prevList.map((pkg) =>
  //          pkg.id === currentTravelPkgId ? { ...pkg, image: imgList } : pkg
  //        )
  //      ); 
  //      setNewTravelPackage((prevPackage) => ({
  //        ...prevPackage,
  //        image: imgList,
  //      }));
      
  //    } else {
  //      // Only update the new package's image list
  //      setNewTravelPackage((prevPackage) => ({
  //        ...prevPackage,
  //        image: imgList,
  //      }));
  //    }
  //  }, [imgList, editMode, currentTravelPkgId]);

    const validateImages = () =>{
      const inputList = [...imgList]
      const validList = inputList.filter(value => value);
       if (JSON.stringify(validList) !== JSON.stringify(imgList)) {
         setImageList(validList);
       }
    }

    useEffect(() => {

      validateImages();
      setNewTravelPackage((prevState) => ({
        ...prevState,
        image: imgList,
      }));
    }, [imgList]);


   const handleEditMode = (id) => {
    setNewFormVisibility(true);
    setEditMode(true);
    setCurrentTravelPkgId(id);
       travelList.map((travelPkg) => {
         if (id == travelPkg.id) {
           setNewTravelPackage(travelPkg);
           setImageList(travelPkg.image);
         }
       });
   
   };

   const handleDelete = (id) => {
    deleteTravelPackage(id);
   };

   const resetForm = () =>{
    setNewTravelPackage({
      title: "",
      weather: "",
      image: [],
      description: "",
    });

    setImageList([]);
    setImageFields([1]);
   }
  const handleSaveTravel = async() => {
     let updatedList;
     if (editMode) {
      updatedList = await updateTravelPackage(currentTravelPkgId, newTravelPackage);
      await getTravelPackagesFromApi();
    }
    else{
    await addTravelPackageToApi(newTravelPackage);
    await getTravelPackagesFromApi();
  }
    resetForm();
  };
  

  const addMoreImageFields = () =>{
    if (imgFields.length <5)
    setImageFields([...imgFields, imgFields.length+1])
  }
{

}
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
                <th>Weather</th>
                <th>Image</th>
                <th className="w-[26rem]">Description</th>
                <th className="w-[8rem]">Updates</th>
              </tr>
            </thead>
            <tbody>
              {travelList.map((travelPkg, index) => (
                <tr
                  className=" bg-white text-blue-600 font-mono text-center "
                  key={index}
                >
                  <td className="py-2">{travelPkg.id}</td>
                  <td>{travelPkg.title}</td>
                  <td>{travelPkg.weather}</td>
                  <td>
                    <div className="h-40 flex overflow-auto">
                      {travelPkg.image.map((imgSrc, imgIndex) => (
                        <img
                          className=" h-full w-full object-contain px-1"
                          key={imgIndex}
                          src={imgSrc}
                          alt={`TravelPkg ${travelPkg.id} Image ${imgIndex}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className=" overflow-hidden overflow-ellipsis text-left px-2">
                    {travelPkg.description}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="hover:underline hover:text-red-500"
                      onClick={() => {
                        handleEditMode(travelPkg.id);
                      }}
                    >
                      Edit
                    </button>
                    |
                    <button
                      className="hover:underline hover:text-red-500"
                      onClick={() => {
                        handleDelete(travelPkg.id);
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
                resetForm();
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
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newTravelPackage.title}
                    name="title"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
                  <label htmlFor="weather">Weather :</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newTravelPackage.weather}
                    name="weather"
                    className="mb-4 mx-5 pl-2"
                  ></input>
                  <br />
            
                  <label htmlFor="image">Destination Images :</label>
                  <button
                    className="hover:underline hover:text-red-500 text-sm pb-3 "
                    onClick={(e) => {
                      e.preventDefault();
                      addMoreImageFields();
                    }}
                    hidden={imgFields.length >= 5}
                  >
                    Add More
                  </button>
                  {imgFields.map((index) => (
                    <div key={index}>
                      <label>Image {index}:</label>
                      <input
                        type="url"
                        onChange={handleChange}
                        value={newTravelPackage.image[index - 1] || ""} //incase there are no imgs
                        name={`image-${index - 1}`}
                        className="mb-4 mx-5 pl-2 overflow-auto"
                      />
                    </div>
                  ))}
                  <br />
                  <label htmlFor="description">Description :</label>
                  <textarea
                    onChange={handleChange}
                    value={newTravelPackage.description}
                    name="description"
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
