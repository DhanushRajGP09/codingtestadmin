import React from "react";
import close from "../../../Assets/Icons/closemodal2.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function EmailAndReportSettings(props) {
  return (
    <div
      className="createQuestionModal"
      style={{ display: props.emailreportmodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createQuestionmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setEmailReportModal(false);
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
              Email and Report settings
            </span>

            <div style={{ width: "95%" }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Receive a report after a candidate completes the test"
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
