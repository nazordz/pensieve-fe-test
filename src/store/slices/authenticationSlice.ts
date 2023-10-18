import { User } from "@/models";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AuthenticationSliceState {
  accessToken: string;
  refreshToken: string;
  user: User|null;
}

const initialState: AuthenticationSliceState = {
  accessToken: '',
  refreshToken: '',
  user: null,
}

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    setAuthenticationData(state, action: PayloadAction<AuthenticationSliceState>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.user = null;
    }
  }
})

export const { setAuthenticationData, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;