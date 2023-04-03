import React from "react";
import "./Dashboard.css";
import assesment from "../../Assets/Icons/assesment.png";
import mylibrary from "../../Assets/Icons/mylibrary.png";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboardHeader"> Admin Dashboard</div>
      <div className="dashboardBodyDiv">
        <div
          className="allTestContainer"
          onClick={() => {
            navigate("/home/assesments");
          }}
        >
          <img src={assesment} className="allTestImage"></img>
          <span className="allTestText">Assesments</span>
        </div>
        <div
          className="allTestContainer"
          onClick={() => {
            navigate("/home");
          }}
        >
          <img src={mylibrary} className="allTestImage"></img>
          <span className="allTestText">My Library</span>
        </div>
      </div>
    </div>
  );
}
