import React, { useEffect } from "react";
import "./TestCreatedInvited.css";
import blankcheckbox from "../../Assets/Icons/blank-check-box.png";
import checkbox from "../../Assets/Icons/check (1).png";
import { useDispatch, useSelector } from "react-redux";
import { getBaseURL } from "../../features/question/QuestionSlice";
import {
  addParticularTestData,
  addTestName,
  getParticularTestData,
} from "../../features/Test/TestSlice";
import axios from "axios";

export default function TestCreatedInvited() {
  const array = [
    {
      candidateEmail: "gdhanush68@gmail.com",
      candidateName: "Dhanush Raj G P",
      candidateStatus: "Shortlisted",
      expiryDate: "expiry date",
      invitedOn: "Mar 24, 2023 12:54PM IST",
      invitedBy: "karthik@robosoftin.com",
      emailStatus: "Opened",
    },
    {
      candidateEmail: "RakshithRaj@gmail.com",
      candidateName: "Rakshith",
      candidateStatus: "Shortlisted",
      expiryDate: "expiry date",
      invitedOn: "Mar 24, 2023 12:54PM IST",
      invitedBy: "karthik@robosoftin.com",
      emailStatus: "Opened",
    },
  ];

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
        dispatch(addTestName(response.data.data.testDetails.testName));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getparticulartestdata = useSelector(getParticularTestData);
  console.log("getparticulard", getparticulartestdata);

  const testID = JSON.parse(localStorage.getItem("testID"));

  const token = JSON.parse(localStorage.getItem("token"));

  const getbaseurl = useSelector(getBaseURL);

  useEffect(() => {
    getParticularTest();
  }, []);
  return (
    <>
      <div className="invitedCandidatesRightContainer">
        {" "}
        <h2>Invited candidates</h2>
        <span>
          {array.length} candidates invited to take test | 0 candidates have not
          taken the test yet
        </span>
        <div className="invitedCandidatesTableMain">
          <div className="invitedCandidatesTableHeader">
            <div className="invitedCandidatesTableHeaderCheckbox">
              <img
                src={blankcheckbox}
                className="checkboxImage"
                id={`invitedcandidates`}
                onClick={() => {
                  if (
                    document.getElementById(`invitedcandidates`).src ===
                    blankcheckbox
                  ) {
                    document.getElementById(`invitedcandidates`).src = checkbox;
                  } else {
                    document.getElementById(`invitedcandidates`).src =
                      blankcheckbox;
                  }
                }}
              ></img>{" "}
            </div>
            <div className="invitedCandidatesTableHeaderNumber">#</div>
            <div className="invitedCandidatesTableHeaderEmail">
              Candidate email
            </div>
            <div className="invitedCandidatesTableHeaderName">
              Candidate Name
            </div>
            <div className="invitedCandidatesTableHeaderStatus">Status</div>
            <div className="invitedCandidatesTableHeaderStatus">
              Expiry date
            </div>
            <div className="invitedCandidatesTableHeaderInvitedon">
              Invited on
            </div>
            <div className="invitedCandidatesTableHeaderEmail">Invited by</div>
            <div className="invitedCandidatesTableHeaderStatus">
              Email status
            </div>
          </div>
          {array.map((data, index) => {
            return (
              <div className="invitedCandidatesTableBody">
                <div className="invitedCandidatesTableHeaderCheckbox">
                  <img
                    src={blankcheckbox}
                    className="checkboxImage"
                    id={`invitedcandidates${index}`}
                    onClick={() => {
                      if (
                        document.getElementById(`invitedcandidates${index}`)
                          .src === blankcheckbox
                      ) {
                        document.getElementById(
                          `invitedcandidates${index}`
                        ).src = checkbox;
                      } else {
                        document.getElementById(
                          `invitedcandidates${index}`
                        ).src = blankcheckbox;
                      }
                    }}
                  ></img>{" "}
                </div>
                <div className="invitedCandidatesTableHeaderNumber">
                  {index + 1}
                </div>
                <div className="invitedCandidatesTableHeaderEmail">
                  {data.candidateEmail}
                </div>
                <div className="invitedCandidatesTableHeaderName">
                  {data.candidateName}
                </div>
                <div className="invitedCandidatesTableHeaderStatus">
                  {data.candidateStatus}
                </div>
                <div className="invitedCandidatesTableHeaderStatus">
                  {data.expiryDate}
                </div>
                <div className="invitedCandidatesTableHeaderInvitedon">
                  {data.invitedOn}
                </div>
                <div className="invitedCandidatesTableHeaderEmail">
                  {data.invitedBy}
                </div>
                <div
                  className="invitedCandidatesTableHeaderStatus"
                  style={{
                    color: data.emailStatus === "Opened" ? "green" : "blue",
                  }}
                >
                  {data.emailStatus}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
