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


<ReactPlayer playing={true} loop={true} url={video} muted={true} width="80%" height="80%"/>
    </div>
  );
};

export default Home;