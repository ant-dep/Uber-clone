import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements/dist/icons/Icon";
import NavigateCard from "../components/NavigateCard";
import { createStackNavigator } from "@react-navigation/stack";
import RideOptionsCard from "../components/RideOptionsCard";
import Map from "../components/Map";
import { useNavigation } from "@react-navigation/native";
import NavigationConfirmation from "../components/NavigationConfirmation";

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      {/* HALF SCREEN TOP */}
      {/* BURGER ROUNDED BUTTON ON TOP */}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={[
          tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`,
        ]}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      {/* MAP */}
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      {/* HALF SCREEN BOTTOM */}
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NavigationConfirmation"
            component={NavigationConfirmation}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
