import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Webcam from "react-webcam";
import WebCam from "./Components/WebCam";
import View from "./Components/View";
import Error from "./Components/Error";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Components/Login";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./config/firebase";
import { useEffect } from "react";
import { setUser } from "./redux/appSlice";
import PostView from "./Components/PostView";

function App() {
  // const user = useSelector((state) => state.appRedux.user);

  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch()

  useEffect(()=>{
   if(user){
    dispatch(setUser({
      displayName: user.displayName,
      email: user.email,
      userId: user.uid,
      photo: user.photoURL,
    }))
   }
}, [user])

  return (
    <>
      <BrowserRouter>
      {user === null ? <Login /> : <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/post" exact element={<PostView />} />
          <Route path="/view" exact element={<View />} />
          <Route path="/camera" exact element={<WebCam />} />
          <Route path="*" element={<Error />} />
        </Routes> }
        
      </BrowserRouter>
    </>
  );
}

export default App;
