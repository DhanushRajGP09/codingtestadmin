import React from "react";
import "./HomePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Route, Routes } from "react-router";
import Library from "../../Components/Library/Library";
import Assesments from "../../Components/Assesments/Assesments";
import CandidatesUpload from "../../Components/Assesments/Candidatedetails/CandidatesUpload";

export default function HomePage() {
  return (
    <div className="adminHomePage">
      <Navbar />
      <Routes>
        <Route path="/*" element={<Library />}></Route>
        <Route path="/assesments/*" element={<Assesments />}></Route>
        <Route
          path="/Invitecandidates/*"
          element={<CandidatesUpload />}
        ></Route>
      </Routes>
    </div>
  );
}
