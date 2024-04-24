import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "charSlice",
  initialState: {
    loggedInUser: null,
    selectedChatUserId: null,
    allChatsIds: [],
    allMessages: [],
    messageSentStatus: false,
    filteredUsers: [],
    // am i searchin for a user
    isSearching: false,
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
    },
    setAllMessages: (state, action) => {
      state.allMessages = action.payload.allMessages;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload.filteredusers;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload.isSearching;
    },
  },
});

export default chatSlice.reducer;
export const {
  setLoggedInUser,
  setAllChatsIds,
  setSelectedChatUserId,
  setAllMessages,
  setFilteredUsers,
  setIsSearching,
} = chatSlice.actions;
