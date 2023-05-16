import React, { useEffect, useState } from "react";
import "./TestCreatedQuestions.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedQuestionData,
  clearSelectedQuestionData,
  getSelectedQuestionData,
  getSelectedQuestionId,
} from "../../features/Test/TestSlice";
import axios from "axios";
import {
  getBaseURL,
  getLibraryQuestions,
} from "../../features/question/QuestionSlice";

export default function TestCreatedQuestions() {
  const [length, setLength] = useState(true);
  const navigate = useNavigate();
  const getlibraryquestions = useSelector(getLibraryQuestions);
  console.log("libQuestio", getlibraryquestions);

  const dispatch = useDispatch();

  const getselectedquestionsdata = useSelector(getSelectedQuestionData);
  console.log("selectedquestionsdata", getselectedquestionsdata);
  const getselectedquestionid = useSelector(getSelectedQuestionId);
  console.log("selectedquestionid", getselectedquestionid);

  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  return (
    <>
      <div className="testCreatedQuestionsContainer ">
        <div className="testCreatedQuestionsContainerHeader">
          <span className="testCreatedSelectedQuestionsText">Questions</span>
          {length ? (
            <>
              <div className="testCreatedQuestionsContainerHeaderTotal">
                <span>Total score: 4</span>
                <span>Total duration: 1hr 30min</span>
              </div>
              <div className="testCreatedQuestionsContainerHeaderButtons">
                <button className="createANewQuestionButton">
                  Create a new question
                </button>
                <button
                  className="createANewQuestionButton"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Choose from library
                </button>
                <span>+</span>
              </div>{" "}
            </>
          ) : (
            <span>+</span>
          )}
        </div>
        <div className="testCreatedQuestionsContainerBody">
          {length ? (
            <div className="testCreatedQuestionsBodyQuestionsDiv">
              <div className="testCreatedQuestionsBodyQuestionsDivHeader">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Programming Question (2)"
                    />
                  </FormGroup>
                  <span style={{ color: "gray", fontWeight: "400" }}>
                    total score 4
                  </span>
                </div>
                <span style={{ marginRight: "3%" }}>+</span>
              </div>
              <div className="testCreatedQuestionsBodyQuestionsDivBody">
                <div className="testCreatedQuestionsBodyQuestionContainer">
                  {" "}
                  <span className="testCreatedQuestionsBodyQuestionContainerNumber">
                    01.
                  </span>
                  <div className="testCreatedQuestionsBodyQuestionContainerDetails">
                    <span>Add 2 numbers</span>
                    <span>
                      Find the sum of 2 integers and display the result
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "50px",
                        width: "100%",
                      }}
                    >
                      <span>Easy</span>
                      <span>Score: 2</span>
                    </div>
                  </div>
                </div>
                <div className="testCreatedQuestionsBodyQuestionContainer">
                  {" "}
                  <span className="testCreatedQuestionsBodyQuestionContainerNumber">
                    02.
                  </span>
                  <div className="testCreatedQuestionsBodyQuestionContainerDetails">
                    <span>Add 2 numbers</span>
                    <span>
                      Find the sum of 2 integers and display the result
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "50px",
                        width: "100%",
                      }}
                    >
                      <span>Easy</span>
                      <span>Score: 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="testCreatedQuestionsBodyNoQuestionsDiv">
              <button
                className="publishChangesButton"
                style={{ marginRight: "2%" }}
                onClick={() => {
                  navigate("/home");
                }}
              >
                Choose from library
              </button>
              or
              <button
                className="createANewQuestionButton"
                style={{ marginLeft: "2%" }}
              >
                Create a new question
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
