import React from "react";
import "./CreateTestModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import test from "../../../Assets/Icons/test.png";

import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router";

export default function CreateTestModal(props) {
  const [value, setValue] = React.useState("manually");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();
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
                <select className="functionNameInput">
                  <option>trainee software engineer</option>
                  <option>a</option>
                  <option>b</option>
                  <option>c</option>
                </select>
              </div>
              <button className="editQuestionButton">Create new role</button>
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
