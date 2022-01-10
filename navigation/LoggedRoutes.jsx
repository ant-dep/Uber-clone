import React from "react";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import EatsScreen from "../screens/EatsScreen";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
import OrderCompletedScreen from "../screens/OrderCompletedScreen";
import OrdersScreen from "../screens/OrdersScreen";
import AccountScreen from "../screens/AccountScreen";
import LogoutScreen from "../screens/LogoutScreen";

const LoggedRoutes = () => {
  const Stack = createStackNavigator();

  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MapScreen"
      component={MapScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EatsScreen"
      component={EatsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RestaurantDetailsScreen"
      component={RestaurantDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OrderCompletedScreen"
      component={OrderCompletedScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LogoutScreen"
      component={LogoutScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>;
};

export default LoggedRoutes;
