import React, { useState } from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import "./EditTestDurationModal.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addTestDurationHour,
  addTestDurationMinutes,
  getTestHour,
  getTestMinutes,
} from "../../../features/Test/TestSlice";
import { getBaseURL } from "../../../features/question/QuestionSlice";

export default function EditTestDurationModal(props) {
  const [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(addTestDurationHour(hour));
    dispatch(addTestDurationMinutes(minutes));
    props.setEditTestModal(false);
  };
  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);
  const gettesthour = useSelector(getTestHour);
  const gettestminutes = useSelector(getTestMinutes);

  const testID = JSON.parse(localStorage.getItem("testID"));

  const handleTestDuration = () => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,
          testDuration: `${hour}:${minutes}:00`,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("duration edited", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="EditDurationModal"
      style={{ display: props.edittestmodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="EditDurationmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setEditTestModal(false);
            }}
          ></img>
          <div className="EditTestModal-inner-content">
            <span>Test duration</span>
            <span>Recommended test duration: 50min</span>
            <div className="hourminInputDiv">
              <div className="hourInputDiv">
                <span>Hours (HH)</span>
                <input
                  className="testHourInput"
                  value={hour}
                  onChange={(e) => {
                    setHour(e.target.value);
                  }}
                  maxLength={2}
                ></input>
              </div>
              <div
                style={{
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexDirection: "column",

                  height: "100%",
                  width: "10%",
                }}
              >
                :
              </div>
              <div className="hourInputDiv">
                <span>Minutes (MM)</span>
                <input
                  className="testHourInput"
                  value={minutes}
                  onChange={(e) => {
                    setMinutes(e.target.value);
                  }}
                  maxLength={2}
                ></input>
              </div>
            </div>
            <div className="saveDurationButtonDiv">
              <button
                className="saveTestDurationButton"
                onClick={() => {
                  handleSave();
                  handleTestDuration();
                  props.setTestDuration(`${hour}:${minutes}:00`);
                }}
              >
                Save
              </button>
              <button
                className="cancelTestDurationButton"
                onClick={() => {
                  props.setEditTestModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
