import React, {useEffect, useState} from "react";

function HeartIcon() {
  const [heartColor, setColor] = useState("white");
  const [stroke, setStroke] = useState("black");

  //  if (!heartColor || heartColor === "" || !stroke || stroke === "") {
  //    return <div>Loading....</div>;
  //  }

  const varClassName = `fas fa-star bg-white p-1 rounded-[100%] text-xl ${
    heartColor === "red-500" ? "text-red-500" : "text-white"
  } ${stroke === "white" ? "stroke-white" : "stroke-black"}`;

   const like = () => {
     setColor((prevColor) => (prevColor === "white" ? "red-500" : "white"));
     setStroke((prevStroke) => (prevStroke === "black" ? "white" : "black"));
   };

  return (
    <i onClick={like} className={varClassName} />
  );
}

export default HeartIcon;
