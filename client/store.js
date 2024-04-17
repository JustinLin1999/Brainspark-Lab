import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './reducers/quizSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
})