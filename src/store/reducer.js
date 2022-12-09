import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../users/userSlice";

export default configureStore({ reducer: { userData: usersReducer } });
