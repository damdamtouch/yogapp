import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { googleAPI } from "../../private/privateVar";
import Button from "@mui/material/Button";

function SearchPlace() {
  const [mySpots, setMySpots] = useState();
  const [spot, setSpot] = useState();

  const myPosForDev = { lng: 2.3855763, lat: 48.8582623 };

  const nearby = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${myPosForDev.lat},${myPosForDev.lng}&radius=1500&keyword=yoga&key=${googleAPI}`;
  //const nearby = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.8582623,2.3855763&radius=1500&keyword=yoga&key=AIzaSyBSj0lykQxtT0bmiXbnIHxlnlSfRYL0tcM"
  //const detailURL =("https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJi-j8t3dy5kcRbyt9zBNbqug&key=AIzaSyBSj0lykQxtT0bmiXbnIHxlnlSfRYL0tcM");

  console.log(nearby);

  useEffect(() => {
    axios
      .get(nearby, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        console.log("list", data);
        setMySpots(data.results);
      })
      .catch((error) => console.table({ message: error.message, error }));
  }, []);

  async function handleClick(yogaID) {
    //const id = "ChIJi-j8t3dy5kcRbyt9zBNbqug";
    const detailURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${yogaID}&key=${googleAPI}`;

    const response = await axios
      .get(detailURL)
      .then(({ data }) => {
        console.log("detail", data.result);
        setSpot(data.result);
      })
      .catch((error) => console.table({ message: error.message, error }));

    return <div>blabla</div>;
  }

  if (!mySpots) {
    return <div>Loadings...</div>;
  }

  return (
    <div>
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
