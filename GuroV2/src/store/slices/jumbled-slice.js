import { createSlice } from "@reduxjs/toolkit";

export const jumbledSlice = createSlice({
  name: "jumbled",
  initialState: {
    guesswords: {},
    answers: {},
  },
  reducers: {
    handleClickGuess: (state, action) => {
      const { key, value } = action.payload;
      const answersList = JSON.parse(JSON.stringify(state.answers));
      if (answersList?.hasOwnProperty(key)) {
        answersList[key] = value;
      } else {
        answersList[key] = value;
      }
      state.answers = answersList;
    },
    handleGuessword: (state, action) => {
      const { key, value } = action.payload;
      const guesswordsList = JSON.parse(JSON.stringify(state.guesswords));
      if (guesswordsList?.hasOwnProperty(key)) {
        guesswordsList[key] = value;
      } else {
        guesswordsList[key] = value;
      }
      state.guesswords = guesswordsList;
    },
  },
});

export const { handleClickGuess, handleGuessword } = jumbledSlice.actions;

export default jumbledSlice.reducer;
