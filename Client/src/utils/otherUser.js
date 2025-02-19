import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "otherUser",
    initialState: null,
    reducers: {
       
         addOtherUser :(state, action)=> {
            return action.payload;
         }
    }
});

export const {addOtherUser} = userSlice.actions;
const otherUserReducer = userSlice.reducer;

export default otherUserReducer;