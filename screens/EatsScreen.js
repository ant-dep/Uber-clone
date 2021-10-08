import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";
import HeaderTabs from "../EatsComponents/HeaderTabs";
import { SafeAreaView } from "react-native";
import SearchBar from "../EatsComponents/SearchBar";
import Categories from "../EatsComponents/Categories";

const EatsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-gray-200`}>
      <View style={tw`bg-white p-4`}>
        <HeaderTabs />
        <SearchBar />
      </View>
      <Categories />
    </SafeAreaView>
  );
};

export default EatsScreen;
