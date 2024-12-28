import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  email: "",
  state: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.email = action.payload?.email || "";
      state.username = action.payload?.username || "";
      state.state = "complete";
    },

    setLogout: (state) => {
      state._id = "";
      state.username = "";
      state.email = "";
    },
  },
});

export const { setUser, setToken, setLogout } = userSlice.actions;
export default userSlice.reducer;
