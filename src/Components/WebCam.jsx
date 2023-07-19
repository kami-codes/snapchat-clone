import React, { useCallback, useRef } from 'react'
import Webcam from 'react-webcam';
import "./styles/webcam.css"
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import { useDispatch } from 'react-redux';
import { setCapturedPhoto } from '../redux/appSlice';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const videoConstraints = {
    width: 350,
    height: 650,
    facingMode: "user",
    orientation: "portrait",
  };

  
  function WebCam() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      dispatch(setCapturedPhoto(imageSrc))
      navigate("/view")

    }, [webcamRef]);

    const handleClick =()=>{
      navigate('/')
    }

    return (
        <div className='webcam'>
          <div className="webcam__window">
        <Webcam className='webcam__video'
          ref={webcamRef}
          audio={false}
          height={videoConstraints.height}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
        <ArrowBackRoundedIcon onClick={handleClick} className='webcam__back webcam__icon'/>
        <button className='webcam__button' onClick={capture}> <RadioButtonCheckedRoundedIcon className='webcam__icon' /> </button>
          </div>
    </div>
    )
  }
  
  export default WebCam
  