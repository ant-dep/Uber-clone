import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-elements/dist/divider/Divider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, setCart } from "../../slices/navSlice";

export default function MenuItem({ restaurantName, foods, hideCheckBox }) {
  // UPDATE CART
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch(
      setCart({
        payload: {
          ...item,
          restaurantName: restaurantName,
          checkboxValue: checkboxValue,
        },
      })
    );

  // CHECK IF PRODUCT IS IN CART TO KEEP IT SELECTED
  const items = useSelector(selectCart);
  const cartItems = items.items;
  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.id === food.id)); // return a boolean if the item id Checked or not

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={tw`flex-row justify-between my-5 px-2`}>
            {hideCheckBox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{
                  borderColor: "lightgray",
                  borderRadius: 50,
                  marginHorizontal: 5,
                }}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
              />
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={tw`text-xl font-semibold`}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>${props.food.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={tw`w-20 h-20 rounded-md`}
    />
  </View>
);
