import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    users: [
      {
        name: "a",
        surname: "a",
        email: "a",
        username: "a",
        password: "a",
      },
      {
        name: "b",
        surname: "b",
        email: "b",
        username: "b",
        password: "b",
      },
    ],
    loggedInUser: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const temp = action.payload;
      state.users = [...state.users, temp];
      state.loggedInUser = temp;
    },
    logOut: (state) => {
      state.loggedInUser = null;
    },
    checkCredentials: (state, action) => {
      const login = action.payload;
      state.users.forEach((user) => {
        if (
          user.username === login.username &&
          user.password === login.password
        ) {
          state.loggedInUser = { user };
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logOut, checkCredentials } = userSlice.actions;
export const selectusers = (state) => state.userData;
export default userSlice.reducer;
