import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TestSlice = createSlice({
  name: "Test",
  initialState: {
    Candidates: [],
    SelectedQuestionId: [],
  },
  reducers: {
    addCandidates: (state, { payload }) => {
      let isPresent = false;
      for (let item of state.Candidates) {
        if (item === payload) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        state.Candidates.unshift(payload);
      }
    },

    removeFromCandidates: (state, action) => {
      state.Candidates = state.Candidates.filter(
        (data) => data !== action.payload
      );
    },
    addSelectedQuestionId: (state, { payload }) => {
      let isPresent = false;
      for (let item of state.SelectedQuestionId) {
        if (item === payload) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        state.SelectedQuestionId.unshift(payload);
      }
    },
    removeFromSelectedQuestionId: (state, action) => {
      state.SelectedQuestionId = state.SelectedQuestionId.filter(
        (data) => data !== action.payload
      );
    },
  },
});

export const {
  addCandidates,
  removeFromCandidates,
  addSelectedQuestionId,
  removeFromSelectedQuestionId,
} = TestSlice.actions;

export const getCandidates = (state) => state.Test.Candidates;
export const getSelectedQuestionId = (state) => state.Test.SelectedQuestionId;

export default TestSlice.reducer;
