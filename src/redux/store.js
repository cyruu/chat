import { configureStore } from "@reduxjs/toolkit";
import chatReducers from "./slice";
const reduxStore = configureStore({
  reducer: chatReducers,
});

export default reduxStore;
