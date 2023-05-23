import React, { useEffect, useState } from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./DateTimeModal.css";
import { useDispatch } from "react-redux";
import {
  addTestEndTime,
  addTestStartTime,
} from "../../../features/Test/TestSlice";

export default function TestEndTimeModal(props) {
  const [value, onChange] = useState(new Date());
  console.log("EndTime", value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTestEndTime(value));
  }, [value]);

  return (
    <div
      className="DateTimeModal"
      style={{ display: props.endtimemodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="DateTimemodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setEndTimeModal(false);
            }}
          ></img>
          <div className="DateTimeModal-inner-content">
            <span>Test End time</span>
            <DateTimePicker onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
