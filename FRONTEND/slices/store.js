import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
