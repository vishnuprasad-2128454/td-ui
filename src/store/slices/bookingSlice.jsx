import {createSlice} from '@reduxjs/toolkit'


const bookingSlice = createSlice({
    name: 'booking',
    initialState:[],
    reducers: {
        bookRoom: (state, action) => {
            state.push(action.payload);
        },
        saveForLater: (state, action) => {
            state.push(action.payload)
        }
    }
});

export const {bookRoom} = bookingSlice.actions
export default bookingSlice.reducer