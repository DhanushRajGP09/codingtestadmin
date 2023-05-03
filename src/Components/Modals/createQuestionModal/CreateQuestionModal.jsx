import React, { useEffect, useState } from "react";
import "./CreateQuestionModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import Description from "../../Description/Description";
import { Routes, Route, useNavigate } from "react-router";
import SolutionTest from "../../SolutionTest/SolutionTest";
import Languages from "../../Languages/Languages";
import { useDispatch, useSelector } from "react-redux";
import {
  addProblemDescription,
  addProblemDifficulty,
  addProblemName,
  addQuestionId,
  getBaseURL,
  getProblemDescription,
  getProblemDifficulty,
  getProblemName,
  getQuestionID,
  getSampleExplaination,
  getSampleInput,
  getSampleOutput,
  getTotalScore,
} from "../../../features/question/QuestionSlice";
import axios from "axios";

export default function CreateQuestionModal(props) {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [solutionactive, setSolutionActive] = useState(false);
  const [languageActive, setLanguageActive] = useState(false);
  const [prevbutton, setPrevButton] = useState(false);
  const [nextbutton, setNextButton] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/home/Solution") {
      setPrevButton(true);
      setNextButton(true);
    } else if (window.location.pathname === "/home/Languages") {
      setPrevButton(true);
      setNextButton(false);
    } else {
      setPrevButton(false);
      setNextButton(true);
    }
  });

  const initialid = JSON.parse(localStorage.getItem("questionId"));

  const handleNext = () => {
    if (window.location.pathname === "/home") {
      if (initialid === "") {
        handleCreateQuestion();
      } else {
        handleEditDescription();
      }
    } else if (window.location.pathname === "/home/Solution") {
      handleSampleInput();
    }
  };

  const handlePrev = () => {
    if (window.location.pathname === "/home/Languages") {
      navigate("/home/Solution");
      setSolutionActive(true);
      setActive(false);
      setLanguageActive(false);
    } else if (window.location.pathname === "/home/Solution") {
      navigate("/home");
      setSolutionActive(false);
      setActive(true);
      setLanguageActive(false);
    }
  };

  const getproblemname = useSelector(getProblemName);
  const getproblemdescription = useSelector(getProblemDescription);
  const getproblemdifficulty = useSelector(getProblemDifficulty);

  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  // const handleCreateQuestion = async () => {
  //   let result = await fetch(
  //     "http://139.59.56.122:5000/api/question/description",
  //     {
  //       method: "post",
  //       body: JSON.stringify({
  //         questionName: getproblemname,
  //         questionStatement: getproblemdescription,
  //         difficultyLevel: getproblemdifficulty,
  //       }),
  //       headers: {
  //         "Content-Type": "application/JSON",
  //         Authorization: `${token}`,
  //       },
  //     }
  //   );
  //   result = await result.json();
  //   console.warn(result);
  //   if (result) {
  //     navigate("/home/Solution");
  //   } else {
  //     alert("Please enter the correct details");
  //   }
  // };

  console.log("desch");
  const handleCreateQuestion = async () => {
    console.log(
      "data",
      getproblemname,
      getproblemdescription,
      getproblemdifficulty
    );
    axios
      .post(
        `${getbaseurl}/question/description`,
        {
          questionName: getproblemname,
          questionStatement: getproblemdescription,
          difficultyLevel: getproblemdifficulty,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("desc", response);
        dispatch(addQuestionId(response.data.data.questionId));
        localStorage.setItem(
          "questionId",
          JSON.stringify(response.data.data.questionId)
        );
        setSolutionActive(true);
        setActive(false);
        setLanguageActive(false);
        navigate("/home/Solution");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getsampleinput = useSelector(getSampleInput);
  const getsampleoutput = useSelector(getSampleOutput);
  const getsampleexplaination = useSelector(getSampleExplaination);
  const getquestionid = useSelector(getQuestionID);

  const handleSampleInput = () => {
    console.log(
      "sampledata",
      getquestionid,
      getsampleinput,
      getsampleoutput,
      getsampleexplaination
    );

    axios
      .post(
        `${getbaseurl}/question/add-testcase`,
        {
          input: getsampleinput,
          output: getsampleoutput,
          explaination: getsampleexplaination,
          questionId: getquestionid,
          score: "1",
          visibility: "true",
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("sampleinputoutput", response);
        navigate("/home/Languages");
        setSolutionActive(false);
        setActive(false);
        setLanguageActive(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEditDescription = () => {
    axios
      .patch(
        `${getbaseurl}/question/description`,
        {
          questionName: getproblemname,
          questionStatement: getproblemdescription,
          difficultyLevel: getproblemdifficulty,
          questionId: initialid,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("edited", response);
        setSolutionActive(true);
        setActive(false);
        setLanguageActive(false);
        navigate("/home/Solution");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlepublish = () => {
    axios
      .post(
        `${getbaseurl}/question/publish-question`,
        {
          questionId: initialid,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            questionId: initialid,
          },
        }
      )
      .then(function (response) {
        console.log("published", response);
        props.setModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                {prevbutton ? (
                  <button
                    className="prevButton"
                    onClick={() => {
                      handlePrev();
                    }}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
                {nextbutton ? (
                  <button
                    className="nextButton"
                    onClick={() => {
                      handleNext();
                    }}
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="createQuestionmodalFooterSavePublishDiv">
                <button
                  className="saveAsDraftButton"
                  onClick={() => {
                    props.setModal(false);
                    props.getAllTestQuestions();
                  }}
                >
                  Save as draft
                </button>
                <button
                  className="publishChangesButton"
                  onClick={() => {
                    handlepublish();
                    props.getAllTestQuestions();
                  }}
                >
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
