import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

export default function BottomTabs({ navigation }) {
  return (
    <View style={tw`flex-row mt-2 mx-4 justify-between`}>
      <Icon
        icon="home"
        text="Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <Icon icon="search" text="Browse" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon icon="receipt" text="Orders" />
      <Icon icon="user" text="Account" />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View>
      <FontAwesome5 name={props.icon} size={25} style={tw`mb-1 self-center`} />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
