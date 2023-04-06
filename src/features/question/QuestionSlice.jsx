import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionSlice = createSlice({
  name: "Problem",
  initialState: {
    ProblemName: "",
    ProblemDescription: "",
    bodyLineNumber: [2],
  },
  reducers: {
    addProblemName: (state, { payload }) => {
      state.ProblemName = payload;
    },
    addProblemDescription: (state, { payload }) => {
      state.ProblemDescription = payload;
    },
    addbodyLineNumber: (state, { payload }) => {
      state.bodyLineNumber.push(payload);
    },
    removebodyLineNumber: (state, { payload }) => {
      state.bodyLineNumber.pop();
    },
  },
});

export const {
  addProblemName,
  addProblemDescription,
  addbodyLineNumber,
  removebodyLineNumber,
} = QuestionSlice.actions;
export const getProblemName = (state) => state.Problem.ProblemName;

export const getProblemDescription = (state) =>
  state.Problem.ProblemDescription;
export const getBodyLineNumber = (state) => state.Problem.bodyLineNumber;

export default QuestionSlice.reducer;
