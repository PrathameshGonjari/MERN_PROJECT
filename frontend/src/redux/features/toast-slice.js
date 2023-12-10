import { createSlice } from "@reduxjs/toolkit";
import { messages } from "@constants/messages";

export const initialState = {
  showToast: false,
  message: messages.DEFAULT,
  type: "error",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showSuccessToast(_, action) {
      const updatedState = {
        showToast: true,
        message: action.payload,
        type: "success",
      };
      return updatedState;
    },
    showErrorToast(_, action) {
      const updatedState = {
        showToast: true,
        message: action.payload,
        type: "error",
      };
      return updatedState;
    },
    resetToast() {
      return initialState;
    },
  },
});

export const { showSuccessToast, showErrorToast, resetToast } =
  toastSlice.actions;

export default toastSlice.reducer;
