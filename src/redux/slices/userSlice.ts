import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateType } from "./../../types/index";

const initialState: UserStateType = {
  uid: "",
  email: "",
  username: "",
  photoURL: "",
  bio: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStateType>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.photoURL = action.payload.photoURL;
      state.bio = action.payload.bio;
    },
    clearUser: (state) => {
      state.uid = "";
      state.email = "";
      state.username = "";
      state.photoURL = "";
      state.bio = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
