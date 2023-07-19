import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import "./styles/view.css";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CropRoundedIcon from "@mui/icons-material/CropRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { setCapturedPhoto, resetCapturedPhoto } from "../redux/appSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Spinner from "react-spinkit";






function View() {
  
  const capturedPhoto = useSelector((state) => state.appRedux.captured_photo);
  const user = useSelector((state) => state.appRedux.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const postRef = collection(db, "Posts");

  const handleClick = () => {
    setLoading(true)
    console.log("handle click is called");
    const storageRef = ref(storage, `posts/${uuidv4()}`);
    try {
      uploadString(storageRef, capturedPhoto, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (download) => {
          const data = await addDoc(postRef, {
            snap: download,
            displayName: user.displayName,
            profile: user.photo,
            time: serverTimestamp(),
            viewdBy: [],
          });
          navigate("/");
          setLoading(false)
          // dispatch(resetCapturedPhoto())
        });
      })
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleCancel = () => {
    dispatch(resetCapturedPhoto());
  };
  useEffect(() => {
    if (!capturedPhoto) {
      navigate("/camera");
    }
  }, [capturedPhoto]);

  useEffect(()=>{
    return ()=> dispatch(resetCapturedPhoto())
  }, [])

  return (
    <div className="view">
      <div className="view__window">
        <img src={capturedPhoto} alt="" />

        <div className="view__edit">
          <CropRoundedIcon className="view__icon" />
          <AutoFixHighRoundedIcon className="view__icon" />
          <ContentCutRoundedIcon className="view__icon" />
          <EditRoundedIcon className="view__icon" />
          <MusicNoteRoundedIcon className="view__icon" />
          <AttachFileRoundedIcon className="view__icon" />
        </div>
        
        <CloseRoundedIcon
          onClick={handleCancel}
          className="view__icon cancel"
        />
        <button className="view__sendButton" onClick={handleClick}>
         {!loading && 'Send'}
        {loading ?  <Spinner fadeIn="none" name="three-bounce" /> :  ( <SendIcon className="view__icon" />)}
        </button>
      </div>
    </div>
  );
}

export default View;
