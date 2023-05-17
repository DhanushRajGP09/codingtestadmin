import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TestSlice = createSlice({
  name: "Test",
  initialState: {
    Candidates: [],
    SelectedQuestionId: [],
    SelectedQuestionsData: [],
    TestDurationHour: "01",
    TestDurationMinutes: "50",
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
    addTestDurationHour: (state, action) => {
      state.TestDurationHour = action.payload;
    },
    addTestDurationMinutes: (state, action) => {
      state.TestDurationMinutes = action.payload;
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
  addTestDurationHour,
  addTestDurationMinutes,
} = TestSlice.actions;

export const getCandidates = (state) => state.Test.Candidates;
export const getSelectedQuestionId = (state) => state.Test.SelectedQuestionId;
export const getSelectedQuestionData = (state) =>
  state.Test.SelectedQuestionsData;
export const getTestHour = (state) => state.Test.TestDurationHour;
export const getTestMinutes = (state) => state.Test.TestDurationMinutes;

export default TestSlice.reducer;
