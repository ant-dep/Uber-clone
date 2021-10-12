import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategories = categories.map(({ title }) => title).join(" • ");
  const descriptionTop = `${formattedCategories}`;
  const descriptionBottom = `🎫 • ${rating} ⭐ (${reviews}+)`;

  return (
    <View>
      <View style={tw`absolute top-0 left-0 w-full`}>
        <RestaurantImage image={image} />
      </View>
      <View style={tw`mt-52 p-2 rounded-t-3xl bg-white`}>
        <RestaurantName name={name} />
        <RestaurantDescription description={descriptionTop} />
        <RestaurantDescription description={descriptionBottom} />
      </View>
    </View>
  );
}
const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={tw`w-full h-60`} />
);

const RestaurantName = (props) => (
  <Text style={tw`text-3xl font-bold my-2 mx-5`}>{props.name}</Text>
);

const RestaurantDescription = (props) => (
  <Text style={tw`my-1 mx-5 font-normal text-xs`}>{props.description}</Text>
);
