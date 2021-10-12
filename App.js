import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./slices/store";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import EatsScreen from "./screens/EatsScreen";
import RestaurantDetailsScreen from "./screens/RestaurantDetailsScreen";
import OrderCompletedScreen from "./screens/OrderCompletedScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AccountScreen from "./screens/AccountScreen";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "IOS" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
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
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
