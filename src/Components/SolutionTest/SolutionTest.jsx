import React, { useState } from "react";
import "./SolutionTest.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import CheckboxWrapper from "../Tablecheckbox/Checkbox";
import { useNavigate } from "react-router";
import switchoff from "../../Assets/Icons/Switch off.png";
import parse from "html-react-parser";

import switchon from "../../Assets/Icons/Switch on.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addIndividualTestCase,
  addSampleExplaination,
  addSampleInput,
  addSampleOutput,
  addTestCaseId,
  addTestCases,
  addTotalScore,
  filterTestCases,
  getBaseURL,
  getQuestionID,
  getTestCases,
} from "../../features/question/QuestionSlice";
import AddTestCaseModal from "../Modals/AutogenerateModal/AutogenerateModal";
import TestCaseModal from "../Modals/testcaseModal/TestCaseModal";
import EditTestCaseModal from "../Modals/testcaseModal/EditTestCaseModal";

export default function SolutionTest() {
  const [value, setValue] = useState("");
  const [addtestcasemodal, setAddTestCaseModal] = useState(false);

  // const columns = [
  //   { field: "id", headerName: "ID", width: 70, hide: true },

  //   {
  //     field: "userResponse",
  //     headerName: "Name",
  //     width: 247,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <span className="table-username">{params.value.fullName}</span>
  //         </>
  //       );
  //     },
  //   },

  //   {
  //     field: "courseName",
  //     headerName: "Course Title",
  //     width: 275,
  //     renderCell: (params) => {
  //       return <span className="table-title">{params.value}</span>;
  //     },
  //   },

  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 140,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           {params.value === "Completed" ? (
  //             <>
  //               <span
  //                 className="statusprogress-text"
  //                 style={{ color: "green", marginLeft: "10px" }}
  //               >
  //                 {params.value}
  //               </span>
  //             </>
  //           ) : (
  //             <>
  //               <span
  //                 className="statusprogress-text"
  //                 style={{ color: "black", marginLeft: "10px" }}
  //               >
  //                 {params.value}
  //               </span>
  //             </>
  //           )}
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     field: "subscribe",
  //     headerName: "Subscribe",
  //     width: 123,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           {params.value === true ? (
  //             <img
  //               src={switchon}
  //               id={`option${params.id}`}
  //               onClick={() => {
  //                 if (
  //                   document.getElementById(`option${params.id}`).src ===
  //                   switchon
  //                 ) {
  //                   document.getElementById(`option${params.id}`).src =
  //                     switchoff;
  //                   setChecked(true);
  //                   if (
  //                     document.getElementById(`option${params.id}`).src ===
  //                     switchoff
  //                   ) {
  //                     console.log("id", params.id);
  //                   }
  //                 } else {
  //                   setChecked(false);
  //                   document.getElementById(`option${params.id}`).src =
  //                     switchon;
  //                 }
  //               }}
  //             ></img>
  //           ) : (
  //             <img
  //               src={switchoff}
  //               id={`option${params.id}`}
  //               onClick={() => {
  //                 if (
  //                   document.getElementById(`option${params.id}`).src ===
  //                   switchoff
  //                 ) {
  //                   document.getElementById(`option${params.id}`).src =
  //                     switchon;
  //                   setChecked(false);
  //                   if (
  //                     document.getElementById(`option${params.id}`).src ===
  //                     switchon
  //                   ) {
  //                   }
  //                 } else {
  //                   setChecked(true);
  //                   document.getElementById(`option${params.id}`).src =
  //                     switchoff;
  //                 }
  //               }}
  //             ></img>
  //           )}
  //         </>
  //       );
  //     },
  //   },
  // ];

  // const rows = [
  //   {
  //     id: 1,
  //     userResponse: "Snow",
  //     joinDate: "",
  //     courseName: "abcd",
  //     completedDate: "",
  //     status: "Completed",
  //     subscribe: true,
  //   },
  // ];
  const [checked, setChecked] = React.useState(false);
  const gettestcases = useSelector(getTestCases);
  // console.log("rowsss", rows);

  const dispatch = useDispatch();
  console.log("tt", gettestcases);

  // const onRowsSelectionHandler = (ids) => {
  //   const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
  //   console.log(selectedRowsData);
  // };

  const token = JSON.parse(localStorage.getItem("token"));

  const [inputField, setInputField] = useState(false);
  const [outputField, setOutputField] = useState(false);
  const params = { value: true };

  var totalscore = 0;
  const [rows, setRows] = useState(gettestcases);

  // const handleScore = (e, index) => {
  //   var { name, value } = e.target;
  //   const list = [...rows];
  //   list[index][name] = value;
  //   setRows(list);
  // };

  for (let i in gettestcases) {
    const regex = new RegExp("[0-9]");
    if (regex.test(parseInt(gettestcases[i].score))) {
      totalscore += parseInt(gettestcases[i].score);
    }
    dispatch(addTotalScore(totalscore));
  }

  const [inputfileName, inputsetFileName] = useState("");
  const [inputfileContent, inputsetFileContent] = useState("");
  const [outputfileName, outputsetFileName] = useState("");
  const [outputfileContent, outputsetFileContent] = useState("");

  const handleChangeInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      inputsetFileName(file.name);
      inputsetFileContent(reader.result);
      dispatch(addSampleInput(reader.result));
    };
  };

  const handleChangeOutput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      outputsetFileName(file.name);
      outputsetFileContent(reader.result);
      dispatch(addSampleOutput(reader.result));
    };
  };

  const getquestionid = useSelector(getQuestionID);
  console.log("questionId", getquestionid);

  dispatch(addSampleExplaination(value));
  const getbaseurl = useSelector(getBaseURL);

  const handleDeleteTestCase = (id) => {
    console.log("testcase", getquestionid);

    axios
      .delete(
        `${getbaseurl}/question/delete-test-case`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            questionId: getquestionid,
            testCaseId: id,
          },
        }
      )
      .then(function (response) {
        console.log("testcasedeleted", response);
        dispatch(filterTestCases(id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [sampleInput, setSampleInput] = useState(true);
  const [sampleOutput, setSampleOutput] = useState(true);

  const getIndividualTestCase = (id) => {
    axios
      .get(
        `${getbaseurl}/question/view-test-case-input-and-output`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            questionId: getquestionid,
            testCaseId: id,
          },
        }
      )
      .then(function (response) {
        console.log("getindividualtestcase", response);
        dispatch(addIndividualTestCase(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [editTestCaseModal, setEditTestCaseModal] = useState(false);

  return (
    <div className="Solutions">
      <TestCaseModal
        addtestcasemodal={addtestcasemodal}
        setAddTestCaseModal={setAddTestCaseModal}
      />
      <EditTestCaseModal
        editTestCaseModal={editTestCaseModal}
        setEditTestCaseModal={setEditTestCaseModal}
      />
      <span className="problemNameText">Solution details</span>
      <span className="maxScoreDescription" style={{ marginTop: "2%" }}>
        The sample input and output must be uploaded in the format of .txt files
        up to the size of 5MB
      </span>
      <div className="sampleInputOutputDiv">
        {sampleInput ? (
          <input
            class="custom-file-input"
            type="file"
            onChange={(event) => {
              handleChangeInput(event);
            }}
          ></input>
        ) : (
          <div className="sampleInputUploaded"></div>
        )}

        <input
          class="custom-file-output"
          type="file"
          onChange={(event) => {
            handleChangeOutput(event);
          }}
        ></input>
      </div>

      <span className="problemNameText">Sample explanation</span>
      <div className="richTextEditor">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="textEditor"
        />
      </div>
      <span className="problemNameText" style={{ marginTop: "2%" }}>
        Test cases
      </span>
      <span className="maxScoreDescription" style={{ marginTop: "2%" }}>
        The input and output files are used to evaluate the submissions. Assign
        scores to each of the input files and their corresponding output files.
      </span>
      <div className="testCaseAddDiv" style={{ marginTop: "2%" }}>
        <button
          className="addTestCases"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setAddTestCaseModal(true);
          }}
        >
          Add test cases
        </button>
        <button className="addTestCases">Upload file</button>
      </div>
      {gettestcases.length > 0 ? (
        <div className="Totalstudenttable" style={{ marginTop: "2%" }}>
          <div className="tableHeader">
            <div className="inputFilesText">Input files</div>
            <div className="inputFilesText">Output files</div>
            <div className="scoreText">Score</div>
            <div className="visibleToCandidatesText">Visible to candidates</div>
            <div className="scoreText">Explanation</div>
            <div className="scoreText">Edit</div>
          </div>

          {gettestcases.map((data, index) => {
            return (
              <div
                className="tableFields"
                style={{ height: "auto", marginTop: "0.5%" }}
              >
                <div
                  className="inputFilesText"
                  id={`input ${index}`}
                  onClick={() => {
                    document.getElementById(`input ${index}`).innerHTML =
                      data.input;
                    setTimeout(() => {
                      document.getElementById(
                        `input ${index}`
                      ).innerHTML = `input ${index + 1}`;
                    }, 3000);
                  }}
                >
                  input {index + 1}
                </div>
                <div
                  className="inputFilesText"
                  id={`output ${index}`}
                  onClick={() => {
                    document.getElementById(`output ${index}`).innerHTML =
                      data.output;
                    setTimeout(() => {
                      document.getElementById(
                        `output ${index}`
                      ).innerHTML = `output ${index + 1}`;
                    }, 3000);
                  }}
                >
                  output {index + 1}
                </div>
                <div className="scoreText">
                  <input
                    className="eachScoreInput"
                    name="score"
                    value={data.score}
                  ></input>
                </div>
                <div className="visibleToCandidatesText">
                  {data.visibility === "true" ? (
                    <img src={switchon} id={`option${index}`}></img>
                  ) : (
                    <img src={switchoff} id={`option${index}`}></img>
                  )}
                </div>
                <div className="scoreText" style={{ height: "auto" }}>
                  <span className="eachScoreInput" style={{ height: "auto" }}>
                    {parse(data.explaination)}
                  </span>
                </div>
                <div className="editDiv">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      getIndividualTestCase(data._id);
                      setEditTestCaseModal(true);
                      dispatch(addTestCaseId(data._id));
                    }}
                  >
                    Edit
                  </span>
                  <div className="dividerLine"></div>
                  <span
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      console.log(data.input);

                      handleDeleteTestCase(data._id);
                    }}
                  >
                    Delete
                  </span>
                </div>
              </div>
            );
          })}
          <div className="tableFooter">
            <span style={{ marginLeft: "33%" }}>Total score: {totalscore}</span>
          </div>
        </div>
      ) : (
        <div className="Totalstudenttable" style={{ marginTop: "2%" }}>
          <span style={{ fontSize: "20px", marginLeft: "40%" }}>
            No Test Cases Added
          </span>
        </div>
      )}
    </div>
  );
}
