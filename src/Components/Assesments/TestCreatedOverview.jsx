import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import check from "../../Assets/Icons/check (2).png";
import grayclose from "../../Assets/Icons/close (2).png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import switchoff from "../../Assets/Icons/Switch off.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import switchon from "../../Assets/Icons/Switch on.png";
import parse from "html-react-parser";
import axios from "axios";
import {
  AddTestDescription,
  AddadminsData,
  addParticularTestData,
  addTestId,
  addTestInstructions,
  addTestName,
  getAdminDetails,
  getAdminsData,
  getParticularTestData,
  getSelectedQuestionData,
  getTestDescription,
  getTestEndTime,
  getTestHour,
  getTestInstructions,
  getTestMinutes,
  getTestName,
  getTestStartTime,
} from "../../features/Test/TestSlice";
import { useDispatch, useSelector } from "react-redux";
import EditTestDurationModal from "../Modals/EditTestDuration/EditTestDurationModal";
import DateTimeModal from "../Modals/DataTimeModal/DateTimeModal";
import TestEndTimeModal from "../Modals/DataTimeModal/TestEndTimeModal";
import ProctoringSettingsModal from "../Modals/Proctoringsettingmodal/ProctoringSettingsModal";
import EmailAndReportSettings from "../Modals/EmailAndRemoteSettings/EmailAndReportSettings";
import { getBaseURL } from "../../features/question/QuestionSlice";

