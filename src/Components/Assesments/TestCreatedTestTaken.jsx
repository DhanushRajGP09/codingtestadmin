import React from "react";
import "./TestTaken.css";
import { useNavigate } from "react-router";

export default function TestCreatedTestTaken() {
  const navigate = useNavigate();
  return (
    <>
      <div className="testCreatedRightContainer">
        {" "}
        <span style={{ marginTop: "3%", color: "gray" }}>
          All Tests > Trainee software engineer test >{" "}
        </span>
        <h1>Test Taken </h1>
        <div className="noTestTakenContainer">
          <span>Candidates have not been invited to the test yet</span>
          <button
            className="publishChangesButton"
            style={{ marginTop: "2%" }}
            onClick={() => {
              navigate("/home/Invitecandidates");
            }}
          >
            Invite candidates
          </button>
        </div>
      </div>
    </>
  );
}
