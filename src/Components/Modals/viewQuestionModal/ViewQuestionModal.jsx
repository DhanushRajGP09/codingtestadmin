import React, { useEffect, useState } from "react";
import "./ViewQuestionModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import switchoff from "../../../Assets/Icons/Switch off.png";
import switchon from "../../../Assets/Icons/Switch on.png";
import Editor from "@monaco-editor/react";
import { languageOptions } from "../../../constants/languageOptions";

import { Routes, Route, useNavigate } from "react-router";
import parse from "html-react-parser";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { getIndividualQuestion } from "../../../features/question/QuestionSlice";

export default function ViewQuestionModal(props) {
  const [active, setActive] = useState(true);
  const [solutionactive, setSolutionActive] = useState(false);
  const [languageActive, setLanguageActive] = useState(false);
  const [prevbutton, setPrevButton] = useState(false);

  const [language, setLanguage] = useState(languageOptions[6]);
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("token"));

  const handlepublish = (id) => {
    axios
      .post(
        "http://139.59.56.122:5000/api/question/publish-question",
        {
          questionId: id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            questionId: id,
          },
        }
      )
      .then(function (response) {
        console.log("published", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("in view m");
  const [indexnumber, setIndexNumber] = useState(0);

  const getindividualquestiondata = useSelector(getIndividualQuestion);
  console.log("individualquestiondatainmod", getindividualquestiondata);

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
                {getindividualquestiondata?.question?.questionType} Question
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button className="editQuestionButton">Edit Question</button>
                {getindividualquestiondata?.question?.questionPublished ? (
                  ""
                ) : (
                  <button
                    className="publishChangesButton"
                    onClick={() => {
                      handlepublish(getindividualquestiondata?.question?._id);
                      props.getAllTestQuestions();
                      props.handleQuestionClick(
                        getindividualquestiondata?.question?._id
                      );
                    }}
                  >
                    Publish Question
                  </button>
                )}
              </div>
            </div>
            <div className="createQuestionmodalHeader">
              <div className="createQuestionmodalHeaderIndicator"></div>
              <a
                className="createQuestionmodalHeaderSection"
                onClick={() => {
                  setSolutionActive(false);
                  setActive(true);
                  setLanguageActive(false);
                }}
                style={{
                  textDecoration: "none",
                  backgroundColor: active ? "#0071c5" : "white",
                  color: active ? "white" : "#0071c5",
                }}
                href="#description"
              >
                Description
              </a>
              <a
                className="createQuestionmodalHeaderSection"
                onClick={() => {
                  setSolutionActive(true);
                  setActive(false);
                  setLanguageActive(false);
                }}
                style={{
                  textDecoration: "none",
                  backgroundColor: solutionactive ? "#0071c5" : "white",
                  color: solutionactive ? "white" : "#0071c5",
                }}
                href="#solutionandtestcase"
              >
                Solution & test cases
              </a>
              <a
                className="createQuestionmodalHeaderSection"
                onClick={() => {
                  setSolutionActive(false);
                  setActive(false);
                  setLanguageActive(true);
                }}
                style={{
                  textDecoration: "none",
                  backgroundColor: languageActive ? "#0071c5" : "white",
                  color: languageActive ? "white" : "#0071c5",
                }}
                href="#languages"
              >
                Languages
              </a>
            </div>
            <div className="viewQuestionModalBody">
              <div className="viewQuestionModalDescription" id="description">
                <span className="viewQuestionModalDescriptionText">
                  Description
                </span>
                <div className="viewQuestionModalDescriptionDetails">
                  <div className="descriptionViewLeftContainer">
                    <span className="problemNameText">Problem Name</span>
                    <div className="viewproblemName" onChange={(e) => {}}>
                      {getindividualquestiondata?.question?.questionName}
                    </div>
                    <span
                      className="problemNameText"
                      style={{ marginTop: "4%" }}
                    >
                      Problem statement
                    </span>

                    <div className="viewrichTextEditor">
                      {getindividualquestiondata?.question &&
                        getindividualquestiondata?.question
                          ?.questionStatement &&
                        parse(
                          getindividualquestiondata?.question?.questionStatement
                        )}
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
                        {getindividualquestiondata?.question?.difficultyLevel}
                      </span>
                    </div>
                    <div
                      className="maxScoreDiv"
                      style={{ marginTop: "5%", height: "80px" }}
                    >
                      <span className="problemNameText">Maximum score</span>
                      <span className="viewMaxScore">
                        {
                          getindividualquestiondata?.question
                            ?.totalScoreForQuestion
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="viewQuestionModalSolutionandTestCase"
                id="solutionandtestcase"
              >
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
                      {getindividualquestiondata?.testCases?.length > 0
                        ? getindividualquestiondata?.testCases[
                            getindividualquestiondata?.testCases?.length - 1
                          ]?.input
                        : ""}
                    </div>
                    <span style={{ color: "#0071c5", marginTop: "3%" }}>
                      Sample Output
                    </span>
                    <div className="viewSampleInput">
                      {getindividualquestiondata?.testCases?.length > 0
                        ? getindividualquestiondata?.testCases[
                            getindividualquestiondata?.testCases?.length - 1
                          ]?.output
                        : ""}
                    </div>
                  </div>
                  <div className="viewQuestionModalSolutionandTestCaseSampleRightContainer">
                    <span>Sample explanation</span>
                    <div className="viewSampleInput">
                      {getindividualquestiondata?.testCases?.length > 0
                        ? getindividualquestiondata?.testCases[
                            getindividualquestiondata?.testCases?.length - 1
                          ]?.explaination &&
                          parse(
                            getindividualquestiondata?.testCases[
                              getindividualquestiondata?.testCases?.length - 1
                            ]?.explaination
                          )
                        : ""}
                    </div>
                  </div>
                </div>
                <span
                  className="viewQuestionModalDescriptionText"
                  style={{ marginTop: "2%" }}
                >
                  Test cases
                </span>
                {getindividualquestiondata?.testCases?.length > 0 ? (
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

                    {getindividualquestiondata?.testCases.map((data, index) => {
                      return (
                        <div
                          className="tableFields"
                          style={{ height: "auto", marginTop: "0.5%" }}
                        >
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
                          <div className="scoreText" style={{ height: "auto" }}>
                            <span
                              className="eachScoreInput"
                              style={{ height: "auto" }}
                            >
                              {data?.explaination && parse(data.explaination)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="tableFooter">
                      <span style={{ marginLeft: "38%" }}>
                        Total score:{" "}
                        {
                          getindividualquestiondata?.question
                            ?.totalScoreForQuestion
                        }
                      </span>
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
              <div className="viewLanguages" id="languages">
                <span className="viewQuestionModalDescriptionText">
                  Default codes
                </span>
                <div
                  className="codeSnippetContainerBody"
                  style={{ marginTop: "3%" }}
                >
                  <div className="codeSnippetSelectedLanguages">
                    {getindividualquestiondata?.defaultCodes.length > 0
                      ? getindividualquestiondata?.defaultCodes.map(
                          (data, index) => {
                            return (
                              <div
                                className="codeSnippetSelectedLanguage"
                                id={`selectedLanguage${index}`}
                                onClick={() => {
                                  setIndexNumber(index);
                                  setLanguage(
                                    data.language === "C"
                                      ? languageOptions[1]
                                      : data.language === "CS"
                                      ? languageOptions[3]
                                      : data.language === "Cpp"
                                      ? languageOptions[2]
                                      : data.language === "Python"
                                      ? languageOptions[6]
                                      : data.language === "Javascript"
                                      ? languageOptions[0]
                                      : languageOptions[5]
                                  );
                                }}
                              >
                                {data.language}
                              </div>
                            );
                          }
                        )
                      : ""}
                  </div>
                  <div className="codeContainerDiv">
                    <div className="codeContainerDivHeader">
                      <div className="codeContainerDivHeaderHeader">
                        <span style={{ color: "white", marginLeft: "2%" }}>
                          Head
                        </span>
                        <span
                          className="maxScoreDescription"
                          style={{ marginLeft: "2%", color: "white" }}
                        >
                          This cannot be edited by the candidate
                        </span>
                      </div>

                      <Editor
                        height="15vh"
                        width={"100%"}
                        language={language?.value || "Python"}
                        value={"no code"}
                        defaultValue="// some comment"
                      />
                      <div className="codeContainerDivBody">
                        <div className="codeContainerDivBodyHeader">
                          <span style={{ color: "white", marginLeft: "2%" }}>
                            Body
                          </span>
                        </div>
                        <div className="codeContainerDivBodyBody">
                          {/* <div style={{ height: "23vh", width: "100%" }}>
                            {getindividualquestiondata?.defaultCodes.length > 0
                              ? getindividualquestiondata?.defaultCodes[0]
                                  ?.defaultCode
                              : "no default code"}
                          </div> */}
                          <Editor
                            height="23vh"
                            width={"100%"}
                            language={language?.value || "Python"}
                            value={
                              getindividualquestiondata?.defaultCodes.length > 0
                                ? getindividualquestiondata?.defaultCodes[
                                    indexnumber
                                  ]?.defaultCode
                                : "no default code"
                            }
                            defaultValue="// some comment"
                          />
                        </div>
                      </div>
                      <div className="codeContainerDivHeader">
                        <div className="codeContainerDivHeaderHeader">
                          <span style={{ color: "white", marginLeft: "2%" }}>
                            Tail
                          </span>
                          <span
                            className="maxScoreDescription"
                            style={{ marginLeft: "2%", color: "white" }}
                          >
                            This cannot be edited by the candidate
                          </span>
                        </div>
                        <Editor
                          height="15vh"
                          width={"100%"}
                          language={language?.value || "Python"}
                          value={"no code"}
                          defaultValue="// some comment"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
