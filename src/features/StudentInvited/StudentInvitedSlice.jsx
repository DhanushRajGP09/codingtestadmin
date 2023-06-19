import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const StudentInvitedSlice = createSlice({
  name: "Student",
  initialState: {
    StudentName: "",
    StudentReviewSelected: [],
  },
  reducers: {
    addStudentName: (state, { payload }) => {
      state.StudentName = payload;
    },
    addToStudentReviewSelected: (state, action) => {
      let isPresent = false;
      for (let item of state.StudentReviewSelected) {
        if (item === action.payload) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        console.log("Got a hit");
        state.StudentReviewSelected.unshift(action.payload);
      }
    },
    filterReviewSelected: (state, action) => {
      state.StudentReviewSelected = state.StudentReviewSelected.filter(
        (data) => data !== action.payload
      );
    },
    clearReviewSelected: (state, action) => {
      state.StudentReviewSelected = [];
    },
  },
});

export const {
  addStudentName,
  addToStudentReviewSelected,
  filterReviewSelected,
  clearReviewSelected,
} = StudentInvitedSlice.actions;
export const getStudentName = (state) => state.Student.StudentName;
export const getReviewSelected = (state) => state.Student.StudentReviewSelected;

export default StudentInvitedSlice.reducer;
