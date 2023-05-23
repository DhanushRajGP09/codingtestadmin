import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TestSlice = createSlice({
  name: "Test",
  initialState: {
    Candidates: [],
    SelectedQuestionId: [],
    SelectedQuestionsData: [],
    SelectedMultipleQuestionId: [],
    TestDurationHour: "01",
    TestDurationMinutes: "50",
    TestId: "",
    TestName: "",
    AllTestData: [],
    particularTestData: {},
    TestStartTime: new Date(),
    TestEndTime: new Date(),
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
    addSelectedMultipleQuestionId: (state, { payload }) => {
      let isPresent = false;
      for (let item of state.SelectedMultipleQuestionId) {
        if (item === payload) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        state.SelectedMultipleQuestionId.unshift(payload);
      }
    },
    removeFromSelectedMultipleQuestionId: (state, action) => {
      state.SelectedMultipleQuestionId =
        state.SelectedMultipleQuestionId.filter(
          (data) => data !== action.payload
        );
    },
    clearSelectedQuestionId: (state, action) => {
      state.SelectedQuestionId = [];
    },
    clearSelectedMultipleQuestionId: (state, action) => {
      state.SelectedMultipleQuestionId = [];
    },

    addSelectedQuestionData: (state, { payload }) => {
      state.SelectedQuestionsData.unshift(payload);
    },
    addAllTestData: (state, { payload }) => {
      state.AllTestData = payload;
    },
    addTestStartTime: (state, { payload }) => {
      state.TestStartTime = payload;
    },
    addTestEndTime: (state, { payload }) => {
      state.TestEndTime = payload;
    },
    addTestName: (state, { payload }) => {
      state.TestName = payload;
    },
    addParticularTestData: (state, { payload }) => {
      state.particularTestData = payload;
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
    addTestId: (state, action) => {
      state.TestId = action.payload;
    },

    concateSelectedQuestionID: (state, action) => {
      state.SelectedQuestionId = state.SelectedQuestionId.concat(
        state.SelectedMultipleQuestionId
      );
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
  addSelectedMultipleQuestionId,
  removeFromSelectedMultipleQuestionId,
  clearSelectedMultipleQuestionId,
  concateSelectedQuestionID,
  addAllTestData,
  addTestId,
  addParticularTestData,
  addTestStartTime,
  addTestEndTime,
  addTestName,
} = TestSlice.actions;

export const getAllTestData = (state) => state.Test.AllTestData;
export const getTestStartTime = (state) => state.Test.TestStartTime;
export const getParticularTestData = (state) => state.Test.particularTestData;
export const getCandidates = (state) => state.Test.Candidates;
export const getSelectedQuestionId = (state) => state.Test.SelectedQuestionId;
export const getSelectedQuestionData = (state) =>
  state.Test.SelectedQuestionsData;
export const getTestHour = (state) => state.Test.TestDurationHour;
export const getTestId = (state) => state.Test.TestId;
export const getTestMinutes = (state) => state.Test.TestDurationMinutes;
export const getSelectedMultipleQuestions = (state) =>
  state.Test.SelectedMultipleQuestionId;
export const getTestEndTime = (state) => state.Test.TestEndTime;
export const getTestName = (state) => state.Test.TestName;

export default TestSlice.reducer;
