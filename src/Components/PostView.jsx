import React, { useEffect } from 'react'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./styles/view.css"
import { resetCurrentSnap } from '../redux/appSlice';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function PostView() {

    const currentSnap = useSelector((state)=> state.appRedux.currentSnap)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCancel =()=>{
        dispatch(resetCurrentSnap())
    }

    useEffect(()=>{
        if(currentSnap === null){
            navigate('/')
        }
    })



  return (
    <div className="view">
    <div className="view__window">
      <img src={currentSnap} alt="" />
      <CloseRoundedIcon
          onClick={handleCancel}
          className="view__icon cancel"
        />
      <div className="countdown">
      <CountdownCircleTimer size={70}
          isPlaying
          strokeWidth={8}
          duration={10}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 5, 2, 0]}
          onComplete={handleCancel}
        >
          {({ remainingTime }) => <p className='countdown__time'> {remainingTime} </p>}
        </CountdownCircleTimer>
      </div>
      </div>
      </div>
  )
}

export default PostView


