import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialValue,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1;
        }
    }
})

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;