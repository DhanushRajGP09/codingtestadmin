import React from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import "./PublishTestModal.css";
import { getBaseURL } from "../../../features/question/QuestionSlice";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PublishTestModal(props) {
  const testID = JSON.parse(localStorage.getItem("testID"));
  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  console.log("inpublish");

  const handlePublish = () => {
    axios
      .post(
        `${getbaseurl}/test/publish-test`,
        {},
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
        console.log("test Published", response);
        props.setPublishTestModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="createQuestionModal"
      style={{ display: props.publishtestmodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createTestmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setPublishTestModal(false);
            }}
          ></img>
          <div className="publishTestModal-inner-content">
            <span>Publish test</span>
            <span>Please note the following before publishing the test:</span>
            <div className="publishtestModalNoteDiv">
              <span>
                1. Password settings and the test URL cannot be changed once the
                test is published.
              </span>
              <span>2. Do not add/remove questions once test has started</span>
              <span>
                3. We will create a practice test for you automatically. this
                will contain the same types of questions that you have added to
                your test. if you change the questions in your test after you
                publish it, the relevant changes in the practice test will be
                visible after a few minutes.
              </span>
            </div>
            <div className="publishTestButtonDiv">
              <button
                className="publishChangesButton"
                onClick={() => {
                  props.setPublished(true);

                  handlePublish();
                }}
              >
                Publish
              </button>
              <button
                className="createANewQuestionButton"
                style={{ border: "none", marginLeft: "2%", height: "50px" }}
                onClick={() => {
                  props.setPublishTestModal(false);
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
