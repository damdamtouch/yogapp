import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { googleAPI } from "/private/privateVar.js";
import axios from "axios";

function Map() {
  // var sydney = new google.maps
  // console.log("syfney", sydney.toUrlValue());
  // const [pin, setPin] = useState({});

  const [center, setCenter] = useState({ lng: 2.3855763, lat: 48.8582623 });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleAPI,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  /* Getting the position */
  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const currentPosition = {
      lat: crd.latitude,
      lng: crd.longitude,
    };
    setCenter(currentPosition);

    //DEv
    //const nearby = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.latitude}, ${center.longitude}&radius=1500&keyword=yoga&key=${googleAPI}`;

    //PROD
    const nearby = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${crd.latitude}, ${crd.longitude}&radius=1500&keyword=yoga&key=${googleAPI}`;
    axios
      .get(nearby, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => console.log(data.results))
      .catch((error) => console.table({ message: error.message, error }));

    //setPin(data.results);
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  /* End of getting the position */

  /* Setting param of the map */
  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(12);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  /* */

  /* Loading yoga */

  /* End loading */

  return isLoaded && center ? (
    <div id="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        // zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={{ lat: center.lat, lng: center.lng }} />;
      </GoogleMap>
    </div>
  ) : (
    <>Loading the map</>
  );
}

export default Map;
