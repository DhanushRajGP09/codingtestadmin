import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addParticularTestData,
  addTestName,
  getParticularTestData,
  getTestName,
} from "../../../features/Test/TestSlice";
import blankcheckbox from "../../../Assets/Icons/blank-check-box.png";
import checkbox from "../../../Assets/Icons/check (1).png";
import {
  addToStudentReviewSelected,
  clearReviewSelected,
  filterReviewSelected,
  getReviewSelected,
} from "../../../features/StudentInvited/StudentInvitedSlice";
import { getBaseURL } from "../../../features/question/QuestionSlice";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ReviewpendingTable() {
  const gettestname = useSelector(getTestName);

  const array = [
    {
      candidateName: "abcd",
      candidateEmail: "abcd@gmail.com",
      finishedAt: "Aug 04, 2022 01:02PM IST",
      score: "16",
      interviewDetails: "asdas",
      attempt: "85%",
      duration: "90 min",
      _id: "123",
    },
    {
      candidateName: "bcde",
      candidateEmail: "bcde@gmail.com",
      finishedAt: "Aug 04, 2022 01:15PM IST",
      score: "11",
      interviewDetails: "asdas",
      attempt: "57%",
      duration: "80 min",
      _id: "133",
    },
    {
      candidateName: "abcd",
      candidateEmail: "abcd@gmail.com",
      finishedAt: "Aug 04, 2022 01:02PM IST",
      score: "16",
      interviewDetails: "asdas",
      attempt: "85%",
      duration: "90 min",
      _id: "213",
    },
    {
      candidateName: "bcde",
      candidateEmail: "bcde@gmail.com",
      finishedAt: "Aug 04, 2022 01:15PM IST",
      score: "11",
      interviewDetails: "asdas",
      attempt: "57%",
      duration: "80 min",
      _id: "223",
    },
    {
      candidateName: "bcde",
      candidateEmail: "bcde@gmail.com",
      finishedAt: "Aug 04, 2022 01:15PM IST",
      score: "11",
      interviewDetails: "asdas",
      attempt: "57%",
      duration: "80 min",
      _id: "253",
    },
  ];

  const getSelected = useSelector(getReviewSelected);
  console.log("reviewselected", getSelected);

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

  const handleselectAll = () => {
    for (let item of array) {
      dispatch(addToStudentReviewSelected(item._id));
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getParticularTest();
  }, []);
  return (
    <>
      <span className="reviewPendingRightContainerRoutes">
        All Tests > {gettestname} > Review pending
      </span>
      <h2>Review pending</h2>
      <div className="reviewPendingCandidatesTable">
        <div className="reviewPendingCandidatesTableHeader">
          <span className="reviewPendingCandidatesHeaderText">
            Candidates ({array.length})
          </span>
          <div className="reviewPendingCandidatesTableHeaderTools"></div>
        </div>
        <div className="reviewPendingCandidatesTableBodyHeader">
          <div className="reviewPendingCandidatesTableBodyHeaderCheckbox">
            <img
              src={blankcheckbox}
              className="checkboxImage"
              id={`reviewpendingcandidates`}
              onClick={() => {
                if (
                  document.getElementById(`reviewpendingcandidates`).src ===
                  blankcheckbox
                ) {
                  document.getElementById(`reviewpendingcandidates`).src =
                    checkbox;
                  handleselectAll();
                } else {
                  document.getElementById(`reviewpendingcandidates`).src =
                    blankcheckbox;
                  dispatch(clearReviewSelected());
                }
              }}
            ></img>
          </div>
          <div className="reviewPendingCandidatesTableBodyHeaderNumber">#</div>
          <div className="reviewPendingCandidatesTableBodyHeaderCandidateInfo">
            Candidate info
          </div>
          {/* <div className="reviewPendingCandidatesTableBodyHeaderEmailDiv">
              <span className="reviewPendingCandidatesTableBodyHeaderName">
                Dhanush
              </span>
              <span className="reviewPendingCandidatesTableBodyHeaderEmail">
                gdhanush68@gmail.com
              </span>
            </div> */}
          <div className="reviewPendingCandidatesTableBodyHeaderCandidateFinishedat">
            Finished at
          </div>
          <div className="reviewPendingCandidatesTableBodyHeaderCandidateFinishedat">
            Score
          </div>
          <div className="reviewPendingCandidatesTableBodyHeaderCandidateInterviewDetails">
            Interview details
          </div>
          <div className="reviewPendingCandidatesTableBodyHeaderCandidateFinishedat">
            Attempt %
          </div>
          <div className="reviewPendingCandidatesTableBodyHeaderCandidateDuration">
            Duration
          </div>
        </div>
        {array.map((data, index) => {
          return (
            <div
              className="reviewPendingCandidatesTableBodyHeader"
              id={`reviewPendingBody${index}`}
            >
              <div className="reviewPendingCandidatesTableBodyHeaderCheckbox">
                <img
                  src={
                    getSelected.includes(data._id) ? checkbox : blankcheckbox
                  }
                  className="checkboxImage"
                  id={`reviewpendingcandidates${index}`}
                  onClick={() => {
                    if (
                      document.getElementById(`reviewpendingcandidates${index}`)
                        .src === blankcheckbox
                    ) {
                      document.getElementById(
                        `reviewpendingcandidates${index}`
                      ).src = checkbox;
                      dispatch(addToStudentReviewSelected(data._id));
                      document.getElementById(
                        `reviewPendingBody${index}`
                      ).style.backgroundColor = "aliceblue";
                    } else {
                      document.getElementById(
                        `reviewpendingcandidates${index}`
                      ).src = blankcheckbox;
                      document.getElementById(
                        `reviewPendingBody${index}`
                      ).style.backgroundColor = "white";
                      dispatch(filterReviewSelected(data._id));
                    }
                  }}
                ></img>
              </div>
              <div className="reviewPendingCandidatesTableBodyHeaderNumber">
                {index > 8 ? index + 1 : `0${index + 1}`}
              </div>

              <div className="reviewPendingCandidatesTableBodyHeaderEmailDiv">
                <span className="reviewPendingCandidatesTableBodyHeaderName">
                  {data.candidateName}
                </span>
                <span
                  className="reviewPendingCandidatesTableBodyHeaderEmail"
                  onClick={() => {
                    navigate(
                      "/home/assesments/testcreated/reviewpending/candidateprofile"
                    );
                  }}
                >
                  {data.candidateEmail}
                </span>
              </div>
              <div
                className="reviewPendingCandidatesTableBodyHeaderCandidateFinishedat"
                style={{ color: "black", borderRight: "none" }}
              >
                {data.finishedAt}
              </div>
              <div
                className="reviewPendingCandidatesTableBodyHeaderCandidateFinishedat"
                style={{ color: "black", borderRight: "none" }}
              >
                {data.score}
              </div>
              <div
                className="reviewPendingCandidatesTableBodyHeaderCandidateInterviewDetails"
                style={{ color: "rgb(56, 103, 230)", borderRight: "none" }}
              >
                Get interview link
              </div>
              <div
                className="reviewPendingCandidatesTableBodyHeaderCandidateFinishedat"
                style={{ color: "black", borderRight: "none" }}
              >
                {data.attempt}
              </div>
              <div
                className="reviewPendingCandidatesTableBodyHeaderCandidateDuration"
                style={{ color: "black", borderRight: "none" }}
              >
                {data.duration}
              </div>
            </div>
          );
        })}
      </div>
      {getSelected?.length > 0 ? (
        <div className="reviewPendingFooter">
          <span className="candidatesSelectedInReview">
            {getSelected?.length} candidates selected
          </span>
          <div className="archiveShortlistButtonDiv">
            <div className="reviewPendingFooterArchiveButton">Archive</div>
            <div className="reviewPendingFooterShortlistButton">Shortlist</div>
            <div></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
