import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * UserSlice is the slice of the redux state with initial values and reducer functions
 */

const initialState = {
  users: [],
  loggedInUser: null,
  loading: true,
  error: null,
  msg: "",
  pageUser: null,
};

// this function initializes the users list by getting value from the api
//it is asynchronious therefore used createAsyncThunk
export const initialize = createAsyncThunk("initialize", async () => {
  const api = await fetch(`https://reqres.in/api/users?page=2`);
  const users = await api.json();

  return users.data;
});

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    //sets data when the user registers
    setCredentials: (state, action) => {
      const temp = action.payload;
      state.users = [...state.users, temp];
      state.loggedInUser = temp;
    },
    //logouts
    logOut: (state) => {
      state.loggedInUser = null;
    },
    //checks the credentials when user authorizes
    checkCredentials: (state, action) => {
      const login = action.payload;

      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].email === login.email) {
          state.loggedInUser = state.users[i];
        }
      }
    },
    //gets the user by id
    getPageUser: (state, action) => {
      const data = action.payload;

      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id == data.id) {
          state.pageUser = state.users[i];
        }
      }
    },
  },
  //extra reducers for the initialize function
  //to monitor its state and accordingly change values
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
