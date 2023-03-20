import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { login } from "../api/users";
import ReactPlayer from 'react-player'
import video from "../assets/videos/niceCream.mp4"


//NATOSHIA

const Home = ({ user, token }) => {
  const src = "../assets/images/niceCream.mp4"
  return (
    <div id="home-container">


<ReactPlayer onStart playing={true} loop={true} url={video} width="100%" height="100%"/>
    </div>
  );
};

export default Home;