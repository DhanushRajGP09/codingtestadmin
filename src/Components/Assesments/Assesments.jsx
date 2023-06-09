import React, { useState } from "react";
import "./Assesments.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CreateTestModal from "../Modals/createtestModal/CreateTestModal";
import AssesmentHome from "./AssesmentHome";
import { Route, Routes } from "react-router";

import TestCreated from "./TestCreated";

export default function Assesments() {
  return (
    <div className="adminAssesment">
      <Routes>
        <Route path="/*" element={<AssesmentHome />}></Route>
        <Route path="/testcreated/*" element={<TestCreated />}></Route>
      </Routes>
    </div>
  );
}
