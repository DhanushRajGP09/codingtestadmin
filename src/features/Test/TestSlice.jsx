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
    adminsData: [],
    AdminDetails: {},
    testDescription: `<p> No description </p>`,
    testInstructions: `<p style={{ marginTop: "1%" }}>
              1. Ensure that you are attempting the test using the correct email
              ID.
            </p>
            <p style={{ marginTop: "1%" }}>
              2. You must click submit after you answer each question
            </p>
            <p style={{ marginTop: "1%" }}>
              3. If you need assistance during the test, click the question
              mark(?) in the lower-right corner of the page to raise a ticket.
            </p>

            <p>
       
              4. Once the test has started, the timer cannot be paused. You have
              to complete the test in one attempt.
            </p>
            <p style={{ marginTop: "1%" }}>
          
              5. Do not close the browser window or tab of the test interface
              before you submit your final answers.
            </p>
            <p style={{ marginTop: "1%" }}>
              6. It is recommended that you ensure that your system meets and
              check your Internet connection before starting the test.
            </p>
            <p style={{ marginTop: "1%" }}>
              7. It is recommended that you attempt the test in an incognito or
              private window so that any extensions installed do not interfere
              with the test environment.
            </p>
            <p style={{ marginTop: "1%" }}>
              8. We recommend that you close all other windows and tabs to
              ensure that there are no distractions.
            </p>`,
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
    AddadminsData: (state, { payload }) => {
      state.adminsData = payload;
    },
    AddTestDescription: (state, { payload }) => {
      state.testDescription = payload;
    },
    AddadminDetails: (state, { payload }) => {
      state.AdminDetails = payload;
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
    moveSelectedQuestionId: (state, action) => {
      state.SelectedQuestionId = action.payload;
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
    addTestInstructions: (state, action) => {
      state.testInstructions = action.payload;
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
  addTestInstructions,
  addSelectedQuestionId,
  removeFromSelectedQuestionId,
  clearSelectedQuestionId,
  addSelectedQuestionData,
  clearSelectedQuestionData,
  addTestDurationHour,
  addTestDurationMinutes,
  moveSelectedQuestionId,
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
  AddadminsData,
  AddadminDetails,

  AddTestDescription,
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
export const getAdminsData = (state) => state.Test.adminsData;
export const getTestName = (state) => state.Test.TestName;
export const getAdminDetails = (state) => state.Test.AdminDetails;
export const getTestInstructions = (state) => state.Test.testInstructions;
export const getTestDescription = (state) => state.Test.testDescription;
export default TestSlice.reducer;
