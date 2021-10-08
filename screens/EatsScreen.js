import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import HeaderTabs from "../EatsComponents/HeaderTabs";
import { SafeAreaView } from "react-native";
import SearchBar from "../EatsComponents/SearchBar";
import Categories from "../EatsComponents/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../EatsComponents/RestaurantItems";
import { YELP_APIKEY } from "@env";

const EatsScreen = () => {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("Miami");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_APIKEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions).then((res) =>
      res.json().then((json) =>
        setRestaurantData(
          json.businesses.filter(
            (
              business // Filter depending wheter the active tab is
            ) => business.transactions.includes(activeTab.toLowerCase())
          )
        )
      )
    );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]); // Checks and reload as soon anyone changes

  return (
    <SafeAreaView style={tw`bg-gray-200`}>
      <View style={tw`bg-white p-4`}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EatsScreen;
