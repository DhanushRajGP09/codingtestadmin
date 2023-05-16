import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TestSlice = createSlice({
  name: "Test",
  initialState: {
    Candidates: [],
    SelectedQuestionId: [],
    SelectedQuestionsData: [],
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
    clearSelectedQuestionId: (state, action) => {
      state.SelectedQuestionId = [];
    },
    addSelectedQuestionData: (state, { payload }) => {
      state.SelectedQuestionsData.unshift(payload);
    },
    clearSelectedQuestionData: (state, action) => {
      state.SelectedQuestionsData = [];
    },
  },
});

export const {
  addCandidates,
  removeFromCandidates,
  addSelectedQuestionId,
  removeFromSelectedQuestionId,
  clearSelectedQuestionId,
  addSelectedQuestionData,
  clearSelectedQuestionData,
} = TestSlice.actions;

export const getCandidates = (state) => state.Test.Candidates;
export const getSelectedQuestionId = (state) => state.Test.SelectedQuestionId;
export const getSelectedQuestionData = (state) =>
  state.Test.SelectedQuestionsData;

export default TestSlice.reducer;
