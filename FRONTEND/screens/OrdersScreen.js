import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { getOrdersByUser } from "../api/orders";
import { selectUser } from "../slices/userSlice";
import Order from "../EatsComponents/order";
import { Icon } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
import BottomTabs from "../EatsComponents/Home/BottomTabs";

export default function OrdersScreen({ navigation }) {
  const [activeMenu, setActiveMenu] = useState("Orders");
  const [orders, setOrders] = useState([]);
  const user = useSelector(selectUser);

  // fetch all orders
  useEffect(() => {
    const getOrders = async () => {
      let allOrders = await getOrdersByUser(user.infos.id);
      setOrders(allOrders.orders);
    };
    getOrders();
  }, []);

  console.log("orders", orders);
  return (
    <SafeAreaView
      style={tw`flex-1 bg-white ${
        Platform.OS === "android" ? "pt-16" : "pt-0"
      }`}
    >
      {/* TOP MENU */}
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`ml-2 my-2 p-2 w-full relative`}>
          <TouchableOpacity
            style={tw`absolute left-4 top-2 z-50`}
            onPress={() => props.navigation.goBack()}
          >
            <Icon
              name="arrowleft"
              type="antdesign"
              color="black"
              size={30}
              onPress={() => navigation.navigate("EatsScreen")}
            />
          </TouchableOpacity>
          <Text style={tw`text-xl text-center`}>My Orders</Text>
        </View>
        <Divider width={1} />

        {/* ORDERS */}
        {orders?.length !== null ? (
          <ScrollView
            style={tw`w-full pl-5 py-5`}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginBottom: 70 }}>
              {orders?.map((item, index) => (
                <Order key={index} order={item} />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={tw`flex-1 items-center justify-center relative`}>
            <Text style={tw`text-xl text-gray-500 absolute top-1/4`}>
              Nothing yet
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EatsScreen");
              }}
              style={tw`w-60 p-2 items-center bg-green-900 rounded shadow-md`}
            >
              <Text style={tw`text-white text-lg font-bold `}>Order</Text>
            </TouchableOpacity>
          </View>
        )}

        <Divider width={1} />
        <BottomTabs
          navigation={navigation}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </View>
    </SafeAreaView>
  );
}
