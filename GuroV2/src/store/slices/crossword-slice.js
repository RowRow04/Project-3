import { createSlice } from "@reduxjs/toolkit";

export const crosswordSlice = createSlice({
  name: "crossword",
  initialState: {
    crosswordAnswers: {},
  },
  reducers: {
    handlePress: (state, action) => {
      const { studentId, key, value } = action.payload;
      const answersList = JSON.parse(JSON.stringify(state.crosswordAnswers));
      if (
        answersList?.hasOwnProperty(studentId) &&
        answersList?.[studentId]?.hasOwnProperty(key)
      ) {
        answersList[studentId][key] = [...value];
      } else {
        answersList[studentId] = {};
        answersList[studentId][key] = [...value];
      }
      state.crosswordAnswers = answersList;
    },
  },
});

export const { handlePress } = crosswordSlice.actions;

export default crosswordSlice.reducer;
