import { createSlice } from "@reduxjs/toolkit";

const readData = JSON.parse(localStorage.getItem("userState"))

const initialState = {
  name: readData?.name || "",
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
      const {email, id, password, name} = action.payload
      state.email = email;
      state.id = id
      state.password = password
      state.name = name

      localStorage.setItem("userState", JSON.stringify(state))
    },
    updateUserStateData : (state, action, name)=>{
      const {email, id, password} = action.payload
      state.name = name
      state.email = email;
      state.id = id
      state.password = password

      localStorage.setItem("userState", JSON.stringify(state))
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.id = "";
      state.name = ""

      localStorage.removeItem("userState")
    },
  },
});

export const { login, logout, updateUserStateData } = userSlice.actions;
