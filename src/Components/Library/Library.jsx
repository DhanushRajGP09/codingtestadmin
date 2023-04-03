import React, { useState } from "react";
import "./Library.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import search from "../../Assets/Icons/searchicon.png";
import CreateQuestionModal from "../Modals/createQuestionModal/CreateQuestionModal";

export default function Library() {
  const [modal, setModal] = useState(false);

  return (
    <div className="adminLibrary">
      <CreateQuestionModal modal={modal} setModal={setModal} />
      <div className="libraryHeader">
        <span className="sectionName">Library</span>
        <button
          className="createQuestionButton"
          onClick={() => {
            setModal(true);
          }}
        >
          Create a Question
        </button>
      </div>
      <div className="libraryBody">
        <div className="libraryCategoryContainer">
          <span>Question Type</span>
          <div className="libraryCategoryDiv">
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Label" />
            </FormGroup>
          </div>
        </div>
        <div className="libraryQuestionsContainer">
          <div className="libraryQuestionsContainerHeader">
            <span>Questions (10)</span>
            <div className="libraryQuestionsSearch">
              <input
                className="libraryQuestionsSearchInput"
                placeholder="search for topics,problem title or problem description"
              ></input>
              <img src={search} className="searchIcon"></img>
            </div>
            <div className="libraryQuestionsSort"></div>
          </div>
          <div className="libraryQuestionDiv">
            <span className="libraryQuestionName">the question number1</span>
            <span className="libraryQuestionDescription">sadadasdasdasd</span>
            <div className="libraryQuestionDivSeperator"></div>
            <div className="libraryQuestionDivFooter">
              <div className="libraryQuestionDivFooter-levelDiv">
                <span className="questionLevel">Easy</span>
                <span>Score</span>
                <span>Recommended time: 20 mins</span>
              </div>
              <span className="libraryQuestionDivFooter-QuestionType">
                Programming
              </span>
            </div>
          </div>
          <div className="libraryQuestionDiv">
            <span className="libraryQuestionName">the question number1</span>
            <span className="libraryQuestionDescription">sadadasdasdasd</span>
            <div className="libraryQuestionDivSeperator"></div>
            <div className="libraryQuestionDivFooter">
              <div className="libraryQuestionDivFooter-levelDiv">
                <span className="questionLevel">Easy</span>
                <span>Score</span>
                <span>Recommended time: 20 mins</span>
              </div>
              <span className="libraryQuestionDivFooter-QuestionType">
                Programming
              </span>
            </div>
          </div>
          <div className="libraryQuestionDiv">
            <span className="libraryQuestionName">the question number1</span>
            <span className="libraryQuestionDescription">sadadasdasdasd</span>
            <div className="libraryQuestionDivSeperator"></div>
            <div className="libraryQuestionDivFooter">
              <div className="libraryQuestionDivFooter-levelDiv">
                <span className="questionLevel">Easy</span>
                <span>Score</span>
                <span>Recommended time: 20 mins</span>
              </div>
              <span className="libraryQuestionDivFooter-QuestionType">
                Programming
              </span>
            </div>
          </div>
          <div className="libraryQuestionDiv">
            <span className="libraryQuestionName">the question number1</span>
            <span className="libraryQuestionDescription">sadadasdasdasd</span>
            <div className="libraryQuestionDivSeperator"></div>
            <div className="libraryQuestionDivFooter">
              <div className="libraryQuestionDivFooter-levelDiv">
                <span className="questionLevel">Easy</span>
                <span>Score</span>
                <span>Recommended time: 20 mins</span>
              </div>
              <span className="libraryQuestionDivFooter-QuestionType">
                Programming
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
