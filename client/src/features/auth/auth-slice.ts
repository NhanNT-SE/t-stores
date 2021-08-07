import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: "",
  reducers: {
      login(state,action: PayloadAction<any>){},
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default  authReducer;