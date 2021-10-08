import React from "react";
import { ScrollView } from "react-native";
import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function Categories() {
  const items = [
    {
      image: require("../assets/images/shopping-bag.png"),
      text: "Pick-up",
    },
    {
      image: require("../assets/images/soft-drink.png"),
      text: "Drinks",
    },
    {
      image: require("../assets/images/bread.png"),
      text: "Bakery",
    },
    {
      image: require("../assets/images/fast-food.png"),
      text: "Fast Foods",
    },
    {
      image: require("../assets/images/deals.png"),
      text: "Deals",
    },
    {
      image: require("../assets/images/coffee.png"),
      text: "Coffee",
    },
    {
      image: require("../assets/images/desserts.png"),
      text: "Desserts",
    },
  ];

  return (
    <View style={tw`mt-2 bg-white py-2 pl-5`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={tw`items-center mr-10`}>
            <Image
              source={item.image}
              style={{ width: 50, height: 40, resizeMode: "contain" }}
            />
            <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
