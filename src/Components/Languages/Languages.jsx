import React, { useCallback, useEffect, useState } from "react";
import "./Languages.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllLanguages,
  addToSelectedLanguages,
  addbodyLineNumber,
  filterSelectedLanguages,
  getBodyLineNumber,
  getSelectedLanguages,
  removeAllLanguages,
} from "../../features/question/QuestionSlice";

import AutogenerateModal from "../Modals/AutogenerateModal/AutogenerateModal";

export default function Languages() {
  const getbodynumbers = useSelector(getBodyLineNumber);
  console.log("hi", getbodynumbers);

  const dispatch = useDispatch();

  const [selectall, setSelectAll] = useState(false);

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
  const getselectedlanguages = useSelector(getSelectedLanguages);
  console.log("selectedlanguage", getselectedlanguages);

  const List = [
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "Go",
    "R programming",
    "C#",
    "Dotnet",
  ];

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
          <FormControlLabel
            control={<Checkbox />}
            label="Select all"
            onClick={() => {
              setSelectAll(!selectall);
              if (!selectall) {
                dispatch(addAllLanguages(List));
              } else {
                dispatch(removeAllLanguages());
              }
            }}
          />
        </FormGroup>
      </div>

      <div className="languagesSelectContainer">
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="C"
              onClick={() => {
                if (!getselectedlanguages.includes("C")) {
                  dispatch(addToSelectedLanguages("C"));
                } else {
                  dispatch(filterSelectedLanguages("C"));
                }
              }}
              checked={getselectedlanguages.includes("C") ? true : false}
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="C++"
              onClick={() => {
                if (!getselectedlanguages.includes("C++")) {
                  dispatch(addToSelectedLanguages("C++"));
                } else {
                  dispatch(filterSelectedLanguages("C++"));
                }
              }}
              checked={getselectedlanguages.includes("C++") ? true : false}
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Java"
              onClick={() => {
                if (!getselectedlanguages.includes("Java")) {
                  dispatch(addToSelectedLanguages("Java"));
                } else {
                  dispatch(filterSelectedLanguages("Java"));
                }
              }}
              checked={getselectedlanguages.includes("Java") ? true : false}
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Python"
              onClick={() => {
                if (!getselectedlanguages.includes("Python")) {
                  dispatch(addToSelectedLanguages("Python"));
                } else {
                  dispatch(filterSelectedLanguages("Python"));
                }
              }}
              checked={getselectedlanguages.includes("Python") ? true : false}
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="JavaScript"
              onClick={() => {
                if (!getselectedlanguages.includes("JavaScript")) {
                  dispatch(addToSelectedLanguages("JavaScript"));
                } else {
                  dispatch(filterSelectedLanguages("JavaScript"));
                }
              }}
              checked={
                getselectedlanguages.includes("JavaScript") ? true : false
              }
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Go"
              onClick={() => {
                if (!getselectedlanguages.includes("Go")) {
                  dispatch(addToSelectedLanguages("Go"));
                } else {
                  dispatch(filterSelectedLanguages("Go"));
                }
              }}
              checked={getselectedlanguages.includes("Go") ? true : false}
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="R programming"
              onClick={() => {
                if (!getselectedlanguages.includes("R programming")) {
                  dispatch(addToSelectedLanguages("R programming"));
                } else {
                  dispatch(filterSelectedLanguages("R programming"));
                }
              }}
              checked={
                getselectedlanguages.includes("R programming") ? true : false
              }
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="C#"
              onClick={() => {
                if (!getselectedlanguages.includes("C#")) {
                  dispatch(addToSelectedLanguages("C#"));
                } else {
                  dispatch(filterSelectedLanguages("C#"));
                }
              }}
              checked={getselectedlanguages.includes("C#") ? true : false}
            />
          </FormGroup>
        </div>
        <div className="languageSelectDiv">
          {" "}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Dotnet"
              onClick={() => {
                if (!getselectedlanguages.includes("Dotnet")) {
                  dispatch(addToSelectedLanguages("Dotnet"));
                } else {
                  dispatch(filterSelectedLanguages("Dotnet"));
                }
              }}
              checked={getselectedlanguages.includes("Dotnet") ? true : false}
            />
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

      <div className="codeSnippetContainer" id="code-Editor">
        <div className="codeSnippetContainerHeader">
          <span
            className="fullscreenMode"
            onClick={() => {
              var elem = document.getElementById("code-Editor");
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) {
                /* Safari */
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) {
                /* IE11 */
                elem.msRequestFullscreen();
              }
            }}
          >
            Fullscreen mode
          </span>
        </div>
        <div className="codeSnippetContainerBody">
          <div className="codeSnippetSelectedLanguages">
            {getselectedlanguages.map((data) => {
              return <div className="codeSnippetSelectedLanguage">{data}</div>;
            })}
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
