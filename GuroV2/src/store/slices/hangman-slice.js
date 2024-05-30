import { createSlice } from "@reduxjs/toolkit";

export const hangmanSlice = createSlice({
  name: "hangman",
  initialState: {
    correctGuesses: {},
    incorrectGuesses: {},
    resultGuesses: {},
  },
  reducers: {
    handleClickCorrectGuesses: (state, action) => {
      const { key, value } = action.payload;
      const correctGuessesList = JSON.parse(
        JSON.stringify(state.correctGuesses)
      );
      if (correctGuessesList?.hasOwnProperty(key)) {
        correctGuessesList[key] = value;
      } else {
        correctGuessesList[key] = value;
      }
      state.correctGuesses = correctGuessesList;
    },
    handleClickIncorrectGuesses: (state, action) => {
      const { key, value } = action.payload;
      const incorrectGuessesList = JSON.parse(
        JSON.stringify(state.incorrectGuesses)
      );
      if (incorrectGuessesList?.hasOwnProperty(key)) {
        incorrectGuessesList[key] = value;
      } else {
        incorrectGuessesList[key] = value;
      }
      state.incorrectGuesses = incorrectGuessesList;
    },
    handleClickResultGuesses: (state, action) => {
      const { key, value } = action.payload;
      const resultGuessesList = JSON.parse(JSON.stringify(state.resultGuesses));
      if (resultGuessesList?.hasOwnProperty(key)) {
        resultGuessesList[key] = value;
      } else {
        resultGuessesList[key] = value;
      }
      state.resultGuesses = resultGuessesList;
    },
  },
});

export const {
  handleClickCorrectGuesses,
  handleClickIncorrectGuesses,
  handleClickResultGuesses,
} = hangmanSlice.actions;

export default hangmanSlice.reducer;
