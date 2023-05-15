import { configureStore } from "@reduxjs/toolkit";

import QuestionReducer from "../features/question/QuestionSlice";
import TestReducer from "../features/Test/TestSlice";

export const store = configureStore({
  reducer: {
    Problem: QuestionReducer,
    Test: TestReducer,
  },
});
