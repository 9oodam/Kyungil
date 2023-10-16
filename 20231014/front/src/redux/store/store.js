import { configureStore } from "@reduxjs/toolkit";
import {loginUser} from "../features/login";

const store = configureStore({
  reducer: {
    loginUser: loginUser.reducer,
  },
});

export { store };
