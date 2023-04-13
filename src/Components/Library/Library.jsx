import React, { useState } from "react";
import "./Library.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import search from "../../Assets/Icons/searchicon.png";
import CreateQuestionModal from "../Modals/createQuestionModal/CreateQuestionModal";
import { useSelector } from "react-redux";
import { getLibraryQuestions } from "../../features/question/QuestionSlice";

export default function Library() {
  const [modal, setModal] = useState(false);

  const getlibraryquestions = useSelector(getLibraryQuestions);
  console.log("libQuestions", getlibraryquestions);

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
            <span>Questions ({getlibraryquestions.length})</span>
            <div className="libraryQuestionsSearch">
              <input
                className="libraryQuestionsSearchInput"
                placeholder="search for topics,problem title or problem description"
              ></input>
              <img src={search} className="searchIcon"></img>
            </div>
            <div className="libraryQuestionsSort"></div>
          </div>
          {getlibraryquestions.map((data, index) => {
            return (
              <div className="libraryQuestionDiv">
                <span className="libraryQuestionName">{data.questionName}</span>
                <span className="libraryQuestionDescription">
                  {data.questionDescription}
                </span>
                <div className="libraryQuestionDivSeperator"></div>
                <div className="libraryQuestionDivFooter">
                  <div className="libraryQuestionDivFooter-levelDiv">
                    <span
                      className="questionLevel"
                      style={{
                        color:
                          data.questionLevel === "Hard"
                            ? "red"
                            : data.questionLevel === "medium"
                            ? "blue"
                            : "green",
                      }}
                    >
                      {data.questionLevel}
                    </span>
                    <span>Score {data.score}</span>
                    <span>Recommended time: {data.recommendedTime}</span>
                  </div>
                  <span className="libraryQuestionDivFooter-QuestionType">
                    {data.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
