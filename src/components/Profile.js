import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserReviews } from "../api/users";



//NATOSHIA

const Profile = ({ user }) => {
  const [reviews, setReviews] = useState(null);
  const {username} = user;
  console.log(reviews);
  const navigate = useNavigate();
  useEffect(() => {
      fetchUserReviews(username).then((result) => {
            setReviews(result);
            console.log(result);
          })
          .catch((error) => {
            console.log(error)
          })
    
    }, []);
  return (
   <div>
    {user.name !== null ? <h2 id="profile_welcome">Welcome back, {user.name}!</h2> : 
          <h1>You must be logged in to access your profile page.</h1>
    }

    <div className="profile-section" id="user_reviews">My Reviews:
      <div id="reviews_container">
            {/* {reviews.map((review, i) => {
                  return(
                        <div>zzz</div>
                  )

            })} */}
      </div>
    </div>
    <div className="profile-section" id="order_history">Order History: </div>



    
    {/* <div className="profile-section" id="order_history">Order History:</div> */}
    
    
    </div>
   )
};



export default Profile;