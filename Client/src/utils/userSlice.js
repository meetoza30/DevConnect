import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return { ...state, ...action.payload }; // Merge updates
        },
        removeUser: (state, action) => {
            return null;
        },
        addSkills: (state, action) => {
            return { ...state, skills: action.payload };
        },
         addOtherUser :(state, action)=> {
            return {...state, ...action.payload}
         }
    }
});

export const {addUser, removeUser, addSkills, addOtherUser} = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;