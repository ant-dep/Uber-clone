import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Just to have someting on main page before any search
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

export default function RestaurantItems(props) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity key={index} activeOpacity={1} style={tw`mb-1`}>
          <View style={tw`mt-2 p-3 bg-white`}>
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => (
  <>
    <Image source={{ uri: props.image }} style={tw`w-full h-36`} />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="white" />
    </TouchableOpacity>
  </>
);
const RestaurantInfo = (props) => (
  <View style={tw`flex-row justify-between items-center mt-3`}>
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>Time</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
);
