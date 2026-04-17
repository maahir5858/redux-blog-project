import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 1, name: 'Dan Abramov'},
    {id: 2, name: 'Andrew Clark'}
]

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users

// export const {} = usersSlice.actions;

export default usersSlice.reducer;