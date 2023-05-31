import React, { useEffect, useState } from "react";
import "./SelectQuestions.css";
import {
  addIndividualQuestion,
  addLibraryQuestions,
  getBaseURL,
  getLibraryQuestions,
  getQuestionID,
} from "../../features/question/QuestionSlice";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import axios from "axios";

import blankcheckbox from "../../Assets/Icons/blank-check-box.png";
import checkbox from "../../Assets/Icons/check (1).png";
import {
  addParticularTestData,
  addSelectedQuestionId,
  addTestId,
  addTestName,
  getParticularTestData,
  getSelectedMultipleQuestions,
  getSelectedQuestionId,
  moveSelectedQuestionId,
  removeFromSelectedQuestionId,
} from "../../features/Test/TestSlice";
import { useNavigate } from "react-router";

export default function SelectQuestions() {
  const getlibraryquestions = useSelector(getLibraryQuestions);
  console.log("libQuesti", getlibraryquestions);
  const getbaseurl = useSelector(getBaseURL);
  const getselectedquestionid = useSelector(getSelectedQuestionId);

  console.log("selectedquestionidinsel", getselectedquestionid);

  const getselectedmultiplequestion = useSelector(getSelectedMultipleQuestions);
  console.log("gegeg", getselectedmultiplequestion);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [questionIds, setQuestionIds] = useState([]);

  const testID = JSON.parse(localStorage.getItem("testID"));
  const getParticularTest = () => {
    dispatch(addTestId(testID));
    axios
      .get(
        `${getbaseurl}/test/view-test`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            testId: testID,
          },
        }
      )
      .then(function (response) {
        dispatch(addParticularTestData(response.data.data));
        dispatch(addTestName(response.data.data.testName));
        dispatch(
          moveSelectedQuestionId(response.data.data.testDetails.questionId)
        );
        setQuestionIds(response.data.data.testDetails.questionId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getParticularTest();
  }, []);

  const getparticulartestdata = useSelector(getParticularTestData);
  console.log("getparticulardatainselectdat", getparticulartestdata);

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

  const token = JSON.parse(localStorage.getItem("token"));

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

  const handleTestQuestionIds = (array) => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,
          questionId: array,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("questions id edited", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleQuestionIds = (id) => {
    let addarray = getselectedquestionid;
    let newarray = [];
    newarray.push(id);
    addarray = addarray.concat(newarray);
    console.log("array addi", addarray, newarray);
    handleTestQuestionIds(addarray);
  };

  const removeHandleQuestionIds = (id) => {
    let array = getselectedquestionid;
    array = array.filter((item) => item !== id);
    console.log("this is arra", array);
    handleTestQuestionIds(array);
  };

  return (
    <div className="selectQuestionsMain">
      <div className="libraryHeader">
        <span className="sectionName">
          Library > <span>{getparticulartestdata.testName} test</span>
        </span>
        <button className="createQuestionButton">
          Add selected 1 question to test
        </button>

        <button
          className="saveAsDraftButton"
          onClick={() => {
            navigate("/home/assesments/testcreated");
          }}
          style={{ width: "150px", marginRight: "2%" }}
        >
          Back to test
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
                {getparticulartestdata?.testDetails?.questionId?.includes(
                  data._id
                ) ? (
                  <img
                    className="checkboxImage"
                    src={checkbox}
                    style={{ cursor: "pointer" }}
                    id={`option${index}`}
                    onClick={() => {
                      document.getElementById(`option${index}`).src =
                        blankcheckbox;
                      console.log("clicking");
                      dispatch(removeFromSelectedQuestionId(data._id));
                      removeHandleQuestionIds(data._id);
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
                        console.log("hihi");
                        dispatch(addSelectedQuestionId(data._id));
                        handleQuestionIds(data._id);
                        if (
                          document.getElementById(`option${index}`).src ===
                          checkbox
                        ) {
                        }
                      } else {
                        setVisible("false");
                        document.getElementById(`option${index}`).src =
                          checkbox;
                        dispatch(removeFromSelectedQuestionId(data._id));
                        handleQuestionIds();
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
                    <span className="libraryQuestionName">
                      {data.questionName}
                    </span>

                    {data.questionPublished ? (
                      getparticulartestdata?.testDetails?.questionId?.includes(
                        data._id
                      ) ? (
                        <span
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            handleTestQuestionIds();
                          }}
                        >
                          Remove from test
                        </span>
                      ) : (
                        <span style={{ color: "blue", cursor: "pointer" }}>
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
