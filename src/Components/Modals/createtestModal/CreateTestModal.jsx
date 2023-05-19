import React, { useState } from "react";
import "./CreateTestModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import test from "../../../Assets/Icons/test.png";

import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router";
import axios from "axios";
import { getBaseURL } from "../../../features/question/QuestionSlice";
import { useSelector } from "react-redux";

export default function CreateTestModal(props) {
  const [value, setValue] = React.useState("manually");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [testName, setTestName] = useState("Trainee software test");

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("increatetest");

  const getbaseurl = useSelector(getBaseURL);
  const handleCreateTest = async () => {
    axios
      .post(
        `${getbaseurl}/test/test-creation`,
        { testName: testName },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("createTest", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="createQuestionModal"
      style={{ display: props.createtestmodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createTestmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setCreateTestModal(false);
            }}
          ></img>
          <div className="CreateTestModal-inner-content ">
            <img src={test} className="testImg"></img>
            <div className="createTestJobRoleDiv">
              <span>Select the job role</span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "gray",
                }}
              >
                The role you select is used to create a relevant test
              </span>
              <div className="createTestJobRoleSelect">
                <select
                  className="functionNameInput"
                  onChange={(e) => {
                    setTestName(e.target.value);
                  }}
                >
                  <option>trainee software engineer</option>
                  <option>a</option>
                  <option>b</option>
                  <option>c</option>
                </select>
              </div>
              <span style={{ marginTop: "3%" }}>Add questions</span>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="manually"
                    control={<Radio />}
                    label="Manually (Custom test)"
                  />
                </RadioGroup>
              </FormControl>
              <button
                className="publishChangesButton"
                style={{ marginTop: "10%" }}
                onClick={() => {
                  props.setCreateTestModal(false);
                  navigate("/home/assesments/testcreated");
                  handleCreateTest();
                }}
              >
                Create test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
