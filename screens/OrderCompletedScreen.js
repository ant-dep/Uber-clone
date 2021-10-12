import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectCart, resetCart } from "../slices/navSlice";
import LottieView from "lottie-react-native";

export default function OrderCompletedScreen() {
  const dispatch = useDispatch();
  const resetCartItems = () =>
    dispatch(
      resetCart({
        payload: { items: [], restaurantName: "" },
      })
    );

  const items = useSelector(selectCart);
  const cartItems = items.items;
  const restaurantName = items.restaurantName;
  const total = cartItems
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  let formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalUSD = formatter.format(total);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <LottieView
        style={tw`h-40 self-center mb-5`}
        source={require("../assets/animations/check-mark.json")}
        autoPlay
        speed={0.65}
        loop={false}
      />
      <Text>
        Your order at {restaurantName} has been placed for {totalUSD}
      </Text>
      <LottieView
        style={tw`h-40 self-center mb-5`}
        source={require("../assets/animations/cooking.json")}
        autoPlay
        speed={0.85}
        loop={false}
      />
    </SafeAreaView>
  );
}
