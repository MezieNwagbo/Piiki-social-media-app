import React, { useEffect } from "react";
// import GoogleLogin from "react-google-login";
// import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

//import sanity client to use and talk to backend
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    var userObject = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));

    const { name, sub, picture } = userObject;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    // /* global google */ did not work so i did this instead
    const google = window.google;

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>

        <div className="shadow-2xl" id="signInDiv"></div>
      </div>
    </div>
  );
};

export default Login;
