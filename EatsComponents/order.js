import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import tw from "tailwind-react-native-classnames";

const order = (order) => {
  console.log("orderToLoad", order);

  let date = order.order.creationTimestamp
    .toLocaleString()
    .substr(0, 10)
    .split("-")
    .reverse()
    .join("-");

  return (
    <View>
      <TouchableOpacity style={tw`my-2 h-44 bg-white relative`}>
        <View style={tw`flex-row items-center justify-between pr-5 mt-1`}>
          <Text style={tw`font-bold text-lg text-green-900`} numberOfLines={1}>
            {order.order.restaurantName}
          </Text>
          <Text style={tw`text-xs text-gray-500`}>{date}</Text>
        </View>
        <View style={tw`flex-row items-center my-auto py-1`}>
          <Image
            source={{ uri: order.order.restaurantImage }}
            style={tw`w-32 h-28 rounded-md`}
          />
          <View style={tw`flex-grow`}>
            {order.order.details.map((item, index) => (
              <View
                key={index}
                style={tw`flex-row items-center justify-between px-5 py-1`}
              >
                <Text style={tw`flex-wrap italic`}>{item.food.title}</Text>
                <Text style={tw`text-xs text-gray-500 self-end ml-2`}>
                  Qty: <Text style={tw`font-bold`}>{item.quantity}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text
          style={tw`text-gray-600 text-sm font-bold absolute -bottom-1 right-4`}
        >
          Total : ${order.order.totalAmount}
        </Text>
      </TouchableOpacity>
      <Divider width={0.5} style={{ width: "95%" }} />
    </View>
  );
};

export default order;
