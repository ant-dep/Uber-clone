import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { selectCar, selectTravelTimeInformation } from "../slices/navSlice";

import { useSelector } from "react-redux";

const NavigationConfirmation = () => {
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const car = useSelector(selectCar);
  console.log(car);

  // If we have SURGE pricing, this goes up
  const SURGE_CHARGE_RATE = 1.5;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Confirm the ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      <TouchableOpacity
        style={tw`flex-1 flex-row justify-between items-center px-10`}
      >
        {/* CAR OPTION LOGO */}
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{ uri: car.image }}
        />
        {/* OPTION TITLE + TRAVEL DURATION FROM MAP.JS (through redux dispatch)*/}
        <View style={tw`-ml-6`}>
          <Text style={tw`text-lg font-semibold`}>{car.title}</Text>
          <Text>{travelTimeInformation?.duration.text}</Text>
        </View>

        {/* DYNAMIC PRICE WITH TRAVEL TIME FROM MAP.JS (through redux dispatch) */}
        <Text style={tw`text-lg`}>
          {new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD",
          }).format(
            (travelTimeInformation?.duration.value *
              SURGE_CHARGE_RATE *
              car.multiplier) /
              100
          )}
        </Text>
      </TouchableOpacity>

      <View
        style={tw`mt-auto border-t border-gray-200 flex flex-row items-center justify-between px-4 pt-3`}
      >
        <TouchableOpacity>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Icon name="cc-visa" type="font-awesome" />
            <Text style={tw`ml-2`}>**** 1234</Text>
          </View>
        </TouchableOpacity>
        <View style={tw`flex flex-row items-center justify-between`}>
          <Icon name="person-outline" type="ionicons" />
          <Text style={tw`ml-2`}>{car.capacity}</Text>
        </View>
      </View>

      {/* FOR EACH OPTIONS? RENDER / */}
      <View>
        <TouchableOpacity style={tw`bg-black py-3 m-3`}>
          <Text style={tw`text-center text-white text-xl`}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigationConfirmation;
