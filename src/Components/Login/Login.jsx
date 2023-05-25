import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/Logo/img_Robosoft logo_dashboard.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBaseURL } from "../../features/question/QuestionSlice";
import { AddadminDetails } from "../../features/Test/TestSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const getbaseurl = useSelector(getBaseURL);

  console.log("..");

  const handleLogin = async () => {
    axios
      .post(`${getbaseurl}/user/sign-in`, {
        email: userId,
        password: password,
      })
      .then(function (response) {
        console.log("login", response.data.data);
        navigate("/dashboard");
        localStorage.setItem(
          "token",
          JSON.stringify(response.headers.authorization)
        );
        dispatch(AddadminDetails(response.data.data));
        localStorage.setItem("admin", JSON.stringify(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
        alert("invalid user credentials");
      });
  };

  return (
    <div className="login">
      <div className="adminLoginLogo">
        <img src={logo} className="loginLogo"></img>
      </div>
      <div className="adminUserLoginDiv">
        <span className="adminUserId">Email</span>
        <input
          className="adminUserIdInput"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        ></input>
      </div>
      <div className="adminUserLoginDiv">
        <span className="adminUserId">Password</span>
        <input
          className="adminUserIdInput"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <button
        className="adminLoginButton"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
}
