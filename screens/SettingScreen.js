import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogout, setUser } from "../slices/userSlice";
import tw from "tailwind-react-native-classnames";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { updateUser } from "../api/user";
import { resetCart } from "../slices/cartSlice";

const SettingScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [firstName, setFirstName] = useState(user.infos.firstName);
  const [lastName, setLastName] = useState(user.infos.lastName);
  const [email, setEmail] = useState(user.infos.email);
  const [phone, setPhone] = useState(user.infos.phone);

  const [password, setPassword] = useState(user.infos.password);

  const [onUpdate, setOnUpdate] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);

  if (password === "") {
    setPassword(user.infos.password);
  }

  const updateAccount = async () => {
    setError(false);
    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
    };

    let res = await updateUser(user.infos.id, datas);
    setOnUpdate(false);
    if (res.status === 200) {
      dispatch(setUser(res.newUser));
      setError({ error: true, message: "user nicely updated" });
    } else {
      setError({ error: true, message: "can't update user" });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("ubertoken");
    dispatch(resetCart(null));
    dispatch(setLogout(null));
    console.log("logout");
  };

  const hide = () => {
    if (secureTextEntry) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`flex-row items-start ml-2 my-2 p-2`}>
          <Icon
            name="arrowleft"
            type="antdesign"
            color="black"
            size={30}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={tw`text-xl ml-5`}>Settings</Text>
        </View>
        <Divider width={1} />
        <ScrollView
          style={tw`w-full pl-5`}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          {error.error && <Text>{error.message}</Text>}
          <View style={tw`py-5 justify-between`}>
            <View style={tw`my-5`}>
              <Text style={tw`text-gray-500 p-0`}>First Name</Text>
              <TextInput
                style={tw`w-60 text-lg `}
                onChangeText={(value) => {
                  setOnUpdate(true);
                  setFirstName(value);
                }}
                type="text"
                defaultValue={firstName}
              />
            </View>
            <View style={tw`my-5`}>
              <Text style={tw`text-gray-500 p-0`}>Last Name</Text>
              <TextInput
                style={tw`w-60 text-lg `}
                onChangeText={(value) => {
                  setOnUpdate(true);
                  setLastName(value);
                }}
                type="text"
                defaultValue={lastName}
              />
            </View>
            <View style={tw`my-5`}>
              <Text style={tw`text-gray-500 p-0`}>Phone</Text>
              <TextInput
                style={tw`w-60 text-lg `}
                onChangeText={(value) => {
                  setOnUpdate(true);
                  setPhone(value);
                }}
                type="text"
                keyboardType="phone-pad"
                maxLength={11}
                defaultValue={phone}
              />
            </View>
            <View style={tw`my-5`}>
              <Text style={tw`text-gray-500 p-0`}>Email</Text>
              <TextInput
                style={tw`w-60 text-lg `}
                onChangeText={(value) => {
                  setOnUpdate(true);
                  setEmail(value);
                }}
                type="email"
                keyboardType="email-address"
                defaultValue={email}
              />
            </View>
          </View>
          <View style={tw`justify-between`}>
            <View style={tw`my-5`}>
              <Text style={tw`text-gray-500 p-0`}>Password</Text>
              <View style={tw`w-60 h-10 relative`}>
                <TextInput
                  style={tw` w-full h-full text-lg`}
                  onChangeText={(value) => {
                    setOnUpdate(true);
                    setPassword(value);
                  }}
                  secureTextEntry={secureTextEntry}
                  placeholder="••••••••••"
                  placeholderTextColor={"black"}
                />
                <TouchableOpacity
                  style={tw`absolute right-2 bottom-2 z-10`}
                  onPress={hide}
                >
                  <Icon
                    name={secureTextEntry ? "eye" : "eye-slash"}
                    type="font-awesome"
                    color="lightgrey"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider width={0.5} style={{ width: "92%" }} />
          <TouchableOpacity
            onPress={updateAccount}
            style={tw`w-60 mt-5 p-2 items-center mx-auto ${
              !onUpdate && "hidden"
            }`}
          >
            <Text
              style={tw`text-green-900 bg-gray-100 rounded-full px-10 py-2 text-lg font-bold mb-5`}
            >
              UPDATE
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Text
          onPress={logout}
          style={tw`absolute bottom-10 left-5 text-lg text-green-900 font-bold`}
        >
          Log out
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
