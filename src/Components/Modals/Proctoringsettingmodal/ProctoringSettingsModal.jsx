import React, { useEffect, useState } from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBaseURL } from "../../../features/question/QuestionSlice";
import {
  addParticularTestData,
  addTestName,
} from "../../../features/Test/TestSlice";

export default function ProctoringSettingsModal(props) {
  const getbaseurl = useSelector(getBaseURL);
  const token = JSON.parse(localStorage.getItem("token"));
  const testID = JSON.parse(localStorage.getItem("testID"));

  const handleProctoringEdit = () => {
    axios
      .patch(
        `${getbaseurl}/test/edit-test`,
        {
          testId: testID,

          questionShuffling: props.questionshuffling,
          allowCopyPaste: props.disableCopypaste,
          logoutOnLeavingTestInterface: props.logoutonleaving,
          restrictTestAccessForIp: props.restrictcertainIp,

          restrictCandidatesToFullscreen: props.fullscreenmode,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("editProcto", response);
        props.setProctoringModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const dispatch = useDispatch();

  const getParticularTest = () => {
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
        dispatch(addTestName(response.data.data.testName));
        props.setQuestionShuffling(response.data.data.questionShuffling);
        props.setDisableCopyPaste(response.data.data.allowCopyPaste);
        props.setTakeSnapshots(response.data.data.takeCandidatesSnapshot);
        props.setFullScreenMode(
          response.data.data.restrictCandidatesToFullscreen
        );
        props.setLogoutOnLeaving(
          response.data.data.logoutOnLeavingTestInterface
        );
        props.setRestrictCertainIp(response.data.data.restrictTestAccessForIp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getParticularTest();
  }, []);

  console.log("heheheh", props.fullscreenmode);

  return (
    <div
      className="createQuestionModal"
      style={{ display: props.proctoringmodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createQuestionmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setProctoringModal(false);
            }}
          ></img>
          <div className="addtestcasemodal-inner-content">
            <span
              style={{
                width: "95%",
                fontSize: "22px",
                fontWeight: "500",
                marginTop: "2%",
              }}
            >
              Proctoring settings
            </span>
            <span style={{ width: "95%", fontSize: "22px", fontWeight: "500" }}>
              Set the settings that enable you to monitor candidates during the
              test
            </span>
            <div style={{ width: "95%" }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Enable random question shuffling"
                  checked={props.questionshuffling ? true : false}
                  onClick={() => {
                    props.questionshuffling
                      ? props.setQuestionShuffling(false)
                      : props.setQuestionShuffling(true);
                  }}
                />
              </FormGroup>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Disable copy and paste in the code editor from external sources"
                  checked={props.disableCopypaste ? true : false}
                  onClick={() => {
                    props.disableCopypaste
                      ? props.setDisableCopyPaste(false)
                      : props.setDisableCopyPaste(true);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Restrict candidates to the fullscreen mode during the test"
                  checked={props.fullscreenmode ? true : false}
                  onClick={() => {
                    props.fullscreenmode
                      ? props.setFullScreenMode(false)
                      : props.setFullScreenMode(true);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Logout on leaving the test interface"
                  checked={props.logoutonleaving ? true : false}
                  onClick={() => {
                    props.logoutonleaving
                      ? props.setLogoutOnLeaving(false)
                      : props.setLogoutOnLeaving(true);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Restrict test access for certain IP addresses"
                  checked={props.restrictcertainIp ? true : false}
                  onClick={() => {
                    props.restrictcertainIp
                      ? props.setRestrictCertainIp(false)
                      : props.setRestrictCertainIp(true);
                  }}
                />
              </FormGroup>
              <button
                className="publishChangesButton"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => {
                  handleProctoringEdit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
