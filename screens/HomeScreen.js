import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setOrigin, selectOrigin } from "../slices/navSlice";
import { selectUser } from "../slices/userSlice";
import NavOptions from "../DriveComponents/NavOptions";
import NavFavOrigin from "../DriveComponents/NavFavOrigin";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useSelector(selectOrigin);
  const [visible, setvisible] = useState(false);

  // 2.5 sec Loader
  useEffect(() => {
    setTimeout(() => {
      setvisible(true);
    }, 2500);
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      setTimeout(() => {
        alert(
          "Sorry it's a bit broken on web. Please consider using EXPO app 📲 . You will get the most of React Native and a nice preview 🙌 !  https://expo.dev/@lhimiko/Uber-clone"
        );
      }, 3000);
    }
  }, []);

  return (
    <SafeAreaView
      style={tw`${
        visible
          ? "bg-white h-full"
          : "bg-black flex items-center justify-center h-full"
      }
      ${Platform.OS === "android" ? "pt-16" : "pt-0"}`}
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
        <View style={tw`p-5 relative`}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                user.isLogged ? "AccountScreen" : "LoginScreen"
              )
            }
            style={[tw`absolute top-2 right-6 z-50 rounded-full bg-gray-100`]}
          >
            <FontAwesome5 name="user-circle" size={35} color="lightgrey" />
          </TouchableOpacity>
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
          <View style={tw`my-auto w-full `}>
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
              placeholder={
                location
                  ? location.description.length > 42
                    ? location.description.substring(0, 39) + "..."
                    : location.description
                  : "Where to pick you up ?"
              }
              query={{
                key: APIKEY,
                language: "en",
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400} // start searching every 400ms
              enablePoweredByContainer={false} // hide the "Powered by Google"
            />
          </View>

          <NavOptions />
          <NavFavOrigin />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