export default function TestCreatedOverview() {
  const [visible, setVisible] = useState("true");
  const [testStatus, setTestStatus] = useState("ON");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getselectedquestionsdata = useSelector(getSelectedQuestionData);
  const gettestdescription = useSelector(getTestDescription);

  const [testdescription, setTestDescription] = useState(true);
  const [testinstructions, setTestInstructions] = useState(true);
  const [value, setValue] = useState(gettestdescription);

  const [totalscore, setTotalScore] = useState(0);
  const [questionshuffling, setQuestionShuffling] = useState(false);
  const [disableCopypaste, setDisableCopyPaste] = useState(false);
  const [takesnapshots, setTakeSnapshots] = useState(false);
  const [fullscreenmode, setFullScreenMode] = useState(false);
  const [logoutonleaving, setLogoutOnLeaving] = useState(false);
  const [restrictcertainIp, setRestrictCertainIp] = useState(false);
  const [testaccess, setTestAccess] = useState(false);
  const [questiondetails, setQuestionDetails] = useState([]);

  const getParticularTest = () => {
    dispatch(addTestId(testID));
    axios
      .get(
        `${getbaseurl}/test/view-test`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            testId: testID,
          },
        }
      )
      .then(function (response) {
        dispatch(addParticularTestData(response.data.data));
        dispatch(addTestName(response.data.data.testDetails.testName));
        setQuestionShuffling(response.data.data.testDetails.questionShuffling);
        setDisableCopyPaste(response.data.data.testDetails.allowCopyPaste);
        setTakeSnapshots(response.data.data.testDetails.takeCandidatesSnapshot);
        setFullScreenMode(
          response.data.data.testDetails.restrictCandidatesToFullscreen
        );
        setLogoutOnLeaving(
          response.data.data.testDetails.logoutOnLeavingTestInterface
        );
        setRestrictCertainIp(
          response.data.data.testDetails.restrictTestAccessForIp
        );
        setValue(
          response.data.data.testDetails.testDescription
            ? response.data.data.testDetails.testDescription
            : value
        );
        setTestAccess(response.data.data.testDetails.testAccess);
        setQuestionDetails(response.data.data.questionDetails);
        handleTotalScore(response.data.data.questionDetails);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAllAdmins = () => {
    axios
      .get(
        `${getbaseurl}/user/get-all-admins`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            testId: testID,
          },
        }
      )
      .then(function (response) {
        console.log("admins", response);
        dispatch(AddadminsData(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getInstructions = () => {
    axios
      .get(
        `${getbaseurl}/test/test-instruction`,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("gettestinstruction", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getloggedadmindata = JSON.parse(localStorage.getItem("admin"));

  const [poc, setPOC] = useState(getloggedadmindata._id);

  const handlepointOfContact = async (id) => {
    console.log("adminpointid", id);
    axios
      .post(
        `${getbaseurl}/test/add-point-of-contact`,
        {
          testId: testID,
          adminId: id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("pointofcontact........................", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getParticularTest();
    getAllAdmins();

    handlepointOfContact(getloggedadmindata._id);
    handleTestInstructions();
    window.scrollTo(0, 0);
  }, []);

  const getparticulartestdata = useSelector(getParticularTestData);
  console.log("getparticulard", getparticulartestdata);

  const testID = JSON.parse(localStorage.getItem("testID"));

  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  const handleTotalScore = (questions) => {
    let score = 0;
    for (let item of questions) {
      score += item.totalScoreForQuestion;
    }
    setTotalScore(score);
  };

  const gettesthour = useSelector(getTestHour);
  const gettestminutes = useSelector(getTestMinutes);
  const [edittestmodal, setEditTestModal] = useState(false);

  const [datetimemodal, setDateTimeModal] = useState(false);

  const getteststarttime = useSelector(getTestStartTime);

  const date = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthname = months[getteststarttime?.getMonth()];
  const timezone = getteststarttime?.getHours() > 12 ? "PM" : "AM";
  const gettestendtime = useSelector(getTestEndTime);
  const endMonthName = months[gettestendtime?.getMonth()];
  const EndTimeZone = gettestendtime?.getHours() > 12 ? "PM" : "AM";
  const [endtimemodal, setEndTimeModal] = useState(false);
  const [testnameedit, setTestNameEdit] = useState(false);
  const gettestname = useSelector(getTestName);
  const [proctoringmodal, setProctoringModal] = useState(false);
  const [emailreportmodal, setEmailReportModal] = useState(false);

  const handleTestEdit = (access) => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,
          testStartDate: "2023-03-09T00:00:00+05:30",
          testEndDate: "2023-07-21T23:59:59+05:30",
          testName: gettestname,
          testAccess: access,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("editname", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("getloggedadmin", getloggedadmindata);
  const getadminsdata = useSelector(getAdminsData);
  const gettestinstructions = useSelector(getTestInstructions);
  const [instructionvalue, setInstructionValue] = useState(gettestinstructions);

  const handleTestInstructions = () => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,
          instructions: instructionvalue,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("instructions edited", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleTestDescription = () => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,
          testDescription: value,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("description edited", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(addTestInstructions(instructionvalue));
  }, [instructionvalue]);

  useEffect(() => {
    dispatch(AddTestDescription(value));
  }, [value]);

  return (
    <>
      <div className="testCreatedRightContainer">
        <EditTestDurationModal
          edittestmodal={edittestmodal}
          setEditTestModal={setEditTestModal}
        />

        <DateTimeModal
          datetimemodal={datetimemodal}
          setDateTimeModal={setDateTimeModal}
        />
        <TestEndTimeModal
          endtimemodal={endtimemodal}
          setEndTimeModal={setEndTimeModal}
        />
        <ProctoringSettingsModal
          proctoringmodal={proctoringmodal}
          setProctoringModal={setProctoringModal}
          getparticulartestdata={getparticulartestdata}
          testID={testID}
          getParticularTest={getParticularTest}
          questionshuffling={questionshuffling}
          setQuestionShuffling={setQuestionShuffling}
          disableCopypaste={disableCopypaste}
          setDisableCopyPaste={setDisableCopyPaste}
          takesnapshots={takesnapshots}
          setTakeSnapshots={setTakeSnapshots}
          fullscreenmode={fullscreenmode}
          setFullScreenMode={setFullScreenMode}
          logoutonleaving={logoutonleaving}
          setLogoutOnLeaving={setLogoutOnLeaving}
          restrictcertainIp={restrictcertainIp}
          setRestrictCertainIp={setRestrictCertainIp}
        />
        <EmailAndReportSettings
          emailreportmodal={emailreportmodal}
          setEmailReportModal={setEmailReportModal}
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
        {questiondetails.length > 0 ? (
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
                {questiondetails.length > 0 ? questiondetails.length : ""}
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
                navigate("/home/selectQuestions");
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

            <div className="testCreatedSettingsLeftContainerProctoringDiv">
              <div className="testCreatedSettingsLeftContainerBodyheadersDiv">
                <span>
                  Proctoring settings{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      setProctoringModal(true);
                    }}
                  >
                    edit
                  </span>
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {questionshuffling ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Enable random question shuffling
                  </span>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {disableCopypaste ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Disable copy and paste in the code editor from external
                    sources
                  </span>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {takesnapshots ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Take candidate's snapshots during the test
                  </span>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {fullscreenmode ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Restrict candidates to the fullscreen mode during the test
                  </span>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {logoutonleaving ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Logout on leaving the test interface
                  </span>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {restrictcertainIp ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Restrict test access for certain IP addresses
                  </span>
                </div>
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
                <span>
                  Candidate settings{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {}}
                  >
                    edit
                  </span>
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {getparticulartestdata?.restrictTestAccessForIp ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Full name, Personal email ID
                  </span>
                </div>
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
                <span>
                  Email and Report settings{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      setEmailReportModal(true);
                    }}
                  >
                    edit
                  </span>
                </span>
              </div>
              <div className="testCreatedSettingsLeftContainerBodyCutOffDiv">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {getparticulartestdata?.candidateReport ? (
                    <img src={check} className="proctoringTrueIcon"></img>
                  ) : (
                    <img src={grayclose} className="proctoringTrueIcon"></img>
                  )}

                  <span style={{ marginLeft: "1%" }}>
                    Receive a report after a candidate completes the test
                  </span>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  {<img src={grayclose} className="proctoringTrueIcon"></img>}

                  <span style={{ marginLeft: "1%" }}>
                    Candidate's self assessment report
                  </span>
                </div>
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
                  {testnameedit ? (
                    <>
                      <input
                        placeholder="Enter New Name"
                        className="testNameEditInput"
                        onChange={(e) => {
                          dispatch(addTestName(e.target.value));
                        }}
                      ></input>
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setTestNameEdit(false);
                          handleTestEdit();
                        }}
                      >
                        Done
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{gettestname}</span>
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setTestNameEdit(true);
                        }}
                      >
                        edit
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="testNameDiv">
                <span>Test access</span>
                <div className="testAccessDiv">
                  {testaccess ? (
                    <img
                      src={switchon}
                      style={{ cursor: "pointer" }}
                      id={`option`}
                      onClick={() => {
                        if (
                          document.getElementById(`option`).src === switchon
                        ) {
                          document.getElementById(`option`).src = switchoff;
                          setTestAccess(false);
                          setTestStatus("OFF");
                          handleTestEdit(false);
                          if (
                            document.getElementById(`option`).src === switchoff
                          ) {
                            console.log("id");
                          }
                        } else {
                          setVisible("true");
                          document.getElementById(`option`).src = switchon;
                          setTestStatus("ON");
                          setTestAccess(true);
                          handleTestEdit(true);
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
                          setTestStatus("ON");
                          setTestAccess(true);
                          handleTestEdit(true);

                          if (
                            document.getElementById(`option`).src === switchon
                          ) {
                          }
                        } else {
                          document.getElementById(`option`).src = switchoff;
                          setTestStatus("OFF");
                          setTestAccess(false);
                          handleTestEdit(false);
                        }
                      }}
                    ></img>
                  )}
                  <span>{testaccess ? "ON" : "OFF"}</span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Starts on</span>
                <div className="testNameInputDiv">
                  <span>{`${monthname} ${getteststarttime?.getDate()}, ${getteststarttime?.getFullYear()} ${getteststarttime?.getHours()}:${getteststarttime?.getMinutes()} ${timezone} IST`}</span>

                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      setDateTimeModal(true);
                    }}
                  >
                    edit
                  </span>
                </div>
              </div>
              <div className="testNameDiv">
                <span>Ends on</span>
                <div className="testNameInputDiv">
                  <span>{`${endMonthName} ${gettestendtime?.getDate()}, ${gettestendtime?.getFullYear()} ${gettestendtime?.getHours()}:${gettestendtime?.getMinutes()} ${EndTimeZone} IST`}</span>
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      setEndTimeModal(true);
                    }}
                  >
                    edit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testAdminsHeader">
          <span>Test admins</span>
          <div className="testAdminsHeaderFunctions">
            <span>Point of contact</span>
            <select
              className="POCInput"
              onChange={(e) => {
                handlepointOfContact(e.target.value);
              }}
            >
              <option value={getloggedadmindata._id}>
                {getloggedadmindata.firstName
                  ? getloggedadmindata.firstName
                  : "Admin"}
              </option>
              {getadminsdata.map((data, index) => {
                return <option value={data._id}>{data.firstName}</option>;
              })}
            </select>
            {getloggedadmindata.isSuperAdmin ? (
              <button className="publishChangesButton">Add admins</button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="testAdminsTable">
          <div className="testAdminsTableHeader">
            <span
              className="testAdminsTableHeaderName"
              style={{ color: "white" }}
            >
              Name
            </span>
            <span
              className="testAdminsTableHeaderEmail"
              style={{ color: "white" }}
            >
              Email Id
            </span>
            <span className="testAdminsTableAccess" style={{ color: "white" }}>
              Access controls
            </span>
            <div className="testAdminsHeaderEmpty"></div>
          </div>
          <div className="testAdminsTableBody">
            <span className="testAdminsTableHeaderName">
              {getloggedadmindata.firstName
                ? getloggedadmindata.firstName
                : "Admin"}
              {getloggedadmindata._id ===
              getparticulartestdata.pointOfContact ? (
                <span
                  style={{
                    fontSize: "16px",
                    color: "white",
                    backgroundColor: "#0071c5",
                  }}
                >
                  POC
                </span>
              ) : (
                ""
              )}
            </span>
            <span className="testAdminsTableHeaderEmail">
              {getloggedadmindata.email}
            </span>
            <select className="allAccessInput">
              <option>All access</option>
              <option>Only Questions and Report</option>
              <option>Only Questions</option>
              <option>Only Reports</option>
              <option>Questions and Comments</option>
            </select>
            <div className="testAdminsHeaderEmpty"></div>
          </div>
        </div>

        <div
          className="testCreatedRightContainerHeading"
          style={{ marginTop: "3%" }}
        >
          <span>Test description</span>
          {testdescription ? (
            <span
              className="viewQuestionsButton"
              onClick={() => {
                setTestDescription(false);
              }}
            >
              add
            </span>
          ) : (
            <span
              className="viewQuestionsButton"
              onClick={() => {
                setTestDescription(true);
                handleTestDescription();
              }}
            >
              Done
            </span>
          )}
        </div>
        {testdescription ? (
          <div className="testCreatedTestDescriptionDiv">{parse(value)}</div>
        ) : (
          <div className="richTextEditor">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="textEditor"
            />
          </div>
        )}

        <div
          className="testCreatedRightContainerHeading"
          style={{ marginTop: "3%" }}
        >
          <span>Test instructions</span>
          {testinstructions ? (
            <span
              className="viewQuestionsButton"
              onClick={() => {
                setTestInstructions(false);
              }}
            >
              add
            </span>
          ) : (
            <span
              className="viewQuestionsButton"
              onClick={() => {
                setTestInstructions(true);
                handleTestInstructions();
              }}
            >
              Done
            </span>
          )}
        </div>
        {testinstructions ? (
          <div className="testCreatedtestInstructionsDiv">
            {parse(instructionvalue)}
          </div>
        ) : (
          <div className="richTextEditor">
            <ReactQuill
              theme="snow"
              value={instructionvalue}
              onChange={setInstructionValue}
              className="textEditor"
            />{" "}
          </div>
        )}
      </div>
    </>
  );
}
