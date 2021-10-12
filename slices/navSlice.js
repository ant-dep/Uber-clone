import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  car: null,
  cart: { items: [], restaurantName: "" },
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload; // update the state with the action commin in named "payload"
    },
    setDestination: (state, action) => {
      console.log("Destination payload", action.payload);
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      console.log("TraveltimeInfo payload", action);
      state.travelTimeInformation = action.payload;
    },
    setCar: (state, action) => {
      state.car = action.payload;
    },
    setCart: (state = initialState.cart, action) => {
      let newState = { ...state };

      if (action.payload.payload.checkboxValue) {
        newState.cart = {
          items: [...newState.cart.items, action.payload.payload],
          restaurantName: action.payload.payload.restaurantName,
        };
      } else {
        newState.cart = {
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
      state.cart = { items: [], restaurantName: "" };
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setCar,
  setCart,
  resetCart,
} = navSlice.actions;

// selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectCar = (state) => state.nav.car;
export const selectCart = (state) => state.nav.cart;

//*  createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
//
// *//
export default navSlice.reducer;
