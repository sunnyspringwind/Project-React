import React, { useEffect, useState } from "react";

function Slider({ imgApi }) {
  const [imgCard, setImageCard] = useState(imgApi?.[0] || {});

  useEffect(() => {
    if (imgApi && imgApi.length > 0) {
      setImageCard(imgApi[0]);
    }
  }, [imgApi]);

  const displayImage = (index) => {
    if (imgApi && imgApi[index]) {
      setImageCard(imgApi[index]);
    }
  };

  const ImageButtons = () =>
    imgApi?.map((object, index) => (
      <button key={object.id} onClick={() => displayImage(index)}>
        o
      </button>
    ));

  return (
    <>
      {imgCard.img && (
        <img
          src={imgCard.img}
          className="absolute w-full h-[92%] object-cover rounded-lg"
          alt={imgCard.title}
        />
      )}
      {imgCard.title && (
        <h1 className="bg-white rounded-lg font-fredericka ml-[79%] mt-4 font-semibold text-2xl absolute p-4 text-center">
          Explore <span className="text-orange-400">{imgCard.title}</span>
        </h1>
      )}
      <div className="absolute w-full space-x-3 text-2xl text-blue-500 h-10 flex justify-center items-center bottom-0">
        {imgApi && imgApi.length > 0 && <ImageButtons />}
      </div>
    </>
  );
}

export default Slider;
