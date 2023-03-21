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


<ReactPlayer id="landing-video" playing={true} loop={true} url={video} muted={true} width="73%" height="73%"/>
<Link id="home-shopping-link" to="/Products"><h4>Click to Start Shopping Now!</h4></Link>

    </div>
  );
};

export default Home;