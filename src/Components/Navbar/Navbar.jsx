import React from "react";
import "./Navbar.css";
import logo from "../../Assets/Logo/img_Robosoft logo_dashboard.png";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="homePageNavbar">
      <img className="homePageNavbarLogo" src={logo}></img>
      <div className="homePageNavbarControls">
        <div
          className="navbarAssesment"
          onClick={() => {
            navigate("/home/assesments");
          }}
        >
          Assesments
        </div>
        <div
          className="navbarAssesment"
          onClick={() => {
            navigate("/home");
          }}
        >
          Library
        </div>
        <div className="navbarAssesment">Profiles</div>
      </div>
      <div className="homePageNavbarProfile"></div>
    </div>
  );
}
