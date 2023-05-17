import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import switchoff from "../../Assets/Icons/Switch off.png";
import switchon from "../../Assets/Icons/Switch on.png";
import {
  getSelectedQuestionData,
  getTestHour,
  getTestMinutes,
} from "../../features/Test/TestSlice";
import { useSelector } from "react-redux";
import EditTestDurationModal from "../Modals/EditTestDuration/EditTestDurationModal";

export default function TestCreatedOverview() {
  const [visible, setVisible] = useState("true");
  const [testStatus, setTestStatus] = useState("ON");
  const navigate = useNavigate();

  const getselectedquestionsdata = useSelector(getSelectedQuestionData);
  console.log("selectedquestionsdata", getselectedquestionsdata);

  const [totalscore, setTotalScore] = useState(0);

  useEffect(() => {
    let score = 0;
    for (let item of getselectedquestionsdata) {
      score += item.question.totalScoreForQuestion;
    }
    setTotalScore(score);
  }, []);

  const gettesthour = useSelector(getTestHour);
  const gettestminutes = useSelector(getTestMinutes);
  const [edittestmodal, setEditTestModal] = useState(false);
  return (
    <>
      <div className="testCreatedRightContainer">
        <EditTestDurationModal
          edittestmodal={edittestmodal}
          setEditTestModal={setEditTestModal}
        />
        <div className="testCreatedRightContainerHeading">
          <span>Overview</span>
          <span
            className="viewQuestionsButton"
            onClick={() => {
              navigate("/home/assesments/testcreated/questions");
            }}
          >
            View questions
          </span>
        </div>
        {getselectedquestionsdata.length > 0 ? (
          <div className="viewQuestionsPresentContainer">
            <div className="viewQuestionsPresentContainerHeader">
              <span className="viewQuestionsPresentContainerHeaderQuestionType">
                Question type
              </span>
              <span className="viewQuestionsPresentContainerHeaderDifficultyLevel">
                Difficulty level
              </span>
              <span className="viewQuestionsPresentContainerHeaderDifficultyLevel">
                Questions
              </span>
              <span className="viewQuestionsPresentContainerHeaderDifficultyLevel">
                Score
              </span>
            </div>
            <div className="viewQuestionsPresentContainerBody">
              {" "}
              <span className="viewQuestionsPresentContainerHeaderQuestionType">
                Programming
              </span>
              <span className="viewQuestionsPresentContainerHeaderDifficultyLevel">
                {/* {easy > 0 ? `Easy(${})` : ""}
                {medium > 0 ? `,Medium(${})` : ""}
                {hard > 0 ? `,Hard(${})` : ""} */}
              </span>
              <span className="viewQuestionsPresentContainerHeaderDifficultyLevel">
                {getselectedquestionsdata.length}
              </span>
              <span className="viewQuestionsPresentContainerHeaderDifficultyLevel">
                {totalscore}
              </span>
            </div>
            <div className="viewQuestionsPresentContainerFooter">
              <div className="viewQuestiontestDurationDiv">
                <span style={{ fontSize: "23px", fontWeight: "500" }}>
                  Test duration
                </span>
                <div>
                  {parseInt(gettesthour) > 0 ? (
                    <span style={{ fontSize: "30px" }}>
                      {gettesthour}{" "}
                      <span style={{ fontSize: "23px", fontWeight: "500" }}>
                        hour{" "}
                      </span>
                    </span>
                  ) : (
                    ""
                  )}
                  {parseInt(gettestminutes) > 0 ? (
                    <span style={{ fontSize: "30px" }}>
                      {gettestminutes}{" "}
                      <span style={{ fontSize: "23px", fontWeight: "500" }}>
                        minutes{" "}
                      </span>
                    </span>
                  ) : (
                    ""
                  )}

                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      setEditTestModal(true);
                    }}
                  >
                    Edit
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="viewQuestionsContainer">
            <span>No questions are added to this test</span>
            <button
              className="publishChangesButton"
              style={{ marginTop: "2%" }}
              onClick={() => {
                navigate("/home");
              }}
            >
              Add questions
            </button>
          </div>
        )}

        <div className="testCreatedSettingsContainer">
          <div className="testCreatedSettingsLeftContainer">
            <div className="testCreatedSettingsLeftContainerHeader">
              <span>Settings</span>
              <span style={{ color: "gray", fontWeight: "400" }}>
                These are recommended settings that you can enable for the test
              </span>
            </div>
            <div className="testCreatedSettingsLeftContainerCutOffDiv">
              <div className="testCreatedSettingsLeftContainerBodyheadersDiv">
                <span>Cut-off settings</span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Cut-off score has not been set."
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  All Cut-off settings are disabled
                </span>
              </div>
            </div>
            <div className="testCreatedSettingsLeftContainerProctoringDiv">
              <div className="testCreatedSettingsLeftContainerBodyheadersDiv">
                <span>Proctoring settings</span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Enable random question shuffling"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  Order of questions changes for each candidate.
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Disable copy and paste in the code editor from external sources"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  Candidates cannot copy and paste code or texts from external
                  sources to the code editor
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Take candidate's snapshots during the test"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  Take all candidate's snapshots during the test are disabled.
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Restrict candidates to the fullscreen mode during the test"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  All Restrict candidates to the fullscreen mode during the test
                  are disabled.
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Logout on leaving the test interface"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  All Logout on leaving the test interface are disabled.
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Restrict test access for certain IP addresses"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  All restrict test access for certain IP addresses are
                  disabled.
                </span>
              </div>
            </div>
            <div className="testCreatedSettingsLeftContainerCutOffDiv">
              <div className="testCreatedSettingsLeftContainerBodyheadersDiv">
                <span>Candidate settings</span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Full name, Personal email ID"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  Information that can be collected from candidates.
                </span>
              </div>
            </div>
            <div className="testCreatedSettingsLeftContainerEmailDiv">
              <div className="testCreatedSettingsLeftContainerBodyheadersDiv">
                <span>Email and Report settings</span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Receive a report after a candidate completes the test"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  You will recieve a detailed assessment report after a
                  candidate completes the test.
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Candidate's self assessment report"
                  />
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "16px",
                    marginLeft: "4%",
                  }}
                >
                  All Candidate's self assessment report are disabled.
                </span>
              </div>
            </div>
          </div>
          <div className="testCreatedSettingsRightContainer">
            <div className="testCreatedSettingsLeftContainerHeader">
              <span>Other details</span>
            </div>
            <div className="testCreatedSettingsLeftContainerBody">
              <div className="testNameDiv">
                <span>Test name</span>
                <div className="testNameInputDiv">
                  <span>Trainee Software engineer test</span>
                  <span style={{ color: "blue" }}>edit</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Test access</span>
                <div className="testAccessDiv">
                  {visible === "true" ? (
                    <img
                      src={switchon}
                      style={{ cursor: "pointer" }}
                      id={`option`}
                      onClick={() => {
                        if (
                          document.getElementById(`option`).src === switchon
                        ) {
                          document.getElementById(`option`).src = switchoff;
                          setVisible("false");
                          setTestStatus("OFF");
                          if (
                            document.getElementById(`option`).src === switchoff
                          ) {
                            console.log("id");
                          }
                        } else {
                          setVisible("true");
                          document.getElementById(`option`).src = switchon;
                          setTestStatus("ON");
                        }
                      }}
                    ></img>
                  ) : (
                    <img
                      src={switchoff}
                      style={{ cursor: "pointer" }}
                      id={`option`}
                      onClick={() => {
                        if (
                          document.getElementById(`option`).src === switchoff
                        ) {
                          document.getElementById(`option`).src = switchon;
                          setVisible("true");
                          setTestStatus("ON");
                          if (
                            document.getElementById(`option`).src === switchon
                          ) {
                          }
                        } else {
                          setVisible("false");
                          document.getElementById(`option`).src = switchoff;
                          setTestStatus("OFF");
                        }
                      }}
                    ></img>
                  )}
                  <span>{testStatus}</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Starts on</span>
                <div className="testNameInputDiv">
                  <span>Mar 31,2023 03:59PM IST</span>
                  <span style={{ color: "blue" }}>edit</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Ends on</span>
                <div className="testNameInputDiv">
                  <span>Set end date</span>
                  <span style={{ color: "blue" }}>edit</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Test Link</span>
                <div className="testNameInputDiv">
                  <span style={{ width: "80%" }}>
                    http://roboearth.com/TraineeSoftware engineer test
                  </span>
                  <span style={{ color: "blue" }}>edit</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Test type</span>
                <div className="testNameInputDiv">
                  <span style={{ width: "80%" }}>Invite-only</span>
                  <span style={{ color: "blue" }}>edit</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Recruiter API ID</span>
                <div className="testNameInputDiv">
                  <span style={{ width: "80%" }}>185511</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Tags</span>
                <div className="testNameInputDiv">
                  <span style={{ width: "80%" }}></span>
                  <span style={{ color: "blue" }}>edit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testAdminsHeader">
          <span>Test admins</span>
          <div className="testAdminsHeaderFunctions">
            <span>Point of contact</span>
            <select className="POCInput">
              <option>Admin</option>
              <option>a</option>
              <option>b</option>
              <option>c</option>
            </select>
            <button className="publishChangesButton">Add admins</button>
          </div>
        </div>
        <div className="testAdminsTable">
          <div className="testAdminsTableHeader">
            <span className="testAdminsTableHeaderName">Name</span>
            <span className="testAdminsTableHeaderEmail">Email Id</span>
            <span className="testAdminsTableAccess">Access controls</span>
            <div className="testAdminsHeaderEmpty"></div>
          </div>
          <div className="testAdminsTableBody">
            <span className="testAdminsTableHeaderName">Admin</span>
            <span className="testAdminsTableHeaderEmail">
              Admin@robosoft.com
            </span>
            <select className="allAccessInput">
              <option>All access</option>
              <option>a</option>
              <option>b</option>
              <option>c</option>
            </select>
            <div className="testAdminsHeaderEmpty"></div>
          </div>
        </div>

        <div
          className="testCreatedRightContainerHeading"
          style={{ marginTop: "3%" }}
        >
          <span>Test description</span>
          <span className="viewQuestionsButton">add</span>
        </div>
        <div className="testCreatedTestDescriptionDiv">No details added</div>
        <div
          className="testCreatedRightContainerHeading"
          style={{ marginTop: "3%" }}
        >
          <span>Test instructions</span>
          <span className="viewQuestionsButton">add</span>
        </div>
        <div className="testCreatedtestInstructionsDiv">
          <p style={{ marginTop: "1%" }}>
            1. Ensure that you are attempting the test using the correct email
            ID.
          </p>
          <p style={{ marginTop: "1%" }}>
            2. You must click submit after you answer each question
          </p>
          <p style={{ marginTop: "1%" }}>
            3. If you need assistance during the test, click the question
            mark(?) in the lower-right corner of the page to raise a ticket.
          </p>

          <p>
            {" "}
            4. Once the test has started, the timer cannot be paused. You have
            to complete the test in one attempt.
          </p>
          <p style={{ marginTop: "1%" }}>
            {" "}
            5. Do not close the browser window or tab of the test interface
            before you submit your final answers.
          </p>
          <p style={{ marginTop: "1%" }}>
            6. It is recommended that you ensure that your system meets and
            check your Internet connection before starting the test.
          </p>
          <p style={{ marginTop: "1%" }}>
            7. It is recommended that you attempt the test in an incognito or
            private window so that any extensions installed do not interfere
            with the test environment.
          </p>
          <p style={{ marginTop: "1%" }}>
            8. We recommend that you close all other windows and tabs to ensure
            that there are no distractions.
          </p>
        </div>
      </div>
    </>
  );
}
