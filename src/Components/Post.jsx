import { Avatar } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import ReactTimeago from 'react-timeago'
import "./styles/post.css"
import { useDispatch, useSelector } from 'react-redux'
import { setCapturedPhoto, setCurrentSnap } from '../redux/appSlice'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'



const Post = forwardRef(({displayName, snap, profile,viewdBy, time, id}, ref) => {

    const postDate = new Date(time?.toDate()).toUTCString()
    const user = useSelector((state)=> state.appRedux.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const docRef = doc(db, "Posts", id)

    const [viewed, setViewed] = useState(viewdBy?.includes(user.userId))

const handleClick =()=>{
    if(!viewed){
        dispatch(setCurrentSnap(snap))
        navigate('/post')
        updateDoc(docRef, {
            viewdBy: [...viewdBy, user.userId]
        })
        setViewed(true)
    }else{
      console.log('you already viewed this')
    }
}

  return (
    <div ref={ref}> 
    <div className='post' onClick={handleClick}>
      <div className="post__left">
    <Avatar src={profile} />
      <div className="post__middle">
        <h2>{displayName}</h2>
        <p>{!viewed ? "Tap to view" : "Opened" } <ReactTimeago date={postDate} /> </p>
      </div>
      </div>
      {!viewed &&  <div className="right"></div> }
     
    </div>
    </div>
  )
  })

export default Post
