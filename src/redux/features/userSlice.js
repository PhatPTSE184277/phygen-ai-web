import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        login: (state, action) => action.payload,
        logout: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            return null;
        },
    }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (store) => store.user;
export default userSlice.reducer;