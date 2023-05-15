import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./CandidatesUpload.css";
import switchoff from "../../../Assets/Icons/Switch off.png";
import switchon from "../../../Assets/Icons/Switch on.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import InviteEmailsModal from "../../Modals/AddEmailIdsModal/InviteEmailsModal";

export default function CandidatesUpload() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState("true");
  const [value, setValue] = useState("");
  const fromvalue = "Robosoft Technologies";
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const [inviteemailsmodal, setInviteEmailsModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hii");
  }, [value]);

  return (
    <>
      <InviteEmailsModal
        inviteemailsmodal={inviteemailsmodal}
        setInviteEmailsModal={setInviteEmailsModal}
      />
      <div className="inviteCandidateHeader">
        <span
          className="testHeaderBackButton"
          onClick={() => {
            navigate("/home/assesments/testcreated/testtaken");
          }}
        >
          {" "}
          {"<"}
        </span>
        <span className="testCreatedSectionName" style={{ marginLeft: "3%" }}>
          Trainee software engineer test : Invite Candidates
        </span>
      </div>
      <div className="candidatesUploadBody">
        <h1>Candidate Details</h1>
        <div className="candidateUploadFileEmailContainer">
          <div className="candidateUploadFileDiv">
            <div className="uploadCandidateIcon"></div>
            <div className="candidateUploadFileDetails">
              <span>Upload file</span>
              <span style={{ fontWeight: "400" }}>
                Use this template to add the details of candidates in bulk.
                Download the template
              </span>
              <button
                className="publishChangesButton"
                style={{ marginRight: "2%" }}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="candidateUploadEmailDiv">
            <div className="uploadCandidateIcon"></div>
            <div className="candidateUploadFileDetails">
              <span>Add by using email ID</span>
              <span style={{ fontWeight: "400" }}>
                Recommended when you are required to add less than five
                candidates
              </span>
              <button
                className="publishChangesButton"
                style={{ marginRight: "2%" }}
                onClick={() => {
                  setInviteEmailsModal(true);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <span style={{ fontSize: "25px", fontWeight: "400", marginTop: "5%" }}>
          Email and settings
        </span>
        <div className="candidateEmailSettingsContainer">
          <span style={{ fontSize: "20px", fontWeight: "500" }}>
            Invite expiry
          </span>
          <span style={{ fontSize: "18px" }}>
            Invite is automatically cancelled if candidates do not attempt the
            test after the test duration ended
          </span>
          <span style={{ fontSize: "20px", fontWeight: "500" }}>
            Auto-reminder email
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            {" "}
            <span style={{ fontSize: "18px" }}>
              Send auto-generated reminder emails to candidates about this test
              at regular intervals
            </span>
            {visible === "true" ? (
              <img
                src={switchon}
                style={{ cursor: "pointer" }}
                id={`option`}
                onClick={() => {
                  if (document.getElementById(`option`).src === switchon) {
                    document.getElementById(`option`).src = switchoff;
                    setVisible("false");

                    if (document.getElementById(`option`).src === switchoff) {
                      console.log("id");
                    }
                  } else {
                    setVisible("true");
                    document.getElementById(`option`).src = switchon;
                  }
                }}
              ></img>
            ) : (
              <img
                src={switchoff}
                style={{ cursor: "pointer" }}
                id={`option`}
                onClick={() => {
                  if (document.getElementById(`option`).src === switchoff) {
                    document.getElementById(`option`).src = switchon;
                    setVisible("true");

                    if (document.getElementById(`option`).src === switchon) {
                    }
                  } else {
                    setVisible("false");
                    document.getElementById(`option`).src = switchoff;
                  }
                }}
              ></img>
            )}
          </div>
          <span style={{ fontSize: "20px", fontWeight: "500" }}>Email</span>
          <span style={{ fontSize: "18px" }}>
            Review subject and body{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setShowEmailDetails(!showEmailDetails);
              }}
            >
              {" "}
              {showEmailDetails ? "Hide details" : "View details"}
            </span>
          </span>
          {showEmailDetails ? (
            <>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>From</span>
              <div className="emailFromInput">Robosoft Technologies</div>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                Subject
              </span>
              <input
                className="emailSubjectInput"
                placeholder="Invitation for {@TestName@} by Robosoft Technologies"
              ></input>
              <span style={{ fontSize: "20px", fontWeight: "500" }}>
                Mail template
              </span>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                className="EmailtextEditor"
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="inviteCandidateFooter">
        <button className="inviteCandidateGray">Invite candidates</button>
      </div>
    </>
  );
}
