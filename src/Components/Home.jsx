import React, { forwardRef } from "react";
import "./styles/home.css";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import Post from "./Post";
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { useNavigate } from "react-router-dom";
import FlipMove from 'react-flip-move';
import Spinner from "react-spinkit";
import { signOut } from "firebase/auth";



function Home() {
  const user = useSelector((state) => state.appRedux.user);
  const q = query(collection(db, "Posts"), orderBy("time", "desc"))

  const [posts, loading, error] = useCollection(q)
const navigate = useNavigate()

const handleLogout =()=>{
signOut(auth)
}

  const handleCameraClick = ()=>{
navigate('/camera')
  }

  return (
    <div className="home">
      <div className="home__window">
        <div className="home__top">
          <div className="home__topLeft">
            <Avatar src={user?.photo} />
          </div>
          <div className="home__topMiddle">
            <SearchRoundedIcon />
            <input type="text" placeholder="search..." />
          </div>
          <div className="home__topRight"> 
          <IconButton onClick={handleLogout}>
            {" "}
            <LogoutRoundedIcon />{" "}
          </IconButton>
          </div>
        </div>
        <hr />
        {loading ? <Spinner className="spinner" name="three-bounce" fadeIn="none" /> :   <div className="home__middle">
          <FlipMove>
        {posts?.docs?.map((doc)=>{
          return <Post key={doc.id} id={doc.id} {...doc.data()} />
        })}
          </FlipMove>
        </div>}
      
<IconButton onClick={handleCameraClick} className="home__camera"> <PhotoCameraRoundedIcon /> </IconButton>
      </div>
    </div>
  );
}

export default Home;
