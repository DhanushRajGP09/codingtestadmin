import React, { useEffect, useState } from "react";
import "./ViewQuestionModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import switchoff from "../../../Assets/Icons/Switch off.png";
import switchon from "../../../Assets/Icons/Switch on.png";

import { Routes, Route, useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

export default function ViewQuestionModal(props) {
  const [active, setActive] = useState(true);
  const [solutionactive, setSolutionActive] = useState(false);
  const [languageActive, setLanguageActive] = useState(false);
  const [prevbutton, setPrevButton] = useState(false);

  const dispatch = useDispatch();

  const gettestcases = [
    {
      input: "2",
      output: "1",
      visibility: "true",
      score: "3",
      explaination: "hihi",
    },
  ];

  return (
    <div
      className="createQuestionModal"
      style={{ display: props.viewmodal ? "flex" : "none" }}
    >
      <div className="createQuestionoverlay">
        <div className="createQuestionmodal-content">
          <img
            src={close}
            className="closeCreateQuestionModal"
            onClick={() => {
              props.setViewModal(false);
            }}
          ></img>
          <div className="createQuestionmodal-inner-content">
            {/* <div className="createQuestionmodalHeader">
              <span style={{ marginLeft: "5%" }}>Programming Question</span>
              <button className="editQuestionButton">Edit Quesiton</button>
            </div> */}
            <div className="viewQuestionModalHeader">
              <span className="viewCategoryQuestionText">
                Programming Question
              </span>

              <button className="editQuestionButton">Edit Question</button>
            </div>
            <div className="createQuestionmodalHeader">
              <div className="createQuestionmodalHeaderIndicator"></div>
              <div
                className="createQuestionmodalHeaderSection"
                onClick={() => {
                  setSolutionActive(false);
                  setActive(true);
                  setLanguageActive(false);
                }}
                style={{
                  backgroundColor: active ? "#0071c5" : "white",
                  color: active ? "white" : "#0071c5",
                }}
              >
                Description
              </div>
              <div
                className="createQuestionmodalHeaderSection"
                onClick={() => {
                  setSolutionActive(true);
                  setActive(false);
                  setLanguageActive(false);
                }}
                style={{
                  backgroundColor: solutionactive ? "#0071c5" : "white",
                  color: solutionactive ? "white" : "#0071c5",
                }}
              >
                Solution & test cases
              </div>
              <div
                className="createQuestionmodalHeaderSection"
                onClick={() => {
                  setSolutionActive(false);
                  setActive(false);
                  setLanguageActive(true);
                }}
                style={{
                  backgroundColor: languageActive ? "#0071c5" : "white",
                  color: languageActive ? "white" : "#0071c5",
                }}
              >
                Languages
              </div>
            </div>
            <div className="viewQuestionModalBody">
              <div className="viewQuestionModalDescription">
                <span className="viewQuestionModalDescriptionText">
                  Description
                </span>
                <div className="viewQuestionModalDescriptionDetails">
                  <div className="descriptionViewLeftContainer">
                    <span className="problemNameText">Problem Name</span>
                    <div className="viewproblemName" onChange={(e) => {}}>
                      hehe
                    </div>
                    <span
                      className="problemNameText"
                      style={{ marginTop: "4%" }}
                    >
                      Problem statement
                    </span>
                    <div className="viewrichTextEditor">
                      hhhhhhhhhhhhhhhhhhhhhhhhh egggggggggggggggggggg
                      geeeeeeeeeeeeeeeeeeeeeeeeeeeeee hhhhhhhhhhhhhhhhhhhhhhhhh
                      egggggggggggggggggggg geeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                      hhhhhhhhhhhhhhhhhhhhhhhhh egggggggggggggggggggg
                      geeeeeeeeeeeeeeeeeeeeeeeeeeeeee hhhhhhhhhhhhhhhhhhhhhhhhh
                      egggggggggggggggggggg geeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    </div>
                  </div>
                  <div className="descriptionViewRightContainer">
                    <div className="viewdifficultyLevelDiv">
                      <span className="problemNameText">Difficulty level</span>
                      <span
                        className="viewquestionLevel"
                        // style={{
                        //   color:
                        //    data.difficultyLevel === "hard"
                        //       ? "red"
                        //       : data.difficultyLevel === "medium"
                        //       ? "blue"
                        //       : "green",
                        // }}
                      >
                        easy
                      </span>
                    </div>
                    <div
                      className="maxScoreDiv"
                      style={{ marginTop: "5%", height: "80px" }}
                    >
                      <span className="problemNameText">Maximum score</span>
                      <span className="viewMaxScore">5</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="viewQuestionModalSolutionandTestCase">
                <span className="viewQuestionModalDescriptionText">
                  Solution and Test cases
                </span>
                <div className="viewQuestionModalSolutionandTestCaseSampleDiv">
                  <div className="viewQuestionModalSolutionandTestCaseSampleLeftContainer">
                    <span>Sample</span>
                    <span style={{ color: "#0071c5", marginTop: "3%" }}>
                      Sample input
                    </span>
                    <div className="viewSampleInput">
                      sadasdasdsadasdasdd dasd sadasdsadasdasd
                    </div>
                    <span style={{ color: "#0071c5", marginTop: "3%" }}>
                      Sample Output
                    </span>
                    <div className="viewSampleInput">
                      sadasdasdsadasdasdd dasd sadasdsadasdasdsd sasadsadasd
                      sdasdas
                    </div>
                  </div>
                  <div className="viewQuestionModalSolutionandTestCaseSampleRightContainer">
                    <span>Sample explanation</span>
                    <div className="viewSampleInput">
                      sadasdasdsadasdasdd dasd sadasdsadasdasdsd sasadsadasd
                      sdasdas
                    </div>
                  </div>
                </div>
                <span
                  className="viewQuestionModalDescriptionText"
                  style={{ marginTop: "2%" }}
                >
                  Test cases
                </span>
                {gettestcases.length > 0 ? (
                  <div
                    className="Totalstudenttable"
                    style={{ marginTop: "2%" }}
                  >
                    <div className="tableHeader">
                      <div className="inputFilesText">Input files</div>
                      <div className="inputFilesText">Output files</div>
                      <div className="scoreText">Score</div>
                      <div className="visibleToCandidatesText">
                        Visible to candidates
                      </div>
                      <div className="scoreText">Explanation</div>
                    </div>

                    {gettestcases.map((data, index) => {
                      return (
                        <div className="tableFields">
                          <div
                            className="inputFilesText"
                            id={`input ${index}`}
                            onClick={() => {
                              document.getElementById(
                                `input ${index}`
                              ).innerHTML = data.input;
                              setTimeout(() => {
                                document.getElementById(
                                  `input ${index}`
                                ).innerHTML = `input ${index + 1}`;
                              }, 3000);
                            }}
                          >
                            input {index + 1}
                          </div>
                          <div
                            className="inputFilesText"
                            id={`output ${index}`}
                            onClick={() => {
                              document.getElementById(
                                `output ${index}`
                              ).innerHTML = data.output;
                              setTimeout(() => {
                                document.getElementById(
                                  `output ${index}`
                                ).innerHTML = `output ${index + 1}`;
                              }, 3000);
                            }}
                          >
                            output {index + 1}
                          </div>
                          <div className="scoreText">
                            <input
                              className="eachScoreInput"
                              name="score"
                              value={data.score}
                            ></input>
                          </div>
                          <div className="visibleToCandidatesText">
                            {data.visibility === "true" ? (
                              <img src={switchon} id={`option${index}`}></img>
                            ) : (
                              <img src={switchoff} id={`option${index}`}></img>
                            )}
                          </div>
                          <div className="scoreText">
                            <span className="eachScoreInput">
                              {data.explaination}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="tableFooter">
                      <span style={{ marginLeft: "38%" }}>Total score:</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="Totalstudenttable"
                    style={{ marginTop: "2%" }}
                  >
                    <span style={{ fontSize: "20px", marginLeft: "40%" }}>
                      No Test Cases Added
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
