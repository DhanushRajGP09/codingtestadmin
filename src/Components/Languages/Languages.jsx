import React, { useCallback, useEffect, useState } from "react";
import "./Languages.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  addbodyLineNumber,
  getBodyLineNumber,
} from "../../features/question/QuestionSlice";

import AutogenerateModal from "../Modals/AutogenerateModal/AutogenerateModal";

export default function Languages() {
  const getbodynumbers = useSelector(getBodyLineNumber);
  console.log("hi", getbodynumbers);

  const dispatch = useDispatch();

  var lineNumber = 2;

  console.log("hehe");

  const EnterFunction = useCallback((event) => {
    if (event.key === "Enter") {
      lineNumber = lineNumber + 1;
      console.log("working", lineNumber + 1);

      dispatch(addbodyLineNumber(lineNumber));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", EnterFunction, false);

    return () => {
      document.removeEventListener("keydown", EnterFunction, false);
    };
  }, [EnterFunction]);
  const [autogeneratemodal, setAutoGenerateModal] = useState(false);

  return (
    <div className="languages">
      <AutogenerateModal
        autogeneratemodal={autogeneratemodal}
        setAutoGenerateModal={setAutoGenerateModal}
      />
      <span className="problemNameText">Allowed languages</span>

      <span className="maxScoreDescription" style={{ marginTop: "2%" }}>
        Programming languages in which candidates can write their code.
      </span>
      <div className="selectAllLang">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Select all" />
        </FormGroup>
      </div>
      <div className="languagesSelectContainer">
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Select all" />
          </FormGroup>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2%",
        }}
      >
        <span className="problemNameText">Code snippets</span>
        <span
          className="autoGenerateText"
          onClick={() => {
            setAutoGenerateModal(true);
          }}
        >
          Auto generate code
        </span>
      </div>

      <div className="codeSnippetContainer">
        <div className="codeSnippetContainerHeader">
          <span className="fullscreenMode">Fullscreen mode</span>
        </div>
        <div className="codeSnippetContainerBody">
          <div className="codeSnippetSelectedLanguages">
            <div className="codeSnippetSelectedLanguage">C</div>
            <div className="codeSnippetSelectedLanguage">C++</div>
            <div className="codeSnippetSelectedLanguage">Java</div>
            <div className="codeSnippetSelectedLanguage">Python</div>
            <div className="codeSnippetSelectedLanguage">JavaScript</div>
          </div>
          <div className="codeContainerDiv">
            <div className="codeContainerDivHeader">
              <div className="codeContainerDivHeaderHeader">
                <span style={{ color: "white", marginLeft: "2%" }}>Head</span>
                <span
                  className="maxScoreDescription"
                  style={{ marginLeft: "2%", color: "white" }}
                >
                  This cannot be edited by the candidate
                </span>
              </div>
            </div>
            <div className="codeContainerDivBody">
              <div className="codeContainerDivBodyHeader">
                <span style={{ color: "white", marginLeft: "2%" }}>Body</span>
              </div>
              <div className="codeContainerDivBodyBody">
                <div className="codeContainerDivBodyBodyNumber">
                  {getbodynumbers.map((data, index) => {
                    return <div className="bodyLineNumber">{data}</div>;
                  })}
                </div>
                <textarea className="codeContainerDivBodyTextArea"></textarea>
              </div>
            </div>
            <div className="codeContainerDivHeader">
              <div className="codeContainerDivHeaderHeader">
                <span style={{ color: "white", marginLeft: "2%" }}>Tail</span>
                <span
                  className="maxScoreDescription"
                  style={{ marginLeft: "2%", color: "white" }}
                >
                  This cannot be edited by the candidate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
