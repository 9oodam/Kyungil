const { createSlice } = require("@reduxjs/toolkit");

export const setPostBalls = createSlice({
  name: "setPostBalls",
  initialState: {
    postBall : [],
    bonusBall : ''
  },
  reducers: {
    setPost: (state, action) => {
        state.postBall.push(action.payload)
    },
    setBonus: (state, action) => {
        state.bonusBall = action.payload;
    },
    reset: (state, action) => {
        state.postBall = [];
        state.bonusBall = '';
    }
  },
});

export const { setPost, setBonus, reset } = setPostBalls.actions;
