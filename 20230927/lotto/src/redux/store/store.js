import { configureStore } from "@reduxjs/toolkit";

import { setPrevBalls } from "../features/setPrev";
import { setPostBalls } from "../features/setPost";

const store = configureStore({
  reducer: {
    setPrevBalls: setPrevBalls.reducer,
    setPostBalls: setPostBalls.reducer
  },
});

export { store };
