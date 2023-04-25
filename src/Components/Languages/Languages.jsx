import React, { useCallback, useEffect, useState } from "react";
import "./Languages.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { languageOptions } from "../../constants/languageOptions";
import Editor from "@monaco-editor/react";
import {
  addAllLanguages,
  addToSelectedLanguages,
  addbodyLineNumber,
  filterSelectedLanguages,
  getBodyLineNumber,
  getSelectedLanguages,
  getQuestionID,
  removeAllLanguages,
} from "../../features/question/QuestionSlice";
import axios from "axios";

import AutogenerateModal from "../Modals/AutogenerateModal/AutogenerateModal";

export default function Languages() {
  const getbodynumbers = useSelector(getBodyLineNumber);
  console.log("hi", getbodynumbers);

  const dispatch = useDispatch();

  const [selectall, setSelectAll] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(languageOptions[6]);

  const [autogeneratemodal, setAutoGenerateModal] = useState(false);
  const getselectedlanguages = useSelector(getSelectedLanguages);

  console.log("selectedlanguage", getselectedlanguages);

  const [code, setCode] = useState("");
  const [headcode, setHeadCode] = useState("");
  const [tailcode, setTailCode] = useState("");

  const getLanguageFromAPI = () => {
    axios
      .get(
        "http://139.59.56.122:5000/api/user/get-all-languages",

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("languages", response);
        setLanguages(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getquestionid = useSelector(getQuestionID);
  console.log("questionI", getquestionid);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getLanguageFromAPI();
  }, []);

  const List = ["C", "C++", "Python", "Node.Js / Javascript", "GoLang", "C#"];

  const handleEditorChange = (value) => {
    setCode(value);
    console.log("value", value);
  };
  const handleHeadEditorChange = (value) => {
    setHeadCode(value);
  };
  const handleTailEditorChange = (value) => {
    setTailCode(value);
  };

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
        {languages.length > 0
          ? languages.map((data, index) => {
              return (
                <div className="languageSelectDiv">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={data}
                      onClick={() => {
                        if (!getselectedlanguages.includes(data)) {
                          dispatch(addToSelectedLanguages(data));
                        } else {
                          dispatch(filterSelectedLanguages(data));
                        }
                      }}
                      checked={
                        getselectedlanguages.includes(data) ? true : false
                      }
                    />
                  </FormGroup>
                </div>
              );
            })
          : ""}
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
            {getselectedlanguages.map((data, index) => {
              return (
                <div
                  className="codeSnippetSelectedLanguage"
                  id={`selectedLanguage${index}`}
                >
                  {data}
                </div>
              );
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

              <Editor
                height="15vh"
                width={"100%"}
                language={language?.value || "Python"}
                value={headcode}
                defaultValue="// some comment"
                onChange={handleHeadEditorChange}
              />
            </div>
            <div className="codeContainerDivBody">
              <div className="codeContainerDivBodyHeader">
                <span style={{ color: "white", marginLeft: "2%" }}>Body</span>
              </div>
              <div className="codeContainerDivBodyBody">
                <Editor
                  height="23vh"
                  width={"100%"}
                  language={language?.value || "Python"}
                  value={code}
                  defaultValue="// some comment"
                  onChange={handleEditorChange}
                />
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
              <Editor
                height="15vh"
                width={"100%"}
                language={language?.value || "Python"}
                value={tailcode}
                defaultValue="// some comment"
                onChange={handleTailEditorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
