import React from "react";
import "./Dashboard.css";
import assesment from "../../Assets/Icons/assesment.png";
import mylibrary from "../../Assets/Icons/mylibrary.png";
import { useNavigate } from "react-router";

import axios from "axios";
import {
  addLibraryQuestions,
  getQuestionID,
} from "../../features/question/QuestionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();

  const getquestionid = useSelector(getQuestionID);
  console.log("questionID", getquestionid);

  const token = JSON.parse(localStorage.getItem("token"));

  const dispatch = useDispatch();

  const getAllTestQuestions = () => {
    axios
      .get(
        "http://139.59.56.122:5000/api/question",

        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            itemsPerPage: 20,
            page: 1,
          },
        }
      )
      .then(function (response) {
        console.log("allQuestions", response);
        dispatch(addLibraryQuestions(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboardHeader"> Admin Dashboard</div>
      <div className="dashboardBodyDiv">
        <div
          className="allTestContainer"
          onClick={() => {
            navigate("/home/assesments");
          }}
        >
          <img src={assesment} className="allTestImage"></img>
          <span className="allTestText">Assesments</span>
        </div>
        <div
          className="allTestContainer"
          onClick={() => {
            navigate("/home");
            getAllTestQuestions();
          }}
        >
          <img src={mylibrary} className="allTestImage"></img>
          <span className="allTestText">My Library</span>
        </div>
      </div>
    </div>
  );
}
