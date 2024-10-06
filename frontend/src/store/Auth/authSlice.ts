import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "@types";

const initialState: TUser = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDay: "",
  from: "",
  currentCity: "",
  status: "single",
  posts: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload?.data.id;
      state.firstName = action.payload?.data.firstName;
      state.lastName = action.payload?.data.lastName;
      state.email = action.payload?.data.email;
      state.password = action.payload?.data.password;
      state.birthDay = action.payload?.data.birthDay;
      state.from = action.payload?.data.from;
      state.currentCity = action.payload?.data.currentCity;
      state.status = action.payload?.data.status;
      state.posts = action.payload?.data.posts;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
