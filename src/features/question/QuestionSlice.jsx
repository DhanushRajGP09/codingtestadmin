import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuestionSlice = createSlice({
  name: "Problem",
  initialState: {
    ProblemName: "",
    ProblemDescription: "",
  },
  reducers: {
    addProblemName: (state, { payload }) => {
      state.ProblemName = payload;
    },
    addProblemDescription: (state, { payload }) => {
      state.ProblemDescription = payload;
    },
  },
});

export const { addProblemName, addProblemDescription } = QuestionSlice.actions;
export const getProblemName = (state) => state.Problem.ProblemName;

export const getProblemDescription = (state) =>
  state.Problem.ProblemDescription;

export default QuestionSlice.reducer;
