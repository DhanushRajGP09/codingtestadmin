import React, { useEffect, useState } from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./DateTimeModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addParticularTestData,
  addTestId,
  addTestName,
  addTestStartTime,
  getTestEndTime,
} from "../../../features/Test/TestSlice";
import axios from "axios";
import { getBaseURL } from "../../../features/question/QuestionSlice";

export default function DateTimeModal(props) {
  const [value, onChange] = useState(new Date());
  console.log("starttim", value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTestStartTime(value));
    handleTestStartEndTime(value);
  }, [value]);

  const gettestendtime = useSelector(getTestEndTime);
  const getbaseurl = useSelector(getBaseURL);

  const testID = JSON.parse(localStorage.getItem("testID"));

  const token = JSON.parse(localStorage.getItem("token"));

  const handleTestStartEndTime = (value) => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,
          testStartDate: `${value?.getFullYear()}-${
            value.getMonth() < 10 ? `0${value.getMonth()}` : value.getMonth()
          }-${
            value?.getDate() < 10 ? `0${value?.getDate()}` : value.getDate()
          }`,
          testEndDate: `${gettestendtime?.getFullYear()}-${
            gettestendtime.getMonth() < 10
              ? `0${gettestendtime.getMonth()}`
              : gettestendtime.getMonth()
          }-${
            gettestendtime?.getDate() < 10
              ? `0${gettestendtime?.getDate()}`
              : gettestendtime.getDate()
          }`,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("date edited", response);
        getParticularTest();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
            <span>Test start date</span>
            <span style={{ fontWeight: "400" }}>
              NOTE: Test start date should be before the test end date
            </span>
            <DateTimePicker onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
