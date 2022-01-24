import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

// Just to have someting on main page before any search
// TODO : ask for location permission and load local restaurants
export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://b-iff.ro/wp-content/uploads/2021/04/Cum-sa-faceti-o-rezervare-la-restaurant.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://b-iff.ro/wp-content/uploads/2021/04/Cum-sa-faceti-o-rezervare-la-restaurant.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1500,
    rating: 4.2,
  },
  {
    name: "India's Grill",
    image_url:
      "https://b-iff.ro/wp-content/uploads/2021/04/Cum-sa-faceti-o-rezervare-la-restaurant.jpg",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 1000,
    rating: 4.9,
  },
];

const RestaurantItem = ({ restaurantData }) => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    console.log("item clicked", item);
    navigation.navigate("RestaurantDetailsScreen", {
      name: item.name,
      image: item.image_url,
      price: item.price,
      reviews: item.review_count,
      rating: item.rating,
      categories: item.categories,
      city: item.location.city,
    });
  };

  return (
    <View style={tw`mt-2`}>
      {restaurantData?.map((item, index) => (
        <RestaurantItemCard
          key={index}
          item={item}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
};

export default RestaurantItem;

const RestaurantItemCard = ({ item, onPress }) => {
  const [loved, setLoved] = useState(false);

  return (
    <TouchableOpacity style={tw`mx-4 mb-4 bg-white`} onPress={onPress}>
      <Image source={{ uri: item.image_url }} style={tw`w-full h-44`} />
      <TouchableOpacity
        style={tw`absolute top-2 right-2`}
        onPress={() => setLoved((e) => !e)}
      >
        <MaterialCommunityIcons
          name={`${loved ? "heart" : "heart-outline"}`}
          size={25}
          color={`${loved ? "red" : "white"}`}
        />
      </TouchableOpacity>
      <View style={tw`flex-row items-center mt-1 px-2 py-1`}>
        <View style={tw`flex-grow`}>
          <Text style={tw`font-bold text-lg`} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={tw`pl-1 text-xs text-gray-700`}>$ 2.50 delivery</Text>
          <View style={tw`flex-row items-center mt-1`}>
            <MaterialCommunityIcons
              name="clock-time-four"
              size={13}
              color="darkgrey"
            />
            <Text style={tw`text-xs text-gray-700`}> 20-30 min</Text>
          </View>
        </View>
        <View
          style={tw`w-8 h-8 justify-center items-center bg-gray-100 rounded-full`}
        >
          <Text style={tw`text-gray-600 text-xs`}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
