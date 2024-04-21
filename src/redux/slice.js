import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "charSlice",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const { setLoggedInUser } = chatSlice.actions;
