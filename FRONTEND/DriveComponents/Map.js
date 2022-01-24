import React, { useEffect, useRef } from "react";
import { Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { APIKEY } from "@env";

const Map = () => {
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();

  // MARKERS SETTINGS AND ZOOM OUT FEATURE
  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  // TIME CALCULATION VIA GOOGLE API
  useEffect(() => {
    const getTravelTime = async () => {
      if (!origin || !destination) return;

      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, `${APIKEY}`]);

  return (
    <MapView
      onPress={Keyboard.dismiss}
      onPanDrag={Keyboard.dismiss}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={`${APIKEY}`}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
          image={require("../assets/uber-marker-icon.png")} // Uber Icon. only local works
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
          image={require("../assets/uber-marker-icon.png")}
        />
      )}
    </MapView>
  );
};

export default Map;
