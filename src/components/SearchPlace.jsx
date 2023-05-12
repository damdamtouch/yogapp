import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { googleAPI } from "../../private/privateVar";
import Button from "@mui/material/Button";

function SearchPlace() {
  const [mySpots, setMySpots] = useState();

  const [spot, setSpot] = useState();
  const [show, isShow] = useState(false);
  const [myPhotos, setMyPhotos] = useState([]);
  const [imgURL, setImgURL] = useState();
  const myPosForDev = { lng: 2.3855763, lat: 48.8582623 };

  const nearby = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${myPosForDev.lat},${myPosForDev.lng}&radius=1500&keyword=yoga&key=${googleAPI}`;

  useEffect(() => {
    axios
      .get(nearby, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        //console.log("list", data);
        setMySpots(data.results);
      })
      .catch((error) => console.table({ message: error.message, error }));
  }, []);

  async function handleClick(yogaID) {
    //const id = "ChIJi-j8t3dy5kcRbyt9zBNbqug";
    const detailURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${yogaID}&key=${googleAPI}`;

    axios
      .get(detailURL)
      .then(({ data }) => {
        //console.log("detail", data.result);
        setSpot(data.result);
      })
      .catch((error) => console.table({ message: error.message, error }));

    const maxWidth = 500;
    const maxHeight = 500;

    const photoURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${spot.photos[0].photo_reference}&sensor=false&maxheight=${maxHeight}&maxwidth=${maxWidth}&key=${googleAPI}`;
    //console.log("ma phtoo", photoURL);
    // console.log("photo", spot.photos.length, photoURL);

    // for (let i = 0; i < spot.photos.length; i++) {
    //const photoURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${spot.photos[i].photo_reference}&sensor=false&maxheight=${maxHeight}&maxwidth=${maxWidth}&key=${googleAPI}`;

    axios
      .get(photoURL, {
        responseType: "blob",
      })
      .then((response) => {
        // console.log("detaille de la photo", response);
        setMyPhotos(response.data);
        console.log("my array", myPhotos);
        setImgURL(URL.createObjectURL(myPhotos));
        console.log("url  ", imgURL);
      })
      .catch((error) => console.table({ message: error.message, error }));
    // }

    isShow(true);
  }

  if (!mySpots) {
    return <div>Loadings...</div>;
  }

  return (
    <div>
      {show && (
        <div>
          <h1>Page detail</h1>
          <p>{spot.name}</p>
          <p>{spot.formatted_address}</p>
          <p>{spot.website}</p>
          <p>{spot.international_phone_number}</p>
          <p>{spot.geometry.location.lat}</p>
          <p>{spot.geometry.location.lng}</p>

          <p>{spot.url}</p>
          <p>Rating : {spot.rating}</p>

          {console.log("test ici blob", imgURL)}
          <img src={imgURL} alt="yoga" />
        </div>
      )}

      {mySpots.map((spot) => {
        return (
          <Button
            variant="outlined"
            onClick={() => {
              handleClick(spot.place_id);
            }}
            key={spot.place_id}
          >
            <div>{spot.name}</div>
          </Button>
        );
      })}
    </div>
  );
}

export default SearchPlace;

/* ICON


{markers.map(({ lat, lng }) => (
            <Marker position={{ lat, lng }} />
          ))}

          
https://medium.com/scalereal/integration-of-google-maps-with-react-part-1-86c075ab452a

<Marker
  position={{ lat: 18.52043, lng: 73.856743 }}
  icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
/>

- http://maps.google.com/mapfiles/ms/icons/green-dot.png
- http://maps.google.com/mapfiles/ms/icons/blue-dot.png
- http://maps.google.com/mapfiles/ms/icons/pink-dot.png
- http://maps.google.com/mapfiles/ms/icons/purple-dot.png
- http://maps.google.com/mapfiles/ms/icons/yellow-dot.png

*/
