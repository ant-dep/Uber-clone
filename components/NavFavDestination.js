import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Venetian Way, Di Lido Island, Miami, FL, USA",
    geometry: { lat: 25.790918, lng: -80.159036 },
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "701 Brickell Avenue, Miami, FL, USA",
    geometry: { lat: 25.767254, lng: -80.19031 },
  },
];

const NavFavDestination = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200 h-1`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, destination, icon, geometry } }) => (
        <TouchableOpacity
          onPress={() => {
            console.log(data),
              dispatch(
                setDestination({
                  location: geometry,
                  description: destination,
                })
              ); // Update destination point and navigates to RideOptions Screen
            navigation.navigate("RideOptionsCard");
          }}
          style={tw`flex-row items-center py-5`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavDestination;

const styles = StyleSheet.create({});
