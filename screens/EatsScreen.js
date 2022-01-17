import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { SafeAreaView, ScrollView, View, Platform } from "react-native";
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
  const [activeMenu, setActiveMenu] = useState("Browse");

  const getRestaurantsFromYelp = () => {
    const yelpUrlweb = `https://proxy-cors-ap.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_APIKEY}`,
      },
    };

    return fetch(Platform.OS === "web" ? yelpUrlweb : yelpUrl, apiOptions).then(
      (res) =>
        res.json().then((json) => {
          {
            json.businesses.filter((business) =>
              business.transactions.includes(activeTab.toLowerCase())
            ) == ""
              ? setRestaurantData(json.businesses)
              : setRestaurantData(
                  json.businesses.filter((business) =>
                    business.transactions.includes(activeTab.toLowerCase())
                  )
                );
          }
        })
    );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]); // Checks and reload as soon anyone changes

  return (
    <SafeAreaView
      style={tw`flex-1 bg-white ${
        Platform.OS === "android" ? "pt-16" : "pt-0"
      }`}
    >
      <View style={tw`bg-white p-4`}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#eee" }}
      >
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs
        navigation={navigation}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
    </SafeAreaView>
  );
};

export default EatsScreen;
