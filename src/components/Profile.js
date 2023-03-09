import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";


//NATOSHIA

const Profile = ({ user, token }) => {

  const navigate = useNavigate();

  return (
    <div> My Profile!</div>
  );
};



export default Profile;