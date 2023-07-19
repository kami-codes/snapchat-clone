import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import "./styles/login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "react-spinkit";

function Login() {
  const [user, loading, error] = useAuthState(auth);

  const handleSignin = async () => {
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/08/Snapchat-logo-700x394.png"
          alt=""
        />

        {loading ? (
          <Spinner fadeIn="none" name="three-bounce" />
        ) : (
          <IconButton className="login__button" onClick={handleSignin}>
            <img
              className="login__button_img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
              alt=""
            />
            Login with Google
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Login;
