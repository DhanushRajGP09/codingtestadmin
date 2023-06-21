import React from "react";
import "./CandidateProfile.css";
import { useSelector } from "react-redux";
import { getTestName } from "../../../features/Test/TestSlice";
import myimage from "../../../Assets/Icons/myimage.jpg";

export default function CandidateProfile() {
  const gettestname = useSelector(getTestName);

  const array = [
    {
      questionName:
        "Find the number that appears(or repeated) the most number of times",
      noOfAttempts: "2",
      Result: "pass",
      codeQuality: "7/10",
      score: "5/5",
      explaination:
        "you are given a list of 'N' numbers with the following conditions \n 1) The list is not sorted. it is in random order asdasdasd asdasdasdasdadadasd asdasdasdasdsadsa asdasdasdasdasd asdasdasdas asdasdas asdasdas asdasd",
    },
    {
      questionName: "Find the fibonacci of the given number",
      noOfAttempts: "2",
      Result: "pass",
      codeQuality: "7/10",
      score: "5/5",
      explaination:
        "you are given a list of 'N' numbers with the following conditions \n 1) The list is not sorted. it is in random order",
    },
  ];

  return (
    <>
      <span className="reviewPendingRightContainerRoutes">
        All Tests > {gettestname} > Review pending > candidate Name
      </span>

      <div className="candidateProfileHeader">
        <div className="candidateProfileImgNameContainer">
          <div className="candidateProfileImage">
            <img className="candidateProfileImage" src={myimage}></img>
          </div>

          <span className="candidateProfileName">Dhanush Raj G P</span>

          <div className="candidateProfileStatusDiv">
            <span className="candidateProfileStatus">Review pending</span>
          </div>
          {/* <div className="candidateProfileStatusShortlistedDiv">
            <span className="candidateProfileStatusShortlisted">
              Shortlisted
            </span>
          </div> */}
        </div>
        {/* <div className="candidateProfileHeaderFunctions"></div> */}
      </div>
      <div className="candidateProfileRankContainer">
        <div className="candidateProfileRankDiv">
          <span className="candidateProfileRank">RANK</span>
          <span className="candidateProfileRankNumber">
            1<span className="candidateProfileTotalRank">/20</span>
          </span>
        </div>
        <div className="candidateProfileRankDiv">
          <span className="candidateProfileRank">TOTAL SCORE</span>
          <span className="candidateProfileRankNumber">
            26<span className="candidateProfileTotalRank">/35</span>
          </span>
        </div>
        <div className="candidateProfileRankDiv" style={{ marginRight: "25%" }}>
          <span className="candidateProfileRank">ATTEMPTED</span>
          <span className="candidateProfileRankNumber">
            6<span className="candidateProfileTotalRank"> of 7 questions</span>
          </span>
        </div>
      </div>
      <div className="candidateProfileTestTimeContainer">
        <span className="candidateProfileTestTimeText">Test time analysis</span>
        <div className="candidateProfileTestTimeDiv">
          <div className="candidateProfileRankDiv">
            <span className="candidateProfileRank">TEST INVITE TIME</span>

            <span className="candidateProfileTotalRank">
              Aug 04 2022,11:26:57 AM IST
            </span>
          </div>
          <div className="candidateProfileRankDiv">
            <span className="candidateProfileRank">TEST START TIME</span>

            <span className="candidateProfileTotalRank">
              Aug 04 2022,11:32:57 AM IST
            </span>
          </div>
          <div className="candidateProfileRankDiv">
            <span className="candidateProfileRank">TEST END TIME</span>

            <span className="candidateProfileTotalRank">
              Aug 04 2022,01:02:57 PM IST
            </span>
          </div>
        </div>
        <div className="candidateProfileTestTimeDiv">
          <div className="candidateProfileRankDiv">
            <span className="candidateProfileRank">TEST DURATION</span>

            <span className="candidateProfileTotalRank">
              01 hr 30 min of 01 hr 30 min used.
            </span>
          </div>
        </div>
      </div>
      <div className="candidateProfileKeyObservationContainer">
        <span className="candidateProfileTestTimeText">Key Observations</span>
        <div className="candidateProfileKeyObservationDiv">
          <div className="TabsSwitchedDiv" style={{ marginLeft: "2%" }}>
            <div className="TabsSwitchedHeader">Tabs switched 1 times</div>
            <div className="TabsSwitchBody">
              The number of times tabs are switched is recorded by system. This
              also includes minimizing system notifications, automatic
              minimization of the current window when an application is clicked,
              etc
            </div>
          </div>
          <div className="TabsSwitchedDiv">
            <div className="TabsSwitchedHeader">100% of test duration used</div>
            <div className="TabsSwitchBody">
              Ended the test in 1 hr 30 min. (total test duration: 1 hr 30 min.)
            </div>
          </div>
          <div className="TabsSwitchedDiv">
            <div className="TabsSwitchedHeader">
              Code quality <div className="codeQualtiyScore">7/10</div>
            </div>
            <div className="TabsSwitchBody">
              Represents the average of the code quality score that the best
              submissions of all programming questions have obtained
            </div>
          </div>
        </div>
        <div
          className="candidateProfileKeyObservationDiv"
          style={{ width: "55.5%" }}
        >
          <div className="TabsSwitchedDiv" style={{ marginLeft: "3%" }}>
            <div className="TabsSwitchedHeader">Plagiarism details</div>
            <div className="TabsSwitchBody">
              The candidate has not plagiarised on the test
            </div>
          </div>
          <div className="TabsSwitchedDiv">
            <div className="TabsSwitchedHeader">
              Internet plagiarism details
            </div>
            <div className="TabsSwitchBody">
              The candidate has not copied from internet on the test.
            </div>
          </div>
        </div>
      </div>
      <div className="candidateProfileAboutContainer">
        <div className="candidateProfileAboutHeader">
          {" "}
          <span className="candidateProfileTestTimeText">About Dhanush</span>
          {/* <span style={{ color: "skyblue" }}>View resume</span> */}
        </div>
        <div className="candidateProfileAboutBody">
          <div className="candidateProfileAboutPic">
            <img className="candidateProfileAboutImage" src={myimage}></img>
          </div>
          <div className="candidateProfileAboutDetailsDiv">
            <div className="candidateProfileAboutDetails">
              <span
                style={{ color: "grey", fontSize: "18px", fontWeight: "500" }}
              >
                Education
              </span>
              <span style={{ fontSize: "16px" }}>
                Vidyavardhaka college of engineering, Mysore
              </span>
            </div>
            <div className="candidateProfileAboutDetails">
              <span
                style={{ color: "grey", fontSize: "18px", fontWeight: "500" }}
              >
                Email ID
              </span>
              <span style={{ fontSize: "16px" }}>gdhanush68@gmail.com</span>
            </div>
            <div className="candidateProfileAboutDetails">
              <span
                style={{ color: "grey", fontSize: "18px", fontWeight: "500" }}
              >
                Languages
              </span>
              <span style={{ fontSize: "16px" }}>
                Java, Python, Javascript, C
              </span>
            </div>
            <div className="candidateProfileAboutDetails">
              <span
                style={{ color: "grey", fontSize: "18px", fontWeight: "500" }}
              >
                Location
              </span>
              <span style={{ fontSize: "16px" }}>
                S no 26/3 farm house gurupura near dhanush electricals, H D kote
                main road, Hunsur taluk 571105
              </span>
            </div>
            <div className="candidateProfileAboutDetails">
              <span
                style={{ color: "grey", fontSize: "18px", fontWeight: "500" }}
              >
                Contact number
              </span>
              <span style={{ fontSize: "16px" }}>8792806329</span>
            </div>
          </div>
        </div>
      </div>
      <div className="candidateProfileSubmissionReportContainer">
        <span
          className="candidateProfileTestTimeText"
          style={{ marginTop: "2%" }}
        >
          Detailed submission report
        </span>
        <div
          className="candidateProfileAboutHeader"
          style={{ marginTop: "2%" }}
        >
          {" "}
          <span
            className="candidateProfileTestTimeText"
            style={{ fontSize: "17px" }}
          >
            Programming Questions
          </span>
          <span>Questions attempted: 6 0f 7</span>
        </div>
        <div className="candidateProfileSubmissionReportTable">
          <div className="candidateProfileSubmissionReportTableHeader">
            <span style={{ width: "50px", marginLeft: "2%" }}>#</span>
            <span className="candidateProfileSubmissionQuestions">
              Questions(7)
            </span>
            <span style={{ width: "130px" }}>No. of attempts</span>
            <span style={{ width: "70px" }}>Result</span>
            <span style={{ width: "130px" }}>Code quality</span>
            <span style={{ width: "130px" }}>Score(26/35)</span>
          </div>

          {array.map((data, index) => {
            return (
              <div className="candidateProfileSubmissionReportTableBody">
                <div className="candidateProfileSubmissionReportTableQuestion">
                  <span
                    style={{
                      width: "50px",
                      marginLeft: "2%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (
                        document.getElementById(`questiondetails${index}`).style
                          .display === "flex"
                      ) {
                        document.getElementById(
                          `questiondetails${index}`
                        ).style.display = "none";
                      } else {
                        document.getElementById(
                          `questiondetails${index}`
                        ).style.display = "flex";
                      }
                    }}
                  >
                    {">"}
                  </span>
                  <span className="candidateProfileSubmissionQuestions">
                    {index + 1} {data?.questionName}
                  </span>
                  <span style={{ width: "130px" }}>{data?.noOfAttempts}</span>
                  <span style={{ width: "70px" }}>{data?.Result}</span>
                  <span style={{ width: "130px" }}>{data?.codeQuality}</span>
                  <span style={{ width: "130px" }}>{data?.score}</span>
                </div>
                <div
                  className="candidateProfileSubmissionReportQuestionDetails"
                  id={`questiondetails${index}`}
                >
                  {data?.explaination}
                  <div className="candidateProfileSubmissionReportQuestionTable">
                    <div className="candidateProfileSubmissionReportQuestionTableScore">
                      <span>Score</span>
                      <span>
                        5{" "}
                        <span
                          style={{
                            backgroundColor: "rgba(40, 255, 79, 0.227)",
                            fontSize: "12px",
                            color: "green",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                          }}
                        >
                          BEST
                        </span>
                      </span>
                    </div>
                    <div
                      className="candidateProfileSubmissionReportQuestionTableResult"
                      style={{ alignItems: "center" }}
                    >
                      <span>Result</span>
                      <span>{data?.Result}</span>
                    </div>
                    <div className="candidateProfileSubmissionReportQuestionTableScore">
                      <span>Language</span>
                      <span>Javascript</span>
                    </div>
                    <div className="candidateProfileSubmissionReportQuestionTableSubmitted">
                      <span>Submitted on</span>
                      <span>Aug 04, 2022 11:55AM IST</span>
                    </div>
                    {/* <div className="candidateProfileSubmissionReportQuestionTableScore">
                      <span></span>
                      <span style={{ color: "blue" }}>Details</span>
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
