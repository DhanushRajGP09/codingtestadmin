import React, { useEffect, useState } from "react";
import "./Library.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import search from "../../Assets/Icons/search (1).png";
import CreateQuestionModal from "../Modals/createQuestionModal/CreateQuestionModal";
import { useSelector } from "react-redux";

import blankcheckbox from "../../Assets/Icons/blank-check-box.png";
import checkbox from "../../Assets/Icons/check (1).png";
import parse from "html-react-parser";
import {
  addIndividualQuestion,
  addLibraryQuestions,
  getBaseURL,
  getLibraryQuestions,
  getQuestionID,
} from "../../features/question/QuestionSlice";
import ViewQuestionModal from "../Modals/viewQuestionModal/ViewQuestionModal";
import { useNavigate } from "react-router";

import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addSelectedMultipleQuestionId,
  addSelectedQuestionData,
  addSelectedQuestionId,
  clearSelectedQuestionData,
  getSelectedMultipleQuestions,
  getSelectedQuestionId,
  removeFromSelectedMultipleQuestionId,
  removeFromSelectedQuestionId,
} from "../../features/Test/TestSlice";

export default function Library() {
  const [modal, setModal] = useState(false);

  const getlibraryquestions = useSelector(getLibraryQuestions);
  console.log("libQuestion", getlibraryquestions);

  const [viewmodal, setViewModal] = useState(false);
  const navigate = useNavigate();

  const getquestionid = useSelector(getQuestionID);
  console.log("questionI", getquestionid);

  const getselectedquestionid = useSelector(getSelectedQuestionId);
  console.log("selectedquesti", getselectedquestionid);

  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = useState(false);

  const handleChange = (index) => {
    if (document.getElementById(`question${index}`).checked === false) {
      document.getElementById(`question${index}`).checked = true;
    } else {
      document.getElementById(`question${index}`).checked = false;
    }
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const dispatch = useDispatch();
  const getbaseurl = useSelector(getBaseURL);

  const getAllTestQuestions = () => {
    axios
      .get(
        `${getbaseurl}/question`,

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

  console.log("in library");

  const handleQuestionClick = (id) => {
    axios
      .get(
        `${getbaseurl}/question/get-perticular-question`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            itemsPerPage: 1,
            page: 1,
            questionId: id,
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

  const handleDeleteQuestion = (id) => {
    axios
      .delete(
        `${getbaseurl}/question/language`,

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
        console.log("deleted", response);
        getAllTestQuestions();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [search, setSearch] = useState("");
  const [difficultylevel, setDifficultyLevel] = useState("");
  const handleSearch = (val, filter) => {
    console.log("search", search);

    axios
      .post(
        `${getbaseurl}/question/search-questions`,
        {},

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            searchText: val,
            sortBy: "",
            filterBy: filter,
          },
        }
      )
      .then(function (response) {
        console.log("searchapi", response);
        dispatch(addLibraryQuestions(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleData = (id) => {
    axios
      .get(
        `${getbaseurl}/question/get-perticular-question`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            itemsPerPage: 1,
            page: 1,
            questionId: id,
          },
        }
      )
      .then(function (response) {
        console.log("data added", response);
        dispatch(addSelectedQuestionData(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeHandleQuestionsData = (id) => {
    dispatch(clearSelectedQuestionData());
    for (let item of getselectedquestionid) {
      if (item !== id) {
        handleData(item);
      }
    }
  };

  const getselectedmultiplequestion = useSelector(getSelectedMultipleQuestions);
  console.log("gegegegeg", getselectedmultiplequestion);

  return (
    <div className="adminLibrary">
      <CreateQuestionModal
        modal={modal}
        setModal={setModal}
        getAllTestQuestions={getAllTestQuestions}
      />
      <ViewQuestionModal
        viewmodal={viewmodal}
        setViewModal={setViewModal}
        getAllTestQuestions={getAllTestQuestions}
        handleQuestionClick={handleQuestionClick}
      />
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
        <div className="libraryQuestionsContainer">
          <div className="libraryQuestionsContainerHeader">
            <span>Questions ({getlibraryquestions.length})</span>
            <div className="libraryQuestionsSearch">
              <input
                className="libraryQuestionsSearchInput"
                placeholder="search for topics,problem title or problem description"
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value, "");
                }}
              ></input>
              <div
                className="searchIcon"
                alt="search"
                onClick={() => {
                  handleSearch(search);
                }}
              >
                Search
              </div>
            </div>
            <div className="libraryQuestionsSort">
              <select
                className="functionNameInput"
                onChange={(e) => {
                  handleSearch(search, e.target.value);
                }}
              >
                <option>Filter by</option>
                <option>easy</option>
                <option>medium</option>
                <option>hard</option>
              </select>
            </div>
          </div>
          {getlibraryquestions.map((data, index) => {
            return (
              <div className="libraryQuestionContainer">
                {getselectedmultiplequestion.includes(data._id) ? (
                  <img
                    className="checkboxImage"
                    src={checkbox}
                    style={{ cursor: "pointer" }}
                    id={`option${index}`}
                    onClick={() => {
                      dispatch(removeFromSelectedMultipleQuestionId(data._id));
                      document.getElementById(`option${index}`).src =
                        blankcheckbox;
                    }}
                  ></img>
                ) : (
                  <img
                    className="checkboxImage"
                    src={blankcheckbox}
                    style={{ cursor: "pointer" }}
                    id={`option${index}`}
                    onClick={() => {
                      if (
                        document.getElementById(`option${index}`).src ===
                        blankcheckbox
                      ) {
                        document.getElementById(`option${index}`).src =
                          checkbox;
                        dispatch(addSelectedMultipleQuestionId(data._id));

                        if (
                          document.getElementById(`option${index}`).src ===
                          checkbox
                        ) {
                        }
                      } else {
                        setVisible("false");
                        document.getElementById(`option${index}`).src =
                          blankcheckbox;
                        dispatch(
                          removeFromSelectedMultipleQuestionId(data._id)
                        );
                      }
                    }}
                  ></img>
                )}
                <div className="libraryQuestionDiv">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "98%",
                    }}
                  >
                    <span
                      className="libraryQuestionName"
                      onClick={() => {
                        setViewModal(true);
                        handleQuestionClick(data._id);
                      }}
                    >
                      {data.questionName}
                    </span>
                    {data.questionPublished ? (
                      getselectedquestionid.includes(data._id) ? (
                        <span
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            dispatch(removeFromSelectedQuestionId(data._id));
                            removeHandleQuestionsData(data._id);
                          }}
                        >
                          Remove from test
                        </span>
                      ) : (
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => {
                            dispatch(addSelectedQuestionId(data._id));
                            handleData(data._id);
                          }}
                        >
                          Add to test
                        </span>
                      )
                    ) : (
                      <div>
                        <span style={{ color: "red" }}>draft</span>
                      </div>
                    )}
                  </div>

                  <span className="libraryQuestionDescription">
                    {parse(data.questionStatement)}
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
                    {/* <span
                    onClick={() => {
                      handleDeleteQuestion(data._id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    delete
                  </span> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
