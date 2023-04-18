import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  id: "",
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      const {email, id, password} = action.payload
      state.email = email;
      state.id = id
      state.password = password
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.id = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
