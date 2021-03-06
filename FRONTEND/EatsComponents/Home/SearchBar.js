import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { APIKEY } from "@env";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../slices/navSlice";

export default function SearchBar(props) {
  const location = useSelector(selectOrigin);
  return (
    <View style={tw`mt-5 flex-row`}>
      <GooglePlacesAutocomplete
        query={{ key: `${APIKEY}` }}
        onPress={(data, details = null) => {
          const city = data.description.split(",")[0]; // keep the first item (the city name)
          props.cityHandler(city);
        }}
        placeholder={location ? location.description : "Search"}
        styles={{
          textInput: tw`bg-gray-200 rounded-2xl font-semibold m-0`,
          textInputContainer: tw`bg-gray-200 rounded-full flex-row items-center mr-1`,
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
