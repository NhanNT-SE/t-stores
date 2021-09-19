import { RootState } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: { currentUser: null, error:"" },
  reducers: {
    login(state, action: PayloadAction<any>) {},
    checkAuth() {},
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelectors = {
  selectCurrentUser: (state: RootState) => state.auth.currentUser,
};
const authReducer = authSlice.reducer;
export default authReducer;
