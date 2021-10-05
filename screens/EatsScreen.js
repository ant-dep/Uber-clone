import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

const EatsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex flex-1 justify-center items-center`}>
      {/* BURGER ROUNDED BUTTON ON TOP */}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={[
          tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`,
        ]}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={tw`text-gray-400 italic text-lg`}>Comming Soon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EatsScreen;
