import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import { selectUser } from "../../slices/userSlice";
import tw from "tailwind-react-native-classnames";
import "intl";
import "intl/locale-data/jsonp/en";
import OrderItem from "./OrderItem";
import LottieView from "lottie-react-native";
import { saveOrder } from "../../api/orders";

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  // GET ITEMS SELECTED
  const cartItems = useSelector(selectCart);
  console.log("cartItems", cartItems);

  const total = cartItems.items
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalUSD = formatter.format(total);

  // PLACE ORDER FUNCTION

  const addOrder = async () => {
    setLoading(true);
    const order = {
      cart: cartItems.items,
      restaurantName: cartItems.restaurantName,
      restaurantImage: cartItems.restaurantImage,
      restaurantCity: cartItems.restaurantCity,
    };
    console.log("orderToSave", order);
    const res = await saveOrder(order);
    if (res.status === 200) {
      console.log("addOrder", res);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("OrderCompletedScreen", {
          cartItems,
          total,
        });
      }, 2500);
    } else {
      console.log("addOrder error", res.err);
      alert("A error occured");
    }
  };

  // MODAL
  const checkoutModalContent = () => {
    return (
      <>
        {/* DARKENED PART ON  TOP, BACK ON TOUCH */}
        <TouchableOpacity
          style={tw`flex-1 justify-end bg-black bg-opacity-50`}
          onPress={() => setModalVisible(false)}
        ></TouchableOpacity>

        {/* CART MODAL */}
        <View style={tw`bg-white p-1 h-3/5 items-center border relative`}>
          <Text style={tw`text-center font-semibold text-lg my-2`}>
            {cartItems.restaurantName}
          </Text>

          {/* SCROLLABLE ITEMS AND TOTAL */}
          <ScrollView style={tw`w-full`} showsHorizontalScrollIndicator={false}>
            {cartItems?.items?.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={tw`flex-row justify-between w-full px-2 mt-4`}>
              <Text style={tw`text-left font-semibold mb-1`}>Subtotal</Text>
              <Text style={tw`font-bold`}>{totalUSD}</Text>
            </View>
          </ScrollView>

          {/* CONFIRM BUTTON */}
          <View style={tw`flex-row justify-center absolute bottom-10`}>
            <TouchableOpacity
              style={tw`mt-3 bg-black flex-row justify-around items-center px-5 py-2 rounded-3xl w-72`}
              onPress={() => {
                if (user.isLogged) {
                  addOrder();
                  setModalVisible(false);
                } else {
                  setModalVisible(false);
                  navigation.navigate("LoginScreen");
                }
              }}
            >
              <Text style={tw`text-white text-lg font-semibold`}>Checkout</Text>
              <Text style={tw`text-white`}>-</Text>
              <Text style={tw`text-white font-semibold`}>
                {total ? totalUSD : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? ( // IF there's something checked, show the button
        <View
          style={tw`flex-1 items-center justify-center flex-row absolute bottom-96 z-20`}
        >
          <View style={tw`flex-row justify-center w-full`}>
            <TouchableOpacity
              style={tw`bg-black flex-row justify-around items-center p-3 rounded-full w-72 relative`}
              onPress={() => setModalVisible(true)}
            >
              <Text style={tw`text-white text-lg font-semibold`}>
                View Cart
              </Text>
              <Text style={tw`text-white text-lg font-semibold`}>-</Text>
              <Text style={tw`text-white text-lg font-semibold`}>
                {totalUSD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></> // Otherwise, hide it
      )}
      {loading ? (
        <View
          style={tw`bg-black bg-opacity-60 absolute justify-center items-center flex-1 w-full h-full`}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
