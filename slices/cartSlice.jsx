import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  restaurantName: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state = initialState, action) => {
      let newState = { ...state };

      if (action.payload.payload.checkboxValue) {
        newState = {
          items: [...newState.items, action.payload.payload],
          restaurantName: action.payload.payload.restaurantName,
        };
      } else {
        newState = {
          items: [
            ...newState.cart.items.filter(
              (item) => item.title !== action.payload.payload.title
            ),
          ],
          restaurantName: action.payload.payload.restaurantName,
        };
      }

      console.log(newState, "👉");
      return newState;
    },
    resetCart: (state) => {
      state = { items: [], restaurantName: "" };
    },
  },
});

export const { setCart, resetCart } = cartSlice.actions;

// selectors
export const selectCart = (state) => state.cart;

//*  createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
//
// *//
export default cartSlice.reducer;
