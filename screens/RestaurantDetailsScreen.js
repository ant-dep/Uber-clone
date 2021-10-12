import React from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import About from "../EatsComponents/RestaurantDetail/About";
import tw from "tailwind-react-native-classnames";
import MenuItem from "../EatsComponents/RestaurantDetail/MenuItem";
import ViewCart from "../EatsComponents/RestaurantDetail/ViewCart";

export default function RestaurantDetailsScreen({ route, navigation }) {
  return (
    <View style={tw`bg-white`}>
      <About route={route} />
      <MenuItem restaurantName={route.params.name} />
      <ViewCart navigation={navigation} />
    </View>
  );
}
