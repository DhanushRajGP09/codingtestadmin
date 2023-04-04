import { configureStore } from "@reduxjs/toolkit";

import QuestionReducer from "../features/question/QuestionSlice";

export const store = configureStore({
  reducer: {
    Problem: QuestionReducer,
  },
});
