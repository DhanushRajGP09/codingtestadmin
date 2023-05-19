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
  getTestHour,
  getTestMinutes,
} from "../../features/Test/TestSlice";
import parse from "html-react-parser";
import axios from "axios";
import {
  getBaseURL,
  getLibraryQuestions,
} from "../../features/question/QuestionSlice";

export default function TestCreatedQuestions(props) {
  const [length, setLength] = useState(true);
  const navigate = useNavigate();
  const getlibraryquestions = useSelector(getLibraryQuestions);
  console.log("libQuesti", getlibraryquestions);

  const dispatch = useDispatch();

  const getselectedquestionsdata = useSelector(getSelectedQuestionData);
  console.log("selectedquestionsdata", getselectedquestionsdata);
  const getselectedquestionid = useSelector(getSelectedQuestionId);
  console.log("selectedquestionid", getselectedquestionid);

  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  const [totalscore, setTotalScore] = useState(0);

  useEffect(() => {
    let score = 0;
    for (let item of getselectedquestionsdata) {
      score += item.question.totalScoreForQuestion;
    }

    setTotalScore(score);
  }, []);

  console.log(totalscore);

  const gettesthour = useSelector(getTestHour);
  const gettestminutes = useSelector(getTestMinutes);

  return (
    <>
      <div className="testCreatedQuestionsContainer ">
        <div className="testCreatedQuestionsContainerHeader">
          <span className="testCreatedSelectedQuestionsText">Questions</span>
          {getselectedquestionsdata.length > 0 ? (
            <>
              <div className="testCreatedQuestionsContainerHeaderTotal">
                <span>Total score: {totalscore}</span>
                <span>
                  Total duration: {gettesthour}hr {gettestminutes}min
                </span>
              </div>
              <div className="testCreatedQuestionsContainerHeaderButtons">
                <button
                  className="createANewQuestionButton"
                  onClick={() => {
                    props.setModal(true);
                  }}
                >
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
          {getselectedquestionsdata.length > 0 ? (
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
                      label={`Programming Question (${getselectedquestionsdata.length})`}
                    />
                  </FormGroup>
                  <span style={{ color: "gray", fontWeight: "400" }}>
                    total score: {totalscore}
                  </span>
                </div>
                <span style={{ marginRight: "3%" }}>+</span>
              </div>
              <div className="testCreatedQuestionsBodyQuestionsDivBody">
                {getselectedquestionsdata.map((data, index) => {
                  return (
                    <div className="testCreatedQuestionsBodyQuestionContainer">
                      {" "}
                      <span className="testCreatedQuestionsBodyQuestionContainerNumber">
                        {index + 1}.
                      </span>
                      <div className="testCreatedQuestionsBodyQuestionContainerDetails">
                        <span
                          onClick={() => {
                            props.handleQuestionClick(data.question._id);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {data.question.questionName}
                        </span>
                        <span>{parse(data.question.questionStatement)}</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "50px",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              color:
                                data.question.difficultyLevel === "hard"
                                  ? "red"
                                  : data.question.difficultyLevel === "medium"
                                  ? "blue"
                                  : "green",
                            }}
                          >
                            {data.question.difficultyLevel}
                          </span>
                          <span>
                            Score: {data.question.totalScoreForQuestion}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
