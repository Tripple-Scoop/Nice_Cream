import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";


//NATOSHIA

const Profile = ({ user, token }) => {

  const navigate = useNavigate();

  return (
   <div>
    {user ? <div>You are currently signed in as: {user.username}</div> : <div></div>}
   </div> 
  )
};



export default Profile;