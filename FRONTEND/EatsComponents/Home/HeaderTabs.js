import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const HeaderTabs = (props) => {
  return (
    <View style={tw`flex-row justify-center items-center`}>
      <HeaderButton
        text="Delivery"
        btnColor="bg-black"
        textColor="text-white"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="bg-white"
        textColor="text-black"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
};

export default HeaderTabs;

const HeaderButton = (props) => (
  <View>
    <TouchableOpacity
      onPress={() => props.setActiveTab(props.text)}
      style={tw`${
        props.activeTab === props.text ? "bg-black" : "bg-white"
      } py-1 px-4 rounded-full`}
    >
      <Text
        style={tw`${
          props.activeTab === props.text ? "text-white" : "text-black"
        } text-lg font-semibold`}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  </View>
);
