import React, { useState } from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import "./EditTestDurationModal.css";
import { useDispatch } from "react-redux";
import {
  addTestDurationHour,
  addTestDurationMinutes,
} from "../../../features/Test/TestSlice";

export default function EditTestDurationModal(props) {
  const [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(addTestDurationHour(hour));
    dispatch(addTestDurationMinutes(minutes));
    props.setEditTestModal(false);
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
