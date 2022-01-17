import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { loginUser } from "../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements/dist/icons/Icon";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const loginFunc = async () => {
    setError(false);
    let lowerEmail = email.toLowerCase();
    let datas = {
      email: lowerEmail,
      password: password,
    };
    if (email !== "" && password !== "") {
      let res = await loginUser(datas);
      if (res.status === 200) {
        console.log(res);
        let storage = await AsyncStorage.setItem("ubertoken", res.token);
        let user = res.user;
        user.token = res.token;
        dispatch(setUser(user));
        props.navigation.navigate("AccountScreen");
      } else {
        setError({ error: true, message: "can't log user" });
      }
    } else {
      setError({
        error: true,
        message: "Veuillez completez les champs",
      });
    }
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
      style={tw`flex-1 items-center bg-white ${
        Platform.OS === "android" ? "pt-12" : "pt-0"
      }`}
    >
      <Text style={tw`text-3xl text-center font-bold my-5`}>Login</Text>
      <View style={tw`pt-10 h-4/6 items-center justify-between`}>
        {error.error && <Text>{error.message}</Text>}
        <View style={tw`pt-10 h-5/6 self-center`}>
          <TextInput
            style={tw`w-60 h-12 my-2 pl-3 border border-gray-200 rounded-sm text-lg`}
            onChangeText={(value) => {
              setEmail(value);
            }}
            type="email"
            placeholder="email"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <View
            style={tw`w-60 h-12 my-2 pl-3 border border-gray-200 rounded-sm relative`}
          >
            <TouchableOpacity
              style={tw`absolute right-2 bottom-3 z-10`}
              onPress={hide}
            >
              <Icon
                name={secureTextEntry ? "eye" : "eye-slash"}
                type="font-awesome"
                color="lightgrey"
              />
            </TouchableOpacity>
            <TextInput
              style={tw`w-full h-full text-lg`}
              onChangeText={(value) => {
                setPassword(value);
              }}
              secureTextEntry={secureTextEntry}
              placeholder="Password"
              returnKeyType="send"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          loginFunc();
        }}
        style={tw`w-60 mt-5 p-2 items-center bg-black rounded shadow-md`}
      >
        <Text style={tw`text-white text-lg font-bold `}>Login</Text>
      </TouchableOpacity>
      <Text
        onPress={() => props.navigation.navigate("RegisterScreen")}
        style={tw` mt-5 text-gray-500`}
      >
        Not registered yet ?
      </Text>
    </SafeAreaView>
  );
};

export default Login;
