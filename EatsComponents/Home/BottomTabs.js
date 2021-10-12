import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import tw from "tailwind-react-native-classnames";

export default function BottomTabs({ navigation, ...props }) {
  return (
    <View style={tw`flex-row pt-2 mx-6 justify-between`}>
      <Icon
        icon="home"
        text="Home"
        activeMenu={props.activeMenu}
        setActiveMenu={props.setActiveMenu}
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      />
      <Icon
        icon="search"
        text="Browse"
        activeMenu={props.activeMenu}
        setActiveMenu={props.setActiveMenu}
      />
      <Icon
        icon="receipt"
        text="Orders"
        activeMenu={props.activeMenu}
        setActiveMenu={props.setActiveMenu}
        onPress={() => {
          navigation.navigate("OrdersScreen");
        }}
      />
      <Icon
        icon="user"
        text="Account"
        activeMenu={props.activeMenu}
        setActiveMenu={props.setActiveMenu}
        onPress={() => {
          navigation.navigate("AccountScreen");
        }}
      />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View onPress={() => props.setActiveMenu(props.text)}>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={tw`mb-1 self-center`}
        color={`${props.activeMenu === props.text ? "black" : "lightgrey"}`}
      />
      <Text
        style={{
          color: `${props.activeMenu === props.text ? "black" : "lightgrey"}`,
        }}
      >
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);
