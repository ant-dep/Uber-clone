import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import HeaderTabs from "../EatsComponents/HeaderTabs";
import { SafeAreaView } from "react-native";

const EatsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex justify-center items-center`}>
      <TouchableOpacity>
        <SafeAreaView>
          <HeaderTabs />
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  );
};

export default EatsScreen;
