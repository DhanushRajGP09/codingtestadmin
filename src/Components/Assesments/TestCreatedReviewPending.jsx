import React, { useEffect } from "react";
import "./TestCreatedReviewPending.css";
import { useDispatch, useSelector } from "react-redux";
import { getTestName } from "../../features/Test/TestSlice";
import { Route, Routes } from "react-router";
import ReviewpendingTable from "./Tables/ReviewpendingTable";
import CandidateProfile from "./Candidatedetails/CandidateProfile";

export default function TestCreatedReviewPending() {
  const gettestname = useSelector(getTestName);

  return (
    <>
      <div className="reviewPendingRightContainer">
        {" "}
        <div></div>
        <Routes>
          <Route path="/" element={<ReviewpendingTable />}></Route>
          <Route
            path="/candidateprofile/*"
            element={<CandidateProfile />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}
