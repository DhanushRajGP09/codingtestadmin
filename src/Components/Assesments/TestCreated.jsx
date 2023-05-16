import React, { useEffect, useState } from "react";
import "./TestCreated.css";
import { Routes, Route, useNavigate } from "react-router";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import switchoff from "../../Assets/Icons/Switch off.png";
import switchon from "../../Assets/Icons/Switch on.png";
import TestCreatedOverview from "./TestCreatedOverview";
import TestCreatedQuestions from "./TestCreatedQuestions";
import PublishTestModal from "../Modals/PublishTestModal/PublishTestModal";
import { Link, NavLink } from "react-router-dom";
import TestCreatedTestTaken from "./TestCreatedTestTaken";
import {
  addIndividualQuestion,
  getBaseURL,
} from "../../features/question/QuestionSlice";
import TestCreatedReviewPending from "./TestCreatedReviewPending";
import TestCreatedShortlisted from "./TestCreatedShortlisted";
import TestCreatedArchived from "./TestCreatedArchived";
import TestCreatedInvited from "./TestCreatedInvited";
import TestAnalytics from "./TestAnalytics";
import QuestionAnalytics from "./QuestionAnalytics";
import CandidatesFeedback from "./CandidatesFeedback";
import axios from "axios";
import ViewQuestionModal from "../Modals/viewQuestionModal/ViewQuestionModal";
import { useDispatch, useSelector } from "react-redux";

export default function TestCreated() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState("true");
  const [testStatus, setTestStatus] = useState("ON");
  const [overview, setOverview] = useState(true);
  const [publishtestmodal, setPublishTestModal] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/home/assesments/testcreated") {
      setOverview(true);
    } else {
      setOverview(false);
    }
  });

  const [published, setPublished] = useState(true);
  const [viewmodal, setViewModal] = useState(false);
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  const handleQuestionClick = (id) => {
    axios
      .get(
        `${getbaseurl}/question/get-perticular-question`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            itemsPerPage: 1,
            page: 1,
            questionId: id,
          },
        }
      )
      .then(function (response) {
        console.log("IndividualQuestionData", response);
        dispatch(addIndividualQuestion(response.data.data));
        setViewModal(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <PublishTestModal
        publishtestmodal={publishtestmodal}
        setPublishTestModal={setPublishTestModal}
        setPublished={setPublished}
      />
      <ViewQuestionModal
        viewmodal={viewmodal}
        setViewModal={setViewModal}
        handleQuestionClick={handleQuestionClick}
      />
      <div className="testCreatedHeader">
        <span
          className="testHeaderBackButton"
          onClick={() => {
            navigate("/home/assesments");
          }}
        >
          {" "}
          {"<"} Back{" "}
        </span>
        <span className="testCreatedSectionName">
          Trainee software engineer test
        </span>
        <div className="testHeaderFunctionsDiv">
          <div className="testHeaderFunctionCopy">Copy link</div>
          <div className="testHeaderFunctionCopy">Preview</div>
          {published ? (
            <button
              className="publishChangesButton"
              onClick={() => {
                navigate("/home/Invitecandidates");
              }}
            >
              Invite candidates +
            </button>
          ) : (
            <button
              className="publishChangesButton"
              onClick={() => {
                setPublishTestModal(true);
              }}
            >
              Publish
            </button>
          )}
        </div>
      </div>
      <div className="testCreatedBody">
        <div className="testCreatedLeftContainer">
          {published ? (
            <>
              <div className="testCreatedLeftContainerDetails">
                <span className="testDetialsText">Candidates</span>
                <div className="testDetailsDiv">
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/testtaken"
                  >
                    Test taken (0)
                  </NavLink>
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/reviewpending"
                  >
                    Review pending (0)
                  </NavLink>
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/shortlisted"
                  >
                    Shortlisted (0)
                  </NavLink>
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/archived"
                  >
                    Archived (0)
                  </NavLink>
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/invited"
                  >
                    Invited (0)
                  </NavLink>
                </div>
              </div>
              <div className="testCreatedLeftContainerDetails">
                <span className="testDetialsText">Analytics</span>
                <div className="testDetailsDiv">
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/testanalytics"
                  >
                    Test analytics
                  </NavLink>
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/questionanalytics"
                  >
                    Question analytics
                  </NavLink>
                  <NavLink
                    className="testDetailsDivOverview"
                    to="/home/assesments/testcreated/candidatesfeedback"
                  >
                    Candidates feedback
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="testCreatedLeftContainerDetails">
            <span className="testDetialsText">Test details</span>
            <div className="testDetailsDiv">
              <div
                className="testDetailsDivOverview"
                style={{ backgroundColor: overview ? "lightgray" : "white" }}
                onClick={() => {
                  setOverview(true);
                  navigate("/home/assesments/testcreated");
                }}
              >
                Overview
              </div>
              <NavLink
                className="testDetailsDivOverview"
                to="/home/assesments/testcreated/questions"
              >
                Questions
              </NavLink>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<TestCreatedOverview />}></Route>
          <Route
            path="/questions"
            element={
              <TestCreatedQuestions
                setViewModal={setViewModal}
                handleQuestionClick={handleQuestionClick}
              />
            }
          ></Route>
          <Route path="/testtaken" element={<TestCreatedTestTaken />}></Route>
          <Route
            path="/reviewpending"
            element={<TestCreatedReviewPending />}
          ></Route>
          <Route
            path="/shortlisted"
            element={<TestCreatedShortlisted />}
          ></Route>
          <Route path="/archived" element={<TestCreatedArchived />}></Route>
          <Route path="/invited" element={<TestCreatedInvited />}></Route>
          <Route path="/testanalytics" element={<TestAnalytics />}></Route>
          <Route
            path="/questionanalytics"
            element={<QuestionAnalytics />}
          ></Route>
          <Route
            path="/candidatesfeedback"
            element={<CandidatesFeedback />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}
