import { createSlice } from "@reduxjs/toolkit";

export const scoreslice = createSlice({
  name: "score",
  initialState: {
    submissionStatus: false,
    score: [],
  },
  reducers: {
    submitScores: (state) => {
      state.loading = true;
    },
    submitScoreSuccess: (state) => {
      state.loading = false;
    },
    submitScoreFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  submitScores,
  submissionStatus,
  submitScoreFailure,
  submitScoreSuccess,
} = scoreslice.actions;

export default scoreslice.reducer;
