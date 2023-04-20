import { createSlice } from "@reduxjs/toolkit";

const readData = JSON.parse(localStorage.getItem("userState"))

const initialState = {
  email: readData?.email || "",
  password: readData?.password || "",  // | is called the pipe operator
  id: readData?.id || "",
};

// JSON.stringify is used to write data, it converts to JSON Object
// JSON.parse is used to read data, it reads JSON object

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      const {email, id, password} = action.payload
      state.email = email;
      state.id = id
      state.password = password


      localStorage.setItem("userState", JSON.stringify(state))
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.id = "";

      localStorage.removeItem("userState")
    },
  },
});

export const { login, logout } = userSlice.actions;
