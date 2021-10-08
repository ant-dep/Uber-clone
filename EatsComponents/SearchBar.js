import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar() {
  return (
    <View style={tw`mt-7 flex-row`}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        styles={{
          textInput: tw`bg-gray-200 rounded-2xl font-semibold mt-0.5`,
          textInputContainer: tw`bg-gray-200 rounded-full flex-row items-center mr-2`,
        }}
        renderLeftButton={() => (
          <View style={tw`ml-2`}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={tw`flex-row mr-2 bg-white p-2 items-center rounded-full`}
          >
            <AntDesign name="clockcircle" size={13} style={tw`mr-3`} />
            <Text>Search</Text>
          </View>
        )}
      />
    </View>
  );
}
