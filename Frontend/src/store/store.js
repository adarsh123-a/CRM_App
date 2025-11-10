import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./leadsSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

export default store;
