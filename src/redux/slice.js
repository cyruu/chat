import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "charSlice",
  initialState: {
    loggedInUser: null,
    allChatsIds: [],
    allMessages: [],
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    // set ids of all users with conversations
    setAllChatsIds: (state, action) => {
      state.allChatsIds = action.payload.allConversationsIds;
    },
  },
});

export default chatSlice.reducer;
export const { setLoggedInUser, setAllChatsIds } = chatSlice.actions;
