import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { setDestination } from "../slices/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavDestination from "./NavFavDestination";
import { GOOGLE_MAPS_APIKEY } from "@env";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Text style={tw`text-center py-5 text-xl`}>Hello Fellow!</Text>

      {/* INPUT WITH GOOGLE AUTOCOMPLETE */}
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              console.log(data.description);
              console.log(details.geometry);
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              ); // Update destination point and navigates to RideOptions Screen
              navigation.navigate("RideOptionsCard");
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        {/* END OF INPUT WITH GOOGLE AUTOCOMPLETE */}

        {/* FAVOUTIRES DESTINATION COMPONENTS */}
        <NavFavDestination />
      </View>

      {/* BOTTOM BUTTONS RIDE / EATS */}
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")} // Also navigates to RideOption Screen
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
      {/* ENF OF BOTTOM BUTTONS RIDE / EATS */}
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
