import React, { useState } from "react";
import "./AutogenerateModal.css";
import close from "../../../Assets/Icons/closemodal2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addDefaultCodes,
  addTofunctionParameter,
  addfunctionParameter,
  getLanguagesForApi,
  getQuestionID,
  getSelectedLanguages,
  getfunctionParameter,
} from "../../../features/question/QuestionSlice";
import axios from "axios";

export default function AutogenerateModal(props) {
  const [functionName, setFunctionName] = useState("");
  const [returntype, setReturnType] = useState("int");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const getfunctionparameter = useSelector(getfunctionParameter);
  console.log("getfunctionparameter", getfunctionparameter);

  const getlanguagesforapi = useSelector(getLanguagesForApi);
  console.log("languagesforapi", getlanguagesforapi);

  const getquestionid = useSelector(getQuestionID);
  console.log("questionI", getquestionid);

  const handleDataType = (e, index) => {
    const { name, value } = e.target;
    const temp = [...list];
    temp[index][name] = value;
    setList(temp);
  };

  const [list, setList] = useState([
    {
      dataType: "int",
      value: "",
    },
  ]);

  console.log("lis", functionName, returntype, comment, list);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleDefaultCode = () => {
    console.log("defaultcodeapi", {
      functionName: functionName,
      returnType: returntype,
      comment: comment,
      functionParameter: list,
      languages: getlanguagesforapi,
      questionId: getquestionid,
    });

    axios
      .post(
        "http://139.59.56.122:5000/api/question/default-code",
        {
          functionName: functionName,
          returnType: returntype,
          comment: comment,
          functionParameter: list,
          languages: getlanguagesforapi,
          questionId: getquestionid,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("defaultcodes", response.data.data);
        dispatch(addDefaultCodes(response.data.data));
        props.setAutoGenerateModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const returntypeoptions = ["int", "char", "void"];

  return (
    <div
      className="createQuestionModal"
      style={{ display: props.autogeneratemodal ? "flex" : "none" }}
    >
      <div className="addtestcaseQuestionoverlay">
        <div className="createQuestionmodal-content">
          <img
            src={close}
            className="closeautogenerateQuestionModal"
            onClick={() => {
              props.setAutoGenerateModal(false);
            }}
          ></img>
          <div className="addtestcasemodal-inner-content">
            <span className="problemNameText" style={{ marginTop: "5%" }}>
              Auto generate code snippets
            </span>
            <div className="functionNameReturnDiv">
              <div className="functionNameDiv">
                <span className="problemNameText">Function name</span>
                <input
                  className="functionNameInput"
                  onChange={(e) => {
                    setFunctionName(e.target.value);
                  }}
                ></input>
              </div>
              <div className="functionNameDiv">
                <span className="problemNameText">Return type</span>
                <select
                  className="functionNameInput"
                  onChange={(e) => {
                    setReturnType(e.target.value);
                  }}
                >
                  {returntypeoptions.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="functionCommentsReturnDiv">
              <span className="problemNameText">Comment to be displayed</span>
              <input
                className="functionCommentInput"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></input>
            </div>
            <span className="problemNameText">Function parameters</span>
            {list.map((data, index) => {
              return (
                <div className="functionNameParameterDiv">
                  <div className="functionNameDiv">
                    <select
                      className="functionNameInput"
                      name="dataType"
                      onChange={(e) => {
                        handleDataType(e, index);
                      }}
                    >
                      {returntypeoptions.map((option, index) => {
                        return <option key={index}>{option}</option>;
                      })}
                    </select>
                  </div>
                  <div className="functionNameDiv">
                    <input
                      name="value"
                      className="functionNameInput"
                      placeholder="Param name"
                      onChange={(e) => {
                        handleDataType(e, index);
                      }}
                    ></input>
                  </div>
                </div>
              );
            })}

            <div className="generateCodeDiv">
              <button
                className="publishChangesButton"
                onClick={() => {
                  handleDefaultCode();
                }}
              >
                Generate code
              </button>
              <button
                className="addParameterButton"
                onClick={() => {
                  dispatch(
                    addTofunctionParameter({
                      dataType: "int",
                      value: "",
                    })
                  );
                  list.push({
                    dataType: "int",
                    value: "",
                  });
                }}
              >
                Add parameter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
