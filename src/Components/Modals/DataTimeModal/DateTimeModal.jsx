import React, { useEffect, useState } from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./DateTimeModal.css";
import { useDispatch } from "react-redux";
import { addTestStartTime } from "../../../features/Test/TestSlice";

export default function DateTimeModal(props) {
  const [value, onChange] = useState(new Date());
  console.log("starttim", value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTestStartTime(value));
  }, [value]);

  return (
    <div
      className="DateTimeModal"
      style={{ display: props.datetimemodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="DateTimemodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setDateTimeModal(false);
            }}
          ></img>
          <div className="DateTimeModal-inner-content">
            <span>Test start time</span>
            <DateTimePicker onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
