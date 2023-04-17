import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionSlice = createSlice({
  name: "Problem",
  initialState: {
    ProblemName: "",
    ProblemDescription: "",
    ProblemDifficulty: "",
    bodyLineNumber: [2],
    totalScore: "",
    testCases: [],
    selectedLanguages: [],
    libraryQuestions: [
      {
        questionName: "abc",
        questionDescription: "bcd",
        questionLevel: "Easy",
        score: "5",
        recommendedTime: "20mins",
        category: "programming",
      },
      {
        questionName: "ab",
        questionDescription: "bcd",
        questionLevel: "Easy",
        score: "5",
        recommendedTime: "20mins",
        category: "programming",
      },
      {
        questionName: "bc",
        questionDescription: "bc",
        questionLevel: "Hard",
        score: "5",
        recommendedTime: "40mins",
        category: "programming",
      },
      {
        questionName: "c",
        questionDescription: "c",
        questionLevel: "medium",
        score: "5",
        recommendedTime: "20mins",
        category: "programming",
      },
    ],
  },
  reducers: {
    addProblemName: (state, { payload }) => {
      state.ProblemName = payload;
    },
    addTotalScore: (state, { payload }) => {
      state.totalScore = payload;
    },
    addProblemDescription: (state, { payload }) => {
      state.ProblemDescription = payload;
    },
    addProblemDifficulty: (state, { payload }) => {
      state.ProblemDifficulty = payload;
    },
    addbodyLineNumber: (state, { payload }) => {
      state.bodyLineNumber.push(payload);
    },
    removebodyLineNumber: (state, { payload }) => {
      state.bodyLineNumber.pop();
    },
    addQuestionToLibrary: (state, { payload }) => {
      state.libraryQuestions.push(payload);
    },
    addTestCases: (state, { payload }) => {
      state.testCases.push(payload);
    },
    filterTestCases: (state, action) => {
      state.testCases = state.testCases.filter(
        (data) => data.testcaseID !== action.payload
      );
    },
    addToSelectedLanguages: (state, action) => {
      let isPresent = false;
      for (let item of state.selectedLanguages) {
        if (item === action.payload) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        console.log("Got a hit");
        state.selectedLanguages.unshift(action.payload);
      }
    },
    filterSelectedLanguages: (state, action) => {
      state.selectedLanguages = state.selectedLanguages.filter(
        (data) => data !== action.payload
      );
    },
    addAllLanguages: (state, action) => {
      state.selectedLanguages = action.payload;
    },
    removeAllLanguages: (state, action) => {
      state.selectedLanguages = [];
    },
  },
});

export const {
  addProblemName,
  addProblemDescription,
  addbodyLineNumber,
  removebodyLineNumber,
  addQuestionToLibrary,
  addProblemDifficulty,
  addTestCases,
  filterTestCases,
  addTotalScore,
  addToSelectedLanguages,
  filterSelectedLanguages,
  addAllLanguages,
  removeAllLanguages,
} = QuestionSlice.actions;
export const getProblemName = (state) => state.Problem.ProblemName;

export const getProblemDescription = (state) =>
  state.Problem.ProblemDescription;
export const getBodyLineNumber = (state) => state.Problem.bodyLineNumber;
export const getLibraryQuestions = (state) => state.Problem.libraryQuestions;
export const getProblemDifficulty = (state) => state.Problem.ProblemDifficulty;
export const getTestCases = (state) => state.Problem.testCases;
export const getTotalScore = (state) => state.Problem.totalScore;
export const getSelectedLanguages = (state) => state.Problem.selectedLanguages;
export default QuestionSlice.reducer;
