import React from "react";
import "./Login.css";
import logo from "../../Assets/Logo/img_Robosoft logo_dashboard.png";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="adminLoginLogo">
        <img src={logo} className="loginLogo"></img>
      </div>
      <div className="adminUserLoginDiv">
        <span className="adminUserId">User Id</span>
        <input className="adminUserIdInput"></input>
      </div>
      <div className="adminUserLoginDiv">
        <span className="adminUserId">Password</span>
        <input className="adminUserIdInput" type="password"></input>
      </div>
      <button
        className="adminLoginButton"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Login
      </button>
    </div>
  );
}
