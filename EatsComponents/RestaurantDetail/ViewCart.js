import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/navSlice";

export default function ViewCart() {
  const items = useSelector(selectCart);
  const cartItems = items.items;
  const total = cartItems
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  let formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalUSD = formatter.format(total);

  return (
    <>
      {total ? ( // IF there's something checked, show the button
        <View
          style={tw`flex-1 items-center justify-center flex-row absolute bottom-28 z-20`}
        >
          <View style={tw`flex-row justify-center w-full`}>
            <TouchableOpacity
              style={tw`bg-black flex-row justify-around items-center p-3 rounded-full w-72 relative`}
            >
              <Text style={tw`text-white text-lg font-semibold`}>
                View Cart
              </Text>
              <Text style={tw`text-white text-lg font-semibold`}>-</Text>
              <Text style={tw`text-white text-lg font-semibold`}>
                {totalUSD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></> // Otherwise, hide it
      )}
    </>
  );
}
