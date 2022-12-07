import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../users/userSlice";

export default configureStore({ reducer: { userData: counterReducer } });
