import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/Logo/img_Robosoft logo_dashboard.png";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    axios
      .post("http://139.59.56.122:5000/api/user/sign-in", {
        email: userId,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        navigate("/dashboard");
        localStorage.setItem(
          "token",
          JSON.stringify(response.headers.authorization)
        );
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
