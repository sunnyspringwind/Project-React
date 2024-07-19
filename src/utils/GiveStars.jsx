import React from "react";
function GiveStars({ rating }) {
  const totalStars = 5;

  const starYellow = <i
 className="fas fa-star text-yellow-300 " 
        />

    const starGrey = (
      <i className="fas fa-star text-gray-300"></i>
    );

  const Ratings = () => {
    const stars = []
    for (let i=0; i < totalStars; i++) 
     stars.push(
       i < parseInt(rating) ? (
         <span key={i}>{starYellow}</span>
       ) : (
         <span key={i}>{starGrey}</span>
       )
     );

    return stars;
  }

  return (
    <div>
      {Ratings()}
    </div>
  );
};

export default GiveStars;