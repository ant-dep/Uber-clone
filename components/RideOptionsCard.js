import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { useSelector } from "react-redux";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  // If we have SURGE pricing, this goes up
  const SURGE_CHARGE_RATE = 1.5;

  const data = [
    {
      id: "Uber-X-123",
      title: "Uber X",
      multiplier: 1,
      image: "https://links.papareact.com/3pn",
      capacity: "1 - 3",
    },
    {
      id: "Uber-GREEN-456",
      title: "Uber Green",
      multiplier: 1,
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_956/v1599010311/assets/00/4c6379-7586-4d55-9fe6-8170b18260d1/original/Product-Icon-2.jpg",
      capacity: "1 - 3",
    },
    {
      id: "Uber-XL-789",
      title: "Uber XL",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8",
      capacity: "1 - 5",
    },
    {
      id: "Uber-LUX-101112",
      title: "Uber LUX",
      multiplier: 1.75,
      image: "https://links.papareact.com/7pf",
      capacity: "1 - 2",
    },
  ];

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
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      {/* FOR EACH OPTIONS? RENDER : */}
      <FlatList
        data={data}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            } ${
              id === selected?.id && id === "Uber-GREEN-456" && "bg-green-100"
              // if selected, give grey background or green for Uber Green
            }`}
          >
            {/* CAR OPTION LOGO */}
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            {/* OPTION TITLE + TRAVEL DURATION FROM MAP.JS (through redux dispatch)*/}
            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg font-semibold`}>{title}</Text>
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
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-between px-4 pt-3`}
        >
          <View style={tw`flex flex-row items-center justify-between`}>
            <Icon name="cc-visa" type="font-awesome" />
            <Text style={tw`ml-2`}>**** 1234</Text>
          </View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Icon name="person-outline" type="ionicons" />
            <Text style={tw`ml-2`}>{selected?.capacity}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* FOR EACH OPTIONS? RENDER / */}
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
