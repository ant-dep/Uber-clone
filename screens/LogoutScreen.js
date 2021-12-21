import React, { useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLogout } from "../slices/userSlice";

const LogoutScreen = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    await AsyncStorage.removeItem("token");
    dispatch(setLogout(null));
    console.log("logout");
  }, []);

  return (
    <View>
      <Text>Logout</Text>
    </View>
  );
};

export default LogoutScreen;
