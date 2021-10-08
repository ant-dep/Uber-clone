import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const HeaderTabs = () => {
  const [activeTab, setActiveTab] = useState("Delivery");

  return (
    <View style={tw`flex-row justify-center items-center`}>
      <HeaderButton
        text="Delivery"
        btnColor="bg-black"
        textColor="text-white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="bg-white"
        textColor="text-black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
const styles = StyleSheet.create({});
