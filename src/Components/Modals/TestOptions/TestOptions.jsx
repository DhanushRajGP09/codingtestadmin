import React from "react";
import "./TestOptions.css";
import close from "../../../Assets/Icons/closemodal2.png";
import { getBaseURL } from "../../../features/question/QuestionSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";

export default function TestOptions(props) {
  const getbaseurl = useSelector(getBaseURL);
  const token = JSON.parse(localStorage.getItem("token"));
  const testID = JSON.parse(localStorage.getItem("testID"));

  const navigate = useNavigate();

  const handleDeleteTest = () => {
    axios
      .delete(
        `${getbaseurl}/test/delete-test`,

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
        console.log("deletedtest", response);

        navigate("/home/assesments");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClone = () => {
    axios
      .post(
        `${getbaseurl}/test/clone-test`,
        {
          testId: testID,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("test cloned", response);
        navigate("/home/assesments");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="TestOptionsModal"
      style={{ display: props.testoptionsmodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="TestOptionsmodal-content">
          <div className="TestOptionsModal-inner-content">
            <div
              className="TestOptionsButton"
              onClick={() => {
                handleDeleteTest();
              }}
            >
              Delete test
            </div>
            <div
              className="TestOptionsButton"
              onClick={() => {
                handleClone();
              }}
            >
              Clone test
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
