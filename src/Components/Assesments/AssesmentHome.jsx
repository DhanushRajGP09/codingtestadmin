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
  const [testname, setTestName] = useState("");

  const getalltestdata = useSelector(getAllTestData);
  console.log("getalltestdata", getalltestdata);

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

  const handleSearchTest = (name) => {
    axios
      .post(
        `${getbaseurl}/test/search-test`,
        {
          testName: name,
          itemsPerPage: 100,
          page: 1,
          sortBy: [
            {
              key: "testName",
              direction: "desc",
            },
          ],
        },
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            testName: name,
            itemsPerPage: 100,
            page: 1,
          },
        }
      )
      .then(function (response) {
        console.log("searchtest", response);
        dispatch(addAllTestData(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePublish = (id) => {
    axios
      .post(
        `${getbaseurl}/test/publish-test`,
        {},
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
        console.log("test Published", response);
        getAllTest();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
                onChange={(e) => {
                  setTestName(e.target.value);
                  if (e.target.value === "") {
                    getAllTest();
                  } else {
                    handleSearchTest(e.target.value);
                  }
                }}
              ></input>
              <div
                className="testSearchIcon"
                alt="search"
                onClick={() => {
                  if (testname === "") {
                    getAllTest();
                  } else {
                    handleSearchTest(testname);
                  }
                }}
              >
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
                        {data?.testDuration
                          ? `${data?.testDuration?.substr(0, 2)} hrs
                        ${data?.testDuration?.substr(3, 2)} mins`
                          : "no duration"}
                      </div>
                      <div className="testContainerBodyTestDate">
                        {data?.testStartDate
                          ? `${
                              months[
                                parseInt(data?.testStartDate?.substr(5, 2))
                              ]
                            }
                        ${
                          data.testStartDate &&
                          parseInt(data?.testStartDate?.substr(8, 2))
                        },
                        ${
                          data.testStartDate &&
                          parseInt(data?.testStartDate?.substr(0, 4))
                        }
                        ${data.testStartDate && "12:46 PM IST -"}`
                          : "No start date -"}
                      </div>
                      <div className="testContainerBodyTestEndTime">
                        {data?.testEndDate
                          ? `${
                              months[parseInt(data?.testEndDate?.substr(5, 2))]
                            }
                        ${
                          data.testEndDate &&
                          parseInt(data?.testEndDate?.substr(8, 2))
                        },
                        ${
                          data.testEndDate &&
                          parseInt(data?.testEndDate?.substr(0, 4))
                        }
                        ${data.testEndDate && "12:46 PM IST "}`
                          : "No End date"}
                      </div>
                    </div>
                    <div className="testContainerFooter">
                      {data?.testPublished ? (
                        <span
                          style={{
                            width: "530px",
                          }}
                        >
                          31 candidates have been invited and have taken the
                          test
                        </span>
                      ) : (
                        <span
                          style={{
                            width: "530px",
                          }}
                        >
                          Publish the test to invite candidates
                        </span>
                      )}

                      <span className="viewCandidateReportButton">
                        View candidate report
                      </span>
                      <div className="testContainerFooterFunctions">
                        <span className="viewCandidateReportButton">
                          Preview test
                        </span>
                        {data?.testPublished ? (
                          <span
                            className="viewCandidateReportButton"
                            onClick={() => {
                              navigate("/home/Invitecandidates");
                              localStorage.setItem(
                                "testID",
                                JSON.stringify(data?._id)
                              );
                              localStorage.setItem(
                                "testName",
                                JSON.stringify(data?.testName)
                              );
                            }}
                          >
                            Invite candidates
                          </span>
                        ) : (
                          <span
                            className="viewCandidateReportButton"
                            onClick={() => {
                              handlePublish(data?._id);
                            }}
                          >
                            Publish test
                          </span>
                        )}

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
