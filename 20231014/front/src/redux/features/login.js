const { createSlice } = require("@reduxjs/toolkit");

export const loginUser = createSlice({
  name: "userOrGuest",
  initialState: {
    isLogin: false,
    user_account : ''
  },
  reducers: {
    checkUser: (state, action) => {
      const user_account = action.payload;
      state.isLogin = true;
      state.user_account = user_account;
    },
    resetUser: (state, action) => {
        state.isLogin=false;
        state.user_account = '';
    }
  },
});

export const { checkUser, resetUser } = loginUser.actions;
