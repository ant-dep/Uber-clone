import React from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function OrderItem({ item }) {
  const { title, price } = item;
  return (
    <View
      style={tw`flex-row justify-between w-full px-8 py-6 border-b border-gray-300 `}
    >
      <Text style={{ fontWeight: "700", fontSize: 16 }}>{title}</Text>
      <Text style={{ opacity: 0.7, fontSize: 16 }}>${price}</Text>
    </View>
  );
}
