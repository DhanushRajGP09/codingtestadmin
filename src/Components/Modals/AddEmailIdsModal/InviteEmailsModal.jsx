import React from "react";
import "./InviteEmailModal.css";
import close from "../../../Assets/Icons/closemodal2.png";

export default function InviteEmailsModal(props) {
  return (
    <div
      className="createQuestionModal"
      style={{ display: props.inviteemailsmodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createTestmodal-content">
          <img
            src={close}
            className="closeInviteEmailsQuestionModal"
            onClick={() => {
              props.setInviteEmailsModal(false);
            }}
          ></img>
          <div className="InviteEmails-inner-content">
            <span style={{ fontSize: "27px" }}>Candidate details</span>
            <span style={{ fontWeight: "400" }}>
              Enter candidate's details in the following format: Email ID First
              name Last name.
            </span>
            <span>
              Note:
              <span style={{ fontWeight: "400" }}>
                {" "}
                Email IDs of candidates are mandatory. the email ID, first name,
                and last name must be separated by a space. Multiple candidate's
                details must be seperated by a new line.
              </span>
            </span>
            <textarea className="candidatesDetailsTextArea"></textarea>
            <div className="saveCandidatesButtonDiv">
              <button className="saveCandidateButton">Save and proceed</button>
              <button
                className="CancelButton"
                onClick={() => {
                  props.setInviteEmailsModal(false);
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
