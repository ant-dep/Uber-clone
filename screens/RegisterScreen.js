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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { saveUser } from "../api/user";
import tw from "tailwind-react-native-classnames";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);

  const registerFunc = async () => {
    setError(false);
    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      zip: zip,
      city: city,
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

  return (
    <SafeAreaView style={tw`flex-1 items-center bg-white`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Text style={tw`text-3xl text-center font-bold my-5`}>Register</Text>
        <ScrollView style={tw`pb-10`}>
          {error.error && <Text>{error.message}</Text>}
          <View style={tw`pt-10 h-4/5 items-center justify-between`}>
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setFirstName(value);
              }}
              type="text"
              placeholder="first name"
            />
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setLastName(value);
              }}
              type="text"
              placeholder="last name"
            />
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setEmail(value);
              }}
              type="email"
              keyboardType="email-address"
              placeholder="email"
            />
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setAddress(value);
              }}
              type="text"
              placeholder="address"
            />
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setZip(value);
              }}
              type="text"
              keyboardType="numeric"
              maxLength={5}
              placeholder="zip code"
            />
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setCity(value);
              }}
              type="text"
              placeholder="city"
            />
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setPhone(value);
              }}
              type="text"
              keyboardType="phone-pad"
              maxLength={11}
              placeholder="phone"
            />
          </View>
          <View style={tw`pt-10 items-center justify-between`}>
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setPassword(value);
              }}
              secureTextEntry={true}
              placeholder="Password"
            />
            <TextInput
              style={tw`w-60 my-2 pl-3 pb-2 border border-gray-200 rounded-sm text-lg shadow `}
              onChangeText={(value) => {
                setConfirmPassword(value);
              }}
              secureTextEntry={true}
              placeholder="Confirm Password"
            />
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={registerFunc}
            style={tw`w-60 m-5 p-2 items-center bg-blue-400 rounded shadow-md`}
          >
            <Text style={tw`text-white text-lg font-bold`}>Register</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Register;
