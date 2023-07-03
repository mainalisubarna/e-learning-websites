import { createSlice } from "@reduxjs/toolkit";

interface authInterface {
  isLogged: boolean;
  jwtToken: string;
  role: string;
}

const initialState: authInterface = {
  isLogged: false,
  jwtToken: "",
  role: "",
};

const authSlice: any = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, data) => {
      (state.isLogged = true),
        (state.jwtToken = data.payload.jwt),
        (state.role = data.payload.roles);
    },
    logout: (state) => {
      (state.isLogged = false), (state.jwtToken = ""), (state.role = "");
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
