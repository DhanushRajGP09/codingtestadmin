import React, { useState } from "react";
import "./SolutionTest.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import CheckboxWrapper from "../Tablecheckbox/Checkbox";
import { useNavigate } from "react-router";
import switchoff from "../../Assets/Icons/Switch off.png";
import switchon from "../../Assets/Icons/Switch on.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestCases,
  getTestCases,
} from "../../features/question/QuestionSlice";
import AddTestCaseModal from "../Modals/AutogenerateModal/AutogenerateModal";
import TestCaseModal from "../Modals/testcaseModal/TestCaseModal";

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
  console.log("ttt", gettestcases);

  // const onRowsSelectionHandler = (ids) => {
  //   const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
  //   console.log(selectedRowsData);
  // };

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
  }

  return (
    <div className="Solutions">
      <TestCaseModal
        addtestcasemodal={addtestcasemodal}
        setAddTestCaseModal={setAddTestCaseModal}
      />
      <span className="problemNameText">Solution details</span>
      <span className="maxScoreDescription">
        The sample input and output must be uploaded in the format of .txt files
        up to the size of 5MB
      </span>
      <div className="sampleInputOutputDiv">
        <div className="sampleInputDiv">Sample input</div>
        <div className="sampleInputDiv">Sample output</div>
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
      <span className="problemNameText">Test cases</span>
      <span className="maxScoreDescription">
        The input and output files are used to evaluate the submissions. Assign
        scores to each of the input files and their corresponding output files.
        Please upload the zip files containing input files as
        in00.txtbin,in01.txtbin etc and output files named as out00.txtbin,
        out01.txtbin etc
      </span>
      <div className="testCaseAddDiv">
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
        <button className="addTestCases">Upload zip file</button>
      </div>
      {gettestcases.length > 0 ? (
        <div className="Totalstudenttable">
          <div className="tableHeader">
            <div className="inputFilesText">Input files</div>
            <div className="inputFilesText">Output files</div>
            <div className="scoreText">Score</div>
            <div className="visibleToCandidatesText">Visible to candidates</div>
            <div className="scoreText">Edit</div>
          </div>

          {gettestcases.map((data, index) => {
            return (
              <div className="tableFields">
                <div className="inputFilesText">input {index + 1}</div>
                <div className="inputFilesText">output {index + 1}</div>
                <div className="scoreText">
                  <input
                    className="eachScoreInput"
                    name="score"
                    value={data.score}
                  ></input>
                </div>
                <div className="visibleToCandidatesText">
                  {data.visible === true ? (
                    <img
                      src={switchon}
                      id={`option${index}`}
                      onClick={() => {
                        if (
                          document.getElementById(`option${index}`).src ===
                          switchon
                        ) {
                          document.getElementById(`option${index}`).src =
                            switchoff;
                          setChecked(true);
                          if (
                            document.getElementById(`option${index}`).src ===
                            switchoff
                          ) {
                            console.log("id", index);
                          }
                        } else {
                          setChecked(false);
                          document.getElementById(`option${index}`).src =
                            switchon;
                        }
                      }}
                    ></img>
                  ) : (
                    <img
                      src={switchoff}
                      id={`option${index}`}
                      onClick={() => {
                        if (
                          document.getElementById(`option${index}`).src ===
                          switchoff
                        ) {
                          document.getElementById(`option${index}`).src =
                            switchon;
                          setChecked(false);
                          if (
                            document.getElementById(`option${index}`).src ===
                            switchon
                          ) {
                          }
                        } else {
                          setChecked(true);
                          document.getElementById(`option${index}`).src =
                            switchoff;
                        }
                      }}
                    ></img>
                  )}
                </div>
                <div className="editDiv">
                  <span>Edit</span>
                  <div className="dividerLine"></div>
                  <span style={{ color: "red" }}>Delete</span>
                </div>
              </div>
            );
          })}
          <div className="tableFooter">
            <span>Total score: {totalscore}</span>
          </div>
        </div>
      ) : (
        <div className="Totalstudenttable">
          <span
            style={{ fontSize: "20px", marginLeft: "40%", marginTop: "20%" }}
          >
            No Test Cases Added
          </span>
        </div>
      )}
    </div>
  );
}
