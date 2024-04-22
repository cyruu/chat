import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "charSlice",
  initialState: {
    loggedInUser: null,
    selectedChatUserId: null,
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
    // set selected chat user
    setSelectedChatUserId: (state, action) => {
      state.selectedChatUserId = action.payload.userId;
      console.log(state.selectedChatUserId);
    },
  },
});

export default chatSlice.reducer;
export const { setLoggedInUser, setAllChatsIds, setSelectedChatUserId } =
  chatSlice.actions;
