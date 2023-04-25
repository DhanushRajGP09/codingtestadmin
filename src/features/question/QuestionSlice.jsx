import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionSlice = createSlice({
  name: "Problem",
  initialState: {
    ProblemName: "",
    ProblemDescription: "",
    questionId: "",
    ProblemDifficulty: "",
    bodyLineNumber: [2],
    totalScore: "",
    testCases: [],
    testCaseId: "",
    individualTestCase: {},
    sampleInput: "",
    sampleOutput: "",
    sampleExplaination: "",
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
    addLibraryQuestions: (state, { payload }) => {
      state.libraryQuestions = payload;
    },
    addTestCaseId: (state, { payload }) => {
      state.testCaseId = payload;
    },
    addTotalScore: (state, { payload }) => {
      state.totalScore = payload;
    },
    addIndividualTestCase: (state, { payload }) => {
      state.individualTestCase = payload;
    },
    addSampleInput: (state, { payload }) => {
      state.sampleInput = payload;
    },
    addSampleOutput: (state, { payload }) => {
      state.sampleOutput = payload;
    },
    addSampleExplaination: (state, { payload }) => {
      state.sampleExplaination = payload;
    },
    addQuestionId: (state, { payload }) => {
      state.questionId = payload;
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
      state.testCases = payload;
    },
    filterTestCases: (state, action) => {
      state.testCases = state.testCases.filter(
        (data) => data._id !== action.payload
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
  addQuestionId,
  addSampleInput,
  addSampleOutput,
  addSampleExplaination,
  addTestCaseId,
  addIndividualTestCase,
  addLibraryQuestions,
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
export const getQuestionID = (state) => state.Problem.questionId;
export const getSampleInput = (state) => state.Problem.sampleInput;
export const getSampleOutput = (state) => state.Problem.sampleOutput;
export const getTestCaseId = (state) => state.Problem.testCaseId;
export const getIndividualTestCase = (state) =>
  state.Problem.individualTestCase;
export const getSampleExplaination = (state) =>
  state.Problem.sampleExplaination;
export default QuestionSlice.reducer;
