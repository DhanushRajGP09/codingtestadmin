import React, { useEffect, useState } from "react";
import "./Description.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  addProblemDescription,
  addProblemDifficulty,
  addProblemName,
  getProblemDescription,
  getProblemDifficulty,
  getProblemName,
  getTotalScore,
} from "../../features/question/QuestionSlice";

export default function Description() {
  const getproblemname = useSelector(getProblemName);
  const getproblemdescription = useSelector(getProblemDescription);
  const getproblemdifficulty = useSelector(getProblemDifficulty);
  const [value, setValue] = useState(getproblemdescription);

  const dispatch = useDispatch();
  console.log("hehe", value);

  const totalscore = useSelector(getTotalScore);
  console.log("totalscore", totalscore);

  useEffect(() => {
    dispatch(addProblemDescription(value));
    console.log("hii");
  }, [value]);

  return (
    <div className="description">
      <div className="descriptionCreateLeftContainer">
        <span className="problemNameText">Problem Name</span>
        <input
          className="problemNameInput"
          value={getproblemname}
          onChange={(e) => {
            dispatch(addProblemName(e.target.value));
          }}
        ></input>
        <span className="problemNameText" style={{ marginTop: "4%" }}>
          Problem statement
        </span>
        <div className="richTextEditor">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="textEditor"
          />
        </div>
      </div>
      <div className="descriptionCreateRightContainer">
        <div className="difficultyLevelDiv">
          <span className="problemNameText">Difficulty level</span>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={getproblemdifficulty}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Easy"
                control={<Radio />}
                label="Easy"
                onClick={(e) => {
                  dispatch(addProblemDifficulty(e.target.value));
                }}
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
                onClick={(e) => {
                  dispatch(addProblemDifficulty(e.target.value));
                }}
              />
              <FormControlLabel
                value="Hard"
                control={<Radio />}
                label="Hard"
                onClick={(e) => {
                  dispatch(addProblemDifficulty(e.target.value));
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="maxScoreDiv">
          <span className="problemNameText">Maximum score</span>
          <div className="maxScoreInput">{totalscore}</div>
          <span className="maxScoreDescription">
            the total score is the sum of the score of all the test cases. this
            score can be modified with rescprect to each test case
          </span>
        </div>
      </div>
    </div>
  );
}
