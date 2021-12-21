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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <SafeAreaView style={tw`flex-1 items-center bg-white`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Text style={tw`text-3xl text-center font-bold my-5`}>Login</Text>
        <View style={tw`pt-10 h-4/6 items-center justify-between`}>
          {error.error && <Text>{error.message}</Text>}
          <View style={tw`pt-10 h-5/6 self-center`}>
            <TextInput
              style={tw`w-60 h-12 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow`}
              onChangeText={(value) => {
                setEmail(value);
              }}
              type="email"
              placeholder="email"
              keyboardType="email-address"
            />
            <TextInput
              style={tw`w-60 h-12 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow`}
              onChangeText={(value) => {
                setPassword(value);
              }}
              secureTextEntry={true}
              type="password"
              placeholder="Password"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => {
          loginFunc();
        }}
        style={tw`w-60 mt-5 p-2 items-center bg-blue-400 rounded shadow-md`}
      >
        <Text style={tw`text-white text-lg font-bold `}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
