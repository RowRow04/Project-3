import { createSlice } from "@reduxjs/toolkit";

export const mazeSlice = createSlice({
  name: "maze",
  initialState: {
    mazeAnswers: {},
    mazeRoutes: {},
  },
  reducers: {
    handleAnswer: (state, action) => {
      const { studentId, key, value } = action.payload;
      const answersList = JSON.parse(JSON.stringify(state.mazeAnswers));
      if (
        answersList?.hasOwnProperty(studentId) &&
        answersList?.[studentId]?.hasOwnProperty(key)
      ) {
        answersList[studentId][key] = [...value];
      } else {
        answersList[studentId] = {};
        answersList[studentId][key] = [...value];
      }
      state.mazeAnswers = answersList;
    },
    saveMazeRoute: (state, action) => {
      const { studentId, key, value } = action.payload;
      const mazeRouteList = JSON.parse(JSON.stringify(state.mazeRoutes));
      if (mazeRouteList?.hasOwnProperty(studentId)) {
        mazeRouteList[studentId][key] = [...value];
      } else {
        mazeRouteList[studentId] = {};
        mazeRouteList[studentId][key] = [...value];
      }
      state.mazeRoutes = mazeRouteList;
    },
    handlePosition: (state, action) => {
      const { studentId, key, index, value } = action.payload;
      const answersList = JSON.parse(JSON.stringify(state.mazeAnswers));
      if (
        answersList?.hasOwnProperty(studentId) &&
        answersList?.[studentId]?.hasOwnProperty(key)
      ) {
        answersList[studentId][key][index]["position"] = [...value];
      }
      state.mazeAnswers = answersList;
    },
  },
});

export const { handleAnswer, saveMazeRoute, handlePosition } =
  mazeSlice.actions;

export default mazeSlice.reducer;
