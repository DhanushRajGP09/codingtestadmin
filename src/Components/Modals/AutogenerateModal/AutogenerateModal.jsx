import React from "react";
import "./AutogenerateModal.css";
import close from "../../../Assets/Icons/closemodal2.png";

export default function AutogenerateModal(props) {
  return (
    <div
      className="createQuestionModal"
      style={{ display: props.autogeneratemodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createQuestionmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setAutoGenerateModal(false);
            }}
          ></img>
          <div className="addtestcasemodal-inner-content">
            <span className="problemNameText" style={{ marginTop: "5%" }}>
              Auto generate code snippets
            </span>
            <div className="functionNameReturnDiv">
              <div className="functionNameDiv">
                <span className="problemNameText">Function name</span>
                <input className="functionNameInput"></input>
              </div>
              <div className="functionNameDiv">
                <span className="problemNameText">Return type</span>
                <select className="functionNameInput"></select>
              </div>
            </div>
            <div className="functionCommentsReturnDiv">
              <span className="problemNameText">Comment to be displayed</span>
              <textarea className="functionCommentInput"></textarea>
            </div>
            <div className="functionNameReturnDiv">
              <div className="functionNameDiv">
                <span className="problemNameText">Function parameters</span>
                <select className="functionNameInput"></select>
              </div>
              <div className="functionNameDiv">
                <span className="problemNameText"></span>
                <input
                  className="functionNameInput"
                  placeholder="Param name"
                ></input>
              </div>
            </div>
            <div className="generateCodeDiv">
              <button className="publishChangesButton">Generate code</button>
              <button className="addParameterButton">Add parameter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
