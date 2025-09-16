import { ChatData } from "@/types/chat";
import { createSlice } from "@reduxjs/toolkit";

type TRedux = {
    count: number;
    selectedChat: ChatData | null
}

const initialValue: TRedux = {
    count: 0,
    selectedChat: null
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