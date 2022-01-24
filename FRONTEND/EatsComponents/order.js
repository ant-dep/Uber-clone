import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import tw from "tailwind-react-native-classnames";

const order = (order) => {
  let date = order.order.creationTimestamp
    .toLocaleString()
    .substr(0, 10)
    .split("-")
    .reverse()
    .join("-");

  return (
    <View>
      <View style={tw`my-5 flex-row bg-white relative`}>
        <View style={tw`w-1/4 pr-2`}>
          <Image
            source={{ uri: order.order.restaurantImage }}
            style={tw`flex-grow`}
          />
        </View>
        <View style={tw`w-1/2 items-center justify-between`}>
          <Text style={tw`font-bold text-base text-green-900 w-full`}>
            {order.order.restaurantName} - {order.order.restaurantCity}
          </Text>

          <View style={tw`w-full flex-grow`}>
            <Text style={tw`text-xs text-gray-500`}>
              {order.order.details.length} items • ${order.order.totalAmount}
            </Text>
            <Text style={tw`text-xs text-gray-500`}>{date} • Complete</Text>
          </View>
        </View>
        <View style={tw`w-1/4 items-center justify-center`}>
          <TouchableOpacity
            style={tw`rounded-full flex mx-auto px-2 bg-gray-100`}
          >
            <Text style={tw`font-bold text-center p-2`}>Show</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider width={0.8} style={{ width: "95%" }} />
    </View>
  );
};

export default order;
