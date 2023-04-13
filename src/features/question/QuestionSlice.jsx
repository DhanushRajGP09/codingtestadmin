import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionSlice = createSlice({
  name: "Problem",
  initialState: {
    ProblemName: "",
    ProblemDescription: "",
    ProblemDifficulty: "",
    bodyLineNumber: [2],

    testCases: [],
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
} = QuestionSlice.actions;
export const getProblemName = (state) => state.Problem.ProblemName;

export const getProblemDescription = (state) =>
  state.Problem.ProblemDescription;
export const getBodyLineNumber = (state) => state.Problem.bodyLineNumber;
export const getLibraryQuestions = (state) => state.Problem.libraryQuestions;
export const getProblemDifficulty = (state) => state.Problem.ProblemDifficulty;
export const getTestCases = (state) => state.Problem.testCases;

export default QuestionSlice.reducer;
