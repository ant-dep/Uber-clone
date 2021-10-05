import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavOptions from "../components/NavOptions";
import NavFavOrigin from "../components/NavFavOrigin";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);

  // 2.5 sec Loader
  useEffect(() => {
    setTimeout(() => {
      setvisible(true);
    }, 2500);
  }, []);

  return (
    <SafeAreaView
      style={tw`${
        visible
          ? "bg-white h-full"
          : "bg-black flex items-center justify-center h-full"
      }`}
    >
      {!visible && (
        <Image
          style={{
            flex: 1,
            width: 180,
            height: 180,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://logodownload.org/wp-content/uploads/2015/05/uber-logo-3-1.png",
          }}
        />
      )}
      {visible && (
        <View style={tw`p-5`}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
            source={{
              uri: "https://links.papareact.com/gzs",
            }}
          />
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
                backgroundColor: "#F5F5F5",
              },
            }}
            fetchDetails={true} // use Redux dispatch to store coordinates
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              dispatch(setDestination(null));
            }}
            returnKeyType={"search"}
            placeholder="Where to pick you up ?"
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400} // start searching every 400ms
            enablePoweredByContainer={false} // hide the "Powered by Google"
          />

          <NavOptions />
          <NavFavOrigin />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
