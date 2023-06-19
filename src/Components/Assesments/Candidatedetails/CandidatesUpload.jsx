import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./CandidatesUpload.css";
import switchoff from "../../../Assets/Icons/Switch off.png";
import switchon from "../../../Assets/Icons/Switch on.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import InviteEmailsModal from "../../Modals/AddEmailIdsModal/InviteEmailsModal";
import uploadfile from "../../../Assets/Icons/upload (1).png";
import uploademail from "../../../Assets/Icons/send-mail.png";
import axios from "axios";
import fileDownload from "js-file-download";
import { getBaseURL } from "../../../features/question/QuestionSlice";
import FormData from "form-data";
export default function CandidatesUpload() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState("true");
  const [value, setValue] = useState("");
  const fromvalue = "Robosoft Technologies";
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const [inviteemailsmodal, setInviteEmailsModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const testID = JSON.parse(localStorage.getItem("testID"));
  const testName = JSON.parse(localStorage.getItem("testName"));
  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hi");
  }, [value]);

  const handleDownload = (url, filename) => {
    console.log("inside");
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        console.log("inside positive");
        fileDownload(res.data, filename);
      });
  };
  const changeHandler = (event) => {
    console.log("ee", event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  console.log("in candidate");

  const handleSubmission = async (e) => {
    const myData = new FormData();
    console.log("formdata", myData);
    myData.append("File", selectedFile);

    const response = await fetch(`${getbaseurl}/user/assign-test`, {
      method: "POST",
      body: JSON.stringify({
        file: selectedFile,
        testId: testID,
      }),
      headers: {
        Authorization: `${token}`,
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    // axios
    //   .post(
    //     `${getbaseurl}/user/assign-test`,
    //     { file: myData, testId: testID },
    //     {
    //       headers: {
    //         Authorization: `${token}`,
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log("..fileuploaded", response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

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
            navigate("/home/assesments/testcreated");
          }}
        >
          {" "}
          {"<"}
        </span>
        <span className="testCreatedSectionName" style={{ marginLeft: "3%" }}>
          {testName} test : Invite Candidates
        </span>
      </div>
      <div className="candidatesUploadBody">
        <h1>Candidate Details</h1>
        <div className="candidateUploadFileEmailContainer">
          <div className="candidateUploadFileDiv">
            <img className="uploadCandidateIcon" src={uploadfile}></img>
            <div className="candidateUploadFileDetails">
              <span>Upload file</span>
              <span style={{ fontWeight: "400" }}>
                Use this template to add the details of candidates in bulk.
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => {
                    handleDownload(
                      "https://res.cloudinary.com/dilyamsbn/raw/upload/v1685690119/dummyex_oep5x8.xlsx",
                      "sampletemplate.xlsx"
                    );
                  }}
                >
                  {" "}
                  Download the template
                </span>
              </span>
              <div>
                <input
                  type="file"
                  name="file"
                  onChange={changeHandler}
                  style={{
                    height: "40px",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div>
                {" "}
                <button
                  className="publishChangesButton"
                  style={{ marginRight: "2%", height: "50px" }}
                  onClick={handleSubmission}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div className="candidateUploadEmailDiv">
            <img className="uploadCandidateIcon" src={uploademail}></img>
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
