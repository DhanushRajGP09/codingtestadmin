import React, { useEffect, useState } from "react";
import "./TestCaseModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import switchoff from "../../../Assets/Icons/Switch off.png";
import switchon from "../../../Assets/Icons/Switch on.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestCases,
  getBaseURL,
  getQuestionID,
  getTestCases,
} from "../../../features/question/QuestionSlice";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export default function TestCaseModal(props) {
  const [checked, setChecked] = React.useState(false);
  const getbaseurl = useSelector(getBaseURL);
  const dispatch = useDispatch();

  const gettestcases = useSelector(getTestCases);
  console.log("gettestcasesmodal", gettestcases);

  const id = nanoid();
  console.log("id", id);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [score, setScore] = useState("");
  const [visible, setVisible] = useState("false");
  const [explanation, setExplanation] = useState("");
  const [testcases, setTestCases] = useState([]);

  const handleSave = () => {
    getAllTestCases();
    props.setAddTestCaseModal(false);
  };

  const getquestionid = useSelector(getQuestionID);
  console.log("questionID", getquestionid);

  const token = JSON.parse(localStorage.getItem("token"));

  const getAllTestCases = () => {
    axios
      .get(
        `${getbaseurl}/question/get-all-test-case`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            questionId: getquestionid,
          },
        }
      )
      .then(function (response) {
        console.log("alltestcases", response);
        setTestCases(response.data.data);
        dispatch(addTestCases(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTestCases();
  }, []);

  const handleSampleInput = () => {
    console.log("testcase", getquestionid);

    axios
      .post(
        `${getbaseurl}/question/add-testcase`,
        {
          input: input,
          output: output,
          score: score,
          visibility: visible,
          explaination: explanation,
          questionId: getquestionid,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("testcase", response);
        handleSave();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="createQuestionModal"
      style={{ display: props.addtestcasemodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createQuestionmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setAddTestCaseModal(false);
            }}
          ></img>
          <div className="addtestcasemodal-inner-content">
            <div className="addTestCaseHeader">
              <span style={{ fontWeight: "500", fontSize: "25px" }}>
                Add new test case
              </span>
              <div className="visibilityTestCaseDiv">
                <span>Visible to candidates</span>
                {visible === "true" ? (
                  <img
                    src={switchon}
                    style={{ cursor: "pointer" }}
                    id={`option`}
                    onClick={() => {
                      if (document.getElementById(`option`).src === switchon) {
                        document.getElementById(`option`).src = switchoff;
                        setVisible("false");
                        if (
                          document.getElementById(`option`).src === switchoff
                        ) {
                          console.log("id");
                        }
                      } else {
                        setVisible("true");
                        document.getElementById(`option`).src = switchon;
                      }
                    }}
                  ></img>
                ) : (
                  <img
                    src={switchoff}
                    style={{ cursor: "pointer" }}
                    id={`option`}
                    onClick={() => {
                      if (document.getElementById(`option`).src === switchoff) {
                        document.getElementById(`option`).src = switchon;
                        setVisible("true");
                        if (
                          document.getElementById(`option`).src === switchon
                        ) {
                        }
                      } else {
                        setVisible("false");
                        document.getElementById(`option`).src = switchoff;
                      }
                    }}
                  ></img>
                )}
              </div>
            </div>
            <div className="testCaseAddInOutDiv">
              <div className="testCaseAddInDiv">
                <span>Add input</span>
                <textarea
                  className="testCaseAddInInput"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="testCaseAddInDiv">
                <span>Add output</span>
                <textarea
                  className="testCaseAddInInput"
                  onChange={(e) => {
                    setOutput(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="testCaseScoreDiv">
              <span>Maximum score</span>
              <input
                className="individualTestCaseInput"
                onChange={(e) => {
                  setScore(e.target.value);
                }}
              ></input>
            </div>
            <div className="testCaseScoreDiv">
              <span>Explanation</span>
              <textarea
                className="testCaseAddInInput"
                onChange={(e) => {
                  setExplanation(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="testCaseIndividualSave">
              <button
                className="testCaseIndividualSaveButton"
                onClick={() => {
                  handleSampleInput();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
