import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material/Alert";

export interface SnackbarState {
  isOpen: boolean;
  message: string;
  variant: AlertColor;
}

const initialState: SnackbarState = {
  isOpen: false,
  message: "",
  variant: "info",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
      state.variant = action.payload.variant;
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
      state.message = "";
      state.variant = "info";
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
