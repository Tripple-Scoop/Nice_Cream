import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";


//NATOSHIA

const Home = ({ user, token }) => {
  const navigate = useNavigate();

  return (
    <div> Home Page!</div>
  );
};



export default Home;