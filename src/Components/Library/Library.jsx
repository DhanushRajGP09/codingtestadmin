import React, { useEffect, useState } from "react";
import "./Library.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import search from "../../Assets/Icons/searchicon.png";
import CreateQuestionModal from "../Modals/createQuestionModal/CreateQuestionModal";
import { useSelector } from "react-redux";
import {
  addIndividualQuestion,
  addLibraryQuestions,
  getLibraryQuestions,
  getQuestionID,
} from "../../features/question/QuestionSlice";
import ViewQuestionModal from "../Modals/viewQuestionModal/ViewQuestionModal";
import { useNavigate } from "react-router";

import axios from "axios";
import { useDispatch } from "react-redux";

export default function Library() {
  const [modal, setModal] = useState(false);

  const getlibraryquestions = useSelector(getLibraryQuestions);
  console.log("libQuestion", getlibraryquestions);

  const [viewmodal, setViewModal] = useState(false);
  const navigate = useNavigate();

  const getquestionid = useSelector(getQuestionID);
  console.log("questionI", getquestionid);

  const token = JSON.parse(localStorage.getItem("token"));

  const dispatch = useDispatch();

  const getAllTestQuestions = () => {
    axios
      .get(
        "http://139.59.56.122:5000/api/question",

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            itemsPerPage: 20,
            page: 1,
          },
        }
      )
      .then(function (response) {
        console.log("allQuestions", response);
        dispatch(addLibraryQuestions(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTestQuestions();
  }, []);

  const handleQuestionClick = () => {
    axios
      .get(
        "http://139.59.56.122:5000/api/question/get-perticular-question",

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            itemsPerPage: 20,
            page: 1,
          },
        }
      )
      .then(function (response) {
        console.log("IndividualQuestionData", response);
        dispatch(addIndividualQuestion(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="adminLibrary">
      <CreateQuestionModal modal={modal} setModal={setModal} />
      <ViewQuestionModal viewmodal={viewmodal} setViewModal={setViewModal} />
      <div className="libraryHeader">
        <span className="sectionName">Library</span>
        <button
          className="createQuestionButton"
          onClick={() => {
            setModal(true);
            localStorage.setItem("questionId", JSON.stringify(""));
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
                <span
                  className="libraryQuestionName"
                  onClick={() => {
                    setViewModal(true);
                  }}
                >
                  {data.questionName}
                </span>
                <span className="libraryQuestionDescription">
                  {data.questionStatement}
                </span>
                <div className="libraryQuestionDivSeperator"></div>
                <div className="libraryQuestionDivFooter">
                  <div className="libraryQuestionDivFooter-levelDiv">
                    <span
                      className="questionLevel"
                      style={{
                        color:
                          data.difficultyLevel === "hard"
                            ? "red"
                            : data.difficultyLevel === "medium"
                            ? "blue"
                            : "green",
                      }}
                    >
                      {data.difficultyLevel}
                    </span>
                    <span>Score {data.totalScoreForQuestion}</span>
                    <span>Recommended time: {data.recommendedTime}</span>
                  </div>
                  <span className="libraryQuestionDivFooter-QuestionType">
                    {data.questionType}
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
