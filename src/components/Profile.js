import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserReviews } from "../api/users";


//NATOSHIA

const Profile = ({ user, token }) => {
  
  const navigate = useNavigate();
  return (
   <div>
    {user.name ? <h2>Welcome back, {user.name}!</h2> : 
          <h1>You must be logged in to access your profile page.</h1>
    }

    <div className="profile-section" id="user_reviews">My Reviews:</div>
    <div className="profile-section" id="order_history">Order History: </div>
    {/* <div className="profile-section" id="order_history">Order History:</div> */}
    
    
    </div>
   )
};



export default Profile;