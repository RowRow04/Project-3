import { createSlice } from "@reduxjs/toolkit";

export const dragDropSlice = createSlice({
  name: "dragdrop",
  initialState: {
    dragDropChoices: {},
  },
  reducers: {
    handleDragDropChange: (state, action) => {
      const { studentId, key, value } = action.payload;
      const dragdrop = JSON.parse(JSON.stringify(state.dragDropChoices));
      if (dragdrop?.hasOwnProperty(studentId)) {
        dragdrop[studentId][key] = [...value];
      } else {
        dragdrop[studentId] = {};
        dragdrop[studentId][key] = [...value];
      }
      state.dragDropChoices = dragdrop;
    },
    handleDragDrop: (state, action) => {
      const { studentId, key, value } = action.payload;
      const dragdrop = JSON.parse(JSON.stringify(state.dragDropChoices));
      if (dragdrop?.hasOwnProperty(studentId)) {
        dragdrop[studentId][key] = [...value];
      } else {
        dragdrop[studentId] = {};
        dragdrop[studentId][key] = [...value];
      }
      state.dragDropChoices = dragdrop;
    },
  },
});

export const { handleDragDropChange, handleDragDrop } = dragDropSlice.actions;

export default dragDropSlice.reducer;
