import React, { useEffect, useState } from "react";
import { View } from "react-native";
import About from "../EatsComponents/RestaurantDetail/About";
import tw from "tailwind-react-native-classnames";
import MenuItem from "../EatsComponents/RestaurantDetail/MenuItem";
import ViewCart from "../EatsComponents/RestaurantDetail/ViewCart";
import { config } from "../api/config";
import axios from "axios";

export default function RestaurantDetailsScreen({ route, navigation }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get(config.api_url + "/api/v1/foods")
      .then((response) => {
        console.log("getFoods", response.data);
        setFoods(response.data);
      })
      .catch((err) => {
        console.log("getFoods", err);
      });
  }, []);

  return (
    <View style={tw`bg-white`}>
      <About route={route} />
      <MenuItem
        restaurantName={route.params.name}
        restaurantImage={route.params.image}
        foods={foods}
      />
      <ViewCart navigation={navigation} />
    </View>
  );
}
