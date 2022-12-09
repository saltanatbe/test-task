import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loggedInUser: null,
  loading: true,
  error: null,
  msg: "",
  pageUser: null,
};

export const initialize = createAsyncThunk("initialize", async () => {
  const api = await fetch(`https://reqres.in/api/users?page=2`);
  const users = await api.json();

  return users.data;
});

export const userSlice = createSlice({
  name: "userData",
  initialState,
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

      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].email === login.email) {
          console.log("yes ");
          state.loggedInUser = state.users[i];
          console.log(state);
        }
      }
    },
    getPageUser: (state, action) => {
      const data = action.payload;
      console.log(data.id);

      for (let i = 0; i < state.users.length; i++) {
        console.log(state.users[i].id);
        console.log(state.users[i].id == data);

        if (state.users[i].id == data.id) {
          state.pageUser = state.users[i];
          console.log(state.pageUser);
        }
      }
    },
  },
  extraReducers: {
    [initialize.pending]: (state, action) => {
      state.loading = true;
    },
    [initialize.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.users = action.payload;
    },
    [initialize.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logOut, checkCredentials, getPageUser } =
  userSlice.actions;
export default userSlice.reducer;
