import React from "react";
import "./CandidateProfile.css";
import { useSelector } from "react-redux";
import { getTestName } from "../../../features/Test/TestSlice";

export default function CandidateProfile() {
  const gettestname = useSelector(getTestName);
  return (
    <>
      <span className="reviewPendingRightContainerRoutes">
        All Tests > {gettestname} > Review pending > candidate Name
      </span>

      <div className="candidateProfileHeader">
        <div className="candidateProfileImgNameContainer">
          <div className="candidateProfileImage">
            <img className="candidateProfileImage"></img>
          </div>

          <span className="candidateProfileName">Dhanush Raj G P</span>

          <div className="candidateProfileStatusDiv">
            <span className="candidateProfileStatus">Review pending</span>
          </div>
        </div>
        <div className="candidateProfileHeaderFunctions"></div>
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
            16<span className="candidateProfileTotalRank">/35</span>
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
    </>
  );
}
