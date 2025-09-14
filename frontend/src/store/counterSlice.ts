import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    count: 0,
    selectedChat: ''
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
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        }
    }
})

export const { increment, decrement, setSelectedChat } = counterSlice.actions;

export default counterSlice.reducer;