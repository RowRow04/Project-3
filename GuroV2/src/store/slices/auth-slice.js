import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginLoading: false,
    userDetails: {},
    token: null,
  },
  reducers: {
    login(state) {
      state = { ...state, loginLoading: true };
      return state;
    },
    loginSuccess(state, { payload }) {
      state = {
        ...state,
        loginLoading: false,
        userDetails: payload.data.data,
        token: payload.data.token,
      };
      return state;
    },
    loginFailed(state) {
      state = { ...state, loginLoading: false };
      return state;
    },
  },
});

export const { login, loginSuccess, loginFailed } = authSlice.actions;

export default authSlice.reducer;
