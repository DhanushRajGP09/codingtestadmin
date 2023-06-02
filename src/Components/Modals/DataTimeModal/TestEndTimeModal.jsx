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
  addTestEndTime,
  addTestId,
  addTestName,
  addTestStartTime,
  getTestStartTime,
} from "../../../features/Test/TestSlice";
import { getBaseURL } from "../../../features/question/QuestionSlice";
import axios from "axios";

export default function TestEndTimeModal(props) {
  const [value, onChange] = useState(new Date());
  console.log("EndTime", value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTestEndTime(value));
    handleTestStartEndTime(value);
  }, [value]);

  const getteststarttime = useSelector(getTestStartTime);
  const getbaseurl = useSelector(getBaseURL);

  const testID = JSON.parse(localStorage.getItem("testID"));

  const token = JSON.parse(localStorage.getItem("token"));

  const handleTestStartEndTime = (value) => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,
          testStartDate: `${getteststarttime?.getFullYear()}-${
            getteststarttime.getMonth() < 10
              ? `0${getteststarttime.getMonth()}`
              : getteststarttime.getMonth()
          }-${
            getteststarttime?.getDate() < 10
              ? `0${getteststarttime?.getDate()}`
              : getteststarttime.getDate()
          }`,
          testEndDate: `${value?.getFullYear()}-${
            value.getMonth() < 10 ? `0${value.getMonth()}` : value.getMonth()
          }-${
            value?.getDate() < 10 ? `0${value?.getDate()}` : value.getDate()
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
            <span>Test End date</span>
            <span style={{ fontWeight: "400" }}>
              NOTE: Test end date should be upcoming dates after the test start
              date
            </span>
            <DateTimePicker onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
