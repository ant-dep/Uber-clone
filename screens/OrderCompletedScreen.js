import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectCart, resetCart } from "../slices/cartSlice";
import LottieView from "lottie-react-native";
import MenuItem from "../EatsComponents/RestaurantDetail/MenuItem";
import firebase from "../firebase";
import "intl";
import "intl/locale-data/jsonp/en";

export default function OrderCompletedScreen({ navigation }) {
  const [lastOrder, setLastOrder] = useState({
    // default item
    items: [
      {
        title: "Lasagna",
        image: "https://retete.unica.ro/wp-content/uploads/2013/10/lasagna.jpg",
        description: "Yummi",
        price: 13.6,
      },
    ],
  });

  const dispatch = useDispatch();
  const resetCartItems = () => dispatch(resetCart());

  // GETTING THE LAST ORDER FROM FIREBASE
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("EatsScreen");
      resetCartItems();
    }, 7500);
  });

  // GETTING ITEMS AND CART TOTAL FROM REDUX
  const items = useSelector(selectCart);
  const cartItems = items.items;
  const restaurantName = items.restaurantName;
  const total = cartItems
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  let formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const totalUSD = formatter.format(total);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`items-center justify-center m-4 h-full`}>
        <LottieView
          style={tw`h-28 self-center mb-8`}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.65}
          loop={false}
        />
        <Text style={tw`text-xl font-bold`}>
          Your order at {restaurantName} has been placed for {totalUSD}
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <MenuItem foods={lastOrder.items} hideCheckBox={true} />
        </ScrollView>
        <LottieView
          style={tw`h-40 self-center mb-5`}
          source={require("../assets/animations/cooking.json")}
          autoPlay
          speed={0.85}
          loop={false}
        />
      </View>
    </SafeAreaView>
  );
}
