import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { saveUser } from "../api/user";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements/dist/icons/Icon";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);

  const registerFunc = async () => {
    setError(false);
    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
    };
    if (password !== "" && password === confirmPassword) {
      console.log(datas);
      let res = await saveUser(datas);
      if (res.status === 200) {
        props.navigation.navigate("Login");
      } else {
        setError({ error: true, message: "can't save user" });
      }
    } else {
      setError({
        error: true,
        message: "Les mots de passe ne correspondent pas",
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
        Platform.OS === "android" ? "pt-16" : "pt-0"
      }`}
    >
      <View style={tw`w-full relative`}>
        <TouchableOpacity
          style={tw`absolute left-4 top-6 z-50`}
          onPress={() => props.navigation.goBack()}
        >
          <Icon name="arrowleft" type="antdesign" color="black" size={30} />
        </TouchableOpacity>
        <Text style={tw`text-3xl text-center font-bold my-5`}>Register</Text>
      </View>
      {error.error && <Text>{error.message}</Text>}
      <View style={tw`pt-10 h-4/6 items-center`}>
        <View style={tw`items-center justify-between`}>
          <TextInput
            style={tw`w-60 my-2 pl-3 py-1 border border-gray-200 rounded-sm text-lg `}
            onChangeText={(value) => {
              setFirstName(value);
            }}
            type="text"
            placeholder="first name"
          />
          <TextInput
            style={tw`w-60 my-2 pl-3 py-1 border border-gray-200 rounded-sm text-lg `}
            onChangeText={(value) => {
              setLastName(value);
            }}
            type="text"
            placeholder="last name"
          />
          <TextInput
            style={tw`w-60 my-2 pl-3 py-1 border border-gray-200 rounded-sm text-lg `}
            onChangeText={(value) => {
              setEmail(value);
            }}
            type="email"
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            style={tw`w-60 my-2 pl-3 py-1 border border-gray-200 rounded-sm text-lg `}
            onChangeText={(value) => {
              setPhone(value);
            }}
            type="text"
            keyboardType="phone-pad"
            maxLength={11}
            placeholder="phone"
          />
        </View>
        <View style={tw`pt-8 items-center justify-between`}>
          <View
            style={tw`w-60 h-10 pl-3 my-2 border border-gray-200 rounded-sm relative`}
          >
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
            <TextInput
              style={tw`w-full h-full text-lg`}
              onChangeText={(value) => {
                setPassword(value);
              }}
              secureTextEntry={secureTextEntry}
              placeholder="Password"
            />
          </View>
          <TextInput
            style={tw`w-60 pl-3 pb-2 border border-gray-200 rounded-sm text-lg `}
            onChangeText={(value) => {
              setConfirmPassword(value);
            }}
            secureTextEntry={secureTextEntry}
            placeholder="Confirm Password"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={registerFunc}
        style={tw`w-60 mt-5 p-2 items-center bg-black rounded shadow-md`}
      >
        <Text style={tw`text-white text-lg font-bold`}>Register</Text>
      </TouchableOpacity>
      <Text
        onPress={() => props.navigation.navigate("LoginScreen")}
        style={tw`mt-3 text-gray-500 text-center`}
      >
        Already registered ?
      </Text>
    </SafeAreaView>
  );
};

export default Register;
