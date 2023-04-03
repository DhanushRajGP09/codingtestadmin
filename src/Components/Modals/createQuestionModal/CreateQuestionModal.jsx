import React, { useEffect, useState } from "react";
import "./CreateQuestionModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import Description from "../../Description/Description";
import { Routes, Route, useNavigate } from "react-router";
import SolutionTest from "../../SolutionTest/SolutionTest";
import Languages from "../../Languages/Languages";

export default function CreateQuestionModal(props) {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [solutionactive, setSolutionActive] = useState(false);
  const [languageActive, setLanguageActive] = useState(false);

  return (
    <div
      className="createQuestionModal"
      style={{ display: props.modal ? "flex" : "none" }}
    >
      <div className="createQuestionoverlay">
        <div className="createQuestionmodal-content">
          <img
            src={close}
            className="closeCreateQuestionModal"
            onClick={() => {
              props.setModal(false);
            }}
          ></img>
          <div className="createQuestionmodal-inner-content">
            {/* <div className="createQuestionmodalHeader">
              <span style={{ marginLeft: "5%" }}>Programming Question</span>
              <button className="editQuestionButton">Edit Quesiton</button>
            </div> */}
            <div className="createQuestionmodalHeader">
              <div className="createQuestionmodalHeaderIndicator"></div>
              <div
                className="createQuestionmodalHeaderSection"
                onClick={() => {
                  navigate("/home");
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
                  navigate("/home/Solution");
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
                  navigate("/home/Languages");
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
            <div className="createQuestionmodalBody">
              <Routes>
                <Route path="/" element={<Description />}></Route>

                <Route path="/Solution" element={<SolutionTest />}></Route>
                <Route path="/Languages" element={<Languages />}></Route>
              </Routes>
            </div>
            <div className="createQuestionmodalFooter">
              <div className="createQuestionmodalFooterNextPrevDiv">
                <button className="nextButton">Next</button>
              </div>
              <div className="createQuestionmodalFooterSavePublishDiv">
                <button className="saveAsDraftButton">Save as draft</button>
                <button className="publishChangesButton">
                  Publish changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
