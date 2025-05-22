import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  saveForLater: null,
};

const reservationSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookRoom: (state, action) => {
      state.bookings.push(action.payload);
    },
    setSavedBooking: (state, action) => {
      state.saveForLater = action.payload;
    },
  },
});

export const { bookRoom, setSavedBooking } = reservationSlice.actions;
export default reservationSlice.reducer;
