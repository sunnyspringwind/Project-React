import React, {useState, useEffect} from "react";
 import userProfile from "../assets/images/userProfile.jpg";
import GiveStars from "../utils/GiveStars";
import { format } from "date-fns";

function Reviews({hotelId}) {

    const today = new Date();
    const formattedDate = format(today, "dd/MM/yyyy");
    const formattedTime = format(today, "HH:mm:ss");

    const [reviews, setReview] = useState([]);


    // useEffect(()=>{
    //     FetchData("reviews", setReview)
    // },[])

    
    // useEffect(() => {
      
    // }, [reviews]);

    // const ValidReview = ({hotelId}) => {

    // }

    const addReview =() =>{
        let userReview = document.getElementById("userReview").value;
        setReview([...reviews, userReview]);
        document.getElementById("userReview").value= "";

    }
console.log(reviews);
    return (
      <>
        <div className="w-full p-3">
          <span className="font-fredericka text-3xl">Reviews</span>
          {reviews.map((review, index) => (
            <div
              key={index}
              className=" w-full p-2 border-sky-200 text-xl font-mono gap-3 break-words"
            >
              <div>
                <button className="flex items-center gap-2 font-fredericka ">
                  <span>DandalionFarmar</span>
                  <img className="w-11 rounded-3xl " src={userProfile} />
                  <GiveStars rating={4} />
                </button>
              </div>
              {review}

              <p className="font-sans text-sm py-2">
                {formattedDate}, {formattedTime}
              </p>
              <hr />
            </div>
          ))}

          <div className="relative w-full text-left  flex flex-col gap-2">
            <span className="">Write a Review</span>
            <span>Your Review</span>
            <textarea id="userReview" className="h-[80px] w-full p-2 bg-gray-300 font-sans text-xl " placeholder="Enter your review here..."></textarea>
            <span>Your Rating</span>
            <span className="">&#9734;&#9734;&#9734;&#9734;&#9734;</span>
            <button
              type="submit"
              onClick={() => {
                addReview();
              }}
              className=" bg-blue-500 py-2 px-5 rounded text-white font-mono w-[120px]"
            >
              Submit Review
            </button>
          </div>
        </div>
      </>
    );
    
}

export default Reviews;