import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizObject: {},
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    replaceQuiz: (state, action) => {
      state.quizObject = action.payload
    },
  },
})

export const { replaceQuiz } = quizSlice.actions

export default quizSlice.reducer