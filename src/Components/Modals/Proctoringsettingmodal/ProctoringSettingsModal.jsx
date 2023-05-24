import React from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ProctoringSettingsModal(props) {
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
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Disable copy and paste in the code editor from external sources"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Restrict candidates to the fullscreen mode during the test"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Logout on leaving the test interface"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Restrict test access for certain IP addresses"
                />
              </FormGroup>
              <button
                className="publishChangesButton"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={() => {}}
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
