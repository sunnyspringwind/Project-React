import React, {useEffect, useState} from "react";

function HeartIcon() {
  const [heartColor, setColor] = useState("white");
  const [stroke, setStroke] = useState("black");

  //  if (!heartColor || heartColor === "" || !stroke || stroke === "") {
  //    return <div>Loading....</div>;
  //  }

  const varClassName = `fas fa-star bg-white p-1 rounded-2xl text-xl stroke-[3rem] stroke-${stroke} text-${heartColor}`;

  const like = () => {
   
    heartColor === "white" ? setColor("red-500") : setColor("white"); 
    stroke === "black" ? setStroke("none") : setStroke("black"); 
  };

  return (
    <i onClick={like} className={varClassName} />
  );
}

export default HeartIcon;
