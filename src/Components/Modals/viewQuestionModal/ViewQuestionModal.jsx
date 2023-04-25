import React, { useEffect, useState } from "react";
import "./ViewQuestionModal.css";
import close from "../../../Assets/Icons/closemodal2.png";

import { Routes, Route, useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

export default function ViewQuestionModal(props) {
  const [active, setActive] = useState(true);
  const [solutionactive, setSolutionActive] = useState(false);
  const [languageActive, setLanguageActive] = useState(false);
  const [prevbutton, setPrevButton] = useState(false);

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
