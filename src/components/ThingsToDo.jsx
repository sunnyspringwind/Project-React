import React, { useState, useEffect } from "react";
import FetchData from "../utils/FetchData";

import HeartIcon from "../utils/HeartIcon";

const ThingsToDo = () => {
  let [thingsToDo, setThingsToDo] = useState([]);
  let [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    FetchData("thingsToDo", setThingsToDo);
  }, []); // Empty dependency array ensures this runs only once

  if (!thingsToDo || thingsToDo.length === 0) {
    return <div>...Loading</div>;
  }

  const changeVisibility = () => {
    !isVisible ? setVisibility(true) : setVisibility(false);
  };
  return (
    <>
      <button
        onClick={changeVisibility}
        className=" w-full h-10 text-left pl-2 flex items-center font-serif text-2xl mb-2"
      >
        <img className="h-8 w-8 rounded-3xl mr-2" src={thingsToDo[0].image[0]} />
        Things To Do
      </button>

      {/* true and something is true false and something is false */}
      {isVisible && (
        <div className="grid grid-flow-col gap-3 mb-6">
          {thingsToDo.slice(0, 4).map((thing) => (
            <div
              key={thing.id}
              className="relative h-[310px] rounded-lg overflow-hidden m-2 hover:-translate-y-4"
            >
              <img
                src={thing.image[0]}
                className="h-full object-cover rounded-lg "
              />
              <button className=" absolute top-3 left-3 ">
                <HeartIcon />
              </button>
              <span className="backdrop-blur-sm absolute bottom-3 left-3 text-white font-semibold">
                {thing.name}
              </span>
              <span className="backdrop-blur-sm absolute bottom-3 right-4 text-white font-semibold">
                ${thing.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ThingsToDo;
