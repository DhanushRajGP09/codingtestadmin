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

export default function SolutionTest() {
  const [value, setValue] = useState("");

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

  // console.log("rowsss", rows);

  // const onRowsSelectionHandler = (ids) => {
  //   const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
  //   console.log(selectedRowsData);
  // };

  const params = { value: true };

  var totalscore = 0;
  const [rows, setRows] = useState([
    { input: "input", output: "output", score: 0, visible: true },
    { input: "input", output: "output", score: 0, visible: false },
    { input: "input", output: "output", score: 0, visible: true },
    { input: "input", output: "output", score: 0, visible: false },
    { input: "input", output: "output", score: 0, visible: true },
  ]);

  const handleScore = (e, index) => {
    var { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
  };

  for (let i in rows) {
    console.log("dd", parseInt(rows[i].score));
    const regex = new RegExp("[0-9]");
    if (regex.test(parseInt(rows[i].score))) {
      console.log("hehe", parseInt(rows[i].score));
      totalscore += parseInt(rows[i].score);
    }
  }

  return (
    <div className="Solutions">
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
        <button className="addTestCases">Add test cases</button>
        <button className="addTestCases">Upload file</button>
        <button className="addTestCases">Upload zip file</button>
      </div>
      <div className="Totalstudenttable">
        <div className="tableHeader">
          <div className="inputFilesText">Input files</div>
          <div className="inputFilesText">Output files</div>
          <div className="scoreText">Score</div>
          <div className="visibleToCandidatesText">Visible to candidates</div>
        </div>

        {rows.map((data, index) => {
          return (
            <div className="tableFields">
              <div className="inputFilesText">
                {data.input} {index + 1}
              </div>
              <div className="inputFilesText">
                {data.output} {index + 1}
              </div>
              <div className="scoreText">
                <input
                  className="eachScoreInput"
                  name="score"
                  onChange={(e) => {
                    handleScore(e, index);
                  }}
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
            </div>
          );
        })}
        <div className="tableFooter">
          <span style={{ marginLeft: "5%" }}>Total score: {totalscore}</span>
        </div>
      </div>
    </div>
  );
}
