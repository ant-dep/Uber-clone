import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { SafeAreaView, ScrollView, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import HeaderTabs from "../EatsComponents/Home/HeaderTabs";
import SearchBar from "../EatsComponents/Home/SearchBar";
import Categories from "../EatsComponents/Home/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../EatsComponents/Home/RestaurantItems";
import BottomTabs from "../EatsComponents/Home/BottomTabs";
import { YELP_APIKEY } from "@env";
import { Divider } from "react-native-elements/dist/divider/Divider";

const EatsScreen = ({ navigation }) => {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const origin = useSelector(selectOrigin);
  const [city, setCity] = useState(origin ? origin.description : "Miami Beach"); // Checks if there is an origin city or display Miami by default ;)
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#eee",
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <View style={tw`bg-white p-4`}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
};

export default EatsScreen;
