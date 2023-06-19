import { configureStore } from "@reduxjs/toolkit";

import QuestionReducer from "../features/question/QuestionSlice";
import TestReducer from "../features/Test/TestSlice";
import StudentReducer from "../features/StudentInvited/StudentInvitedSlice";

export const store = configureStore({
  reducer: {
    Problem: QuestionReducer,
    Test: TestReducer,
    Student: StudentReducer,
  },
});
