import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CreateTestModal from "../Modals/createtestModal/CreateTestModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBaseURL } from "../../features/question/QuestionSlice";
import {
  addAllTestData,
  addParticularTestData,
  addTestId,
  getAllTestData,
  getTestId,
} from "../../features/Test/TestSlice";
import { useNavigate } from "react-router";

export default function AssesmentHome() {
  const [value, setValue] = React.useState("");
  const [createtestmodal, setCreateTestModal] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  console.log("AssesmentHo");

  const dispatch = useDispatch();
  const getbaseurl = useSelector(getBaseURL);

  const getalltestdata = useSelector(getAllTestData);
  console.log("getalltestda", getalltestdata);

  const getAllTest = () => {
    axios
      .get(
        `${getbaseurl}/test`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            testStatus: value,
          },
        }
      )
      .then(function (response) {
        console.log("allTest", response);
        dispatch(addAllTestData(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTest();
  }, []);

  const gettestid = useSelector(getTestId);

  const getParticularTest = (id) => {
    dispatch(addTestId(id));
    axios
      .get(
        `${getbaseurl}/test/view-test`,

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            testId: id,
          },
        }
      )
      .then(function (response) {
        navigate("/home/assesments/testcreated");
        dispatch(addParticularTestData(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <CreateTestModal
        createtestmodal={createtestmodal}
        setCreateTestModal={setCreateTestModal}
      />
      <div className="assesmentHeader">
        <span className="sectionName">Assesment</span>
      </div>
      <div className="assesmentBody">
        <div className="assesmentBodyLeftContainer">
          <div className="testStatusContainer">
            <span>Test status</span>
            <div className="testStatusRadioContainer">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label={`AllTests (${getalltestdata.length})`}
                  />
                  <FormControlLabel
                    value="ongoing"
                    control={<Radio />}
                    label="Ongoing (22)"
                  />
                  <FormControlLabel
                    value="completed"
                    control={<Radio />}
                    label="Completed (2)"
                  />
                  <FormControlLabel
                    value="drafts"
                    control={<Radio />}
                    label="Drafts (0)"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="testStatusSeperator"></div>
          <div className="testCreatedByContainer">
            <span>Created by</span>
            <div className="testCreatedBySort">
              <select className="functionNameInput">
                <option>All</option>
                <option>Admin</option>
                <option>abcd</option>
                <option>efg</option>
              </select>
            </div>
          </div>
          <div className="testCreatedByContainer">
            <span>Creation date</span>
            <div className="testCreatedBySort">
              <select className="functionNameInput">
                <option>Any time</option>
                <option>a</option>
                <option>b</option>
                <option>c</option>
              </select>
            </div>
          </div>
          <div className="testTypeContainer">
            <span>Test type</span>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Public" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="invite only" />
            </FormGroup>
          </div>
        </div>
        <div className="assesmentBodyRightContainer">
          <div className="assesmentBodyRightContainerHeader">
            <div className="testHeaderSearchContainer">
              <input
                className="testSearch"
                placeholder="Search by test names or tags"
              ></input>
              <div className="testSearchIcon" alt="search">
                Search
              </div>
            </div>
            <button
              className="createQuestionButton"
              onClick={() => {
                setCreateTestModal(true);
              }}
            >
              Create new test
            </button>
          </div>
          <div className="testsContainer">
            {getalltestdata?.map((data, index) => {
              return (
                <>
                  <div className="testContainer">
                    <div className="testContainerHeader">
                      <span
                        onClick={() => {
                          getParticularTest(data._id);
                          localStorage.setItem(
                            "testID",
                            JSON.stringify(data._id)
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {data?.testName}
                      </span>
                    </div>
                    <div className="testContainerBody">
                      <div className="testContainerBodyTestType">
                        Invite only{" "}
                      </div>
                      <div className="testContainerBodyTestTime">
                        1 hrs 30 mins
                      </div>
                      <div className="testContainerBodyTestDate">
                        Mar 02, 2023 12:46 PM IST -
                      </div>
                      <div className="testContainerBodyTestEndTime">
                        No end date specified
                      </div>
                    </div>
                    <div className="testContainerFooter">
                      <span>
                        31 candidates have been invited and have taken the test
                      </span>
                      <span className="viewCandidateReportButton">
                        View candidate report
                      </span>
                      <div className="testContainerFooterFunctions">
                        <span className="viewCandidateReportButton">
                          Preview test
                        </span>
                        <span className="viewCandidateReportButton">
                          Invite candidates
                        </span>
                        <span className="viewCandidateReportButton">
                          Archive
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
