import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "./slices/reservationSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    reservations: reservationReducer,
    theme: themeReducer,
  },
});
