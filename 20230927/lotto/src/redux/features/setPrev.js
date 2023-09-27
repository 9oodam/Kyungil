const { createSlice } = require("@reduxjs/toolkit");

export const setPrevBalls = createSlice({
  name: "setPrevBalls",
  initialState: {
    prevBall : []
  },
  reducers: {
    setPrev: (state, action) => {
        const arr = [];
        for(let i=1; i<=45; i++) {
            arr.push(i);
        }
        state.prevBall = arr;
    },
    changePrev: (state, action) => {
        let index = state.prevBall.indexOf(action.payload);
        state.prevBall.splice(index, 1);
    }
  },
});

export const { setPrev, changePrev } = setPrevBalls.actions;
