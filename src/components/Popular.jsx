//import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { googleAPI } from "../../private/privateVar";
import StarIcon from "@mui/icons-material/Star";

function Popular() {
  const [mySpots, setMySpots] = useState();
  // const [myPhotos, setMyPhotos] = useState([]);
  const [imgURL, setImgURL] = useState();
  //let imgURL;
  const myPosForDev = { lng: 2.3855763, lat: 48.8582623 };
  const nearby = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${myPosForDev.lat},${myPosForDev.lng}&radius=1500&keyword=yoga&key=${googleAPI}`;
  // const nearby = `/api/place/nearbysearch/json?location=${myPosForDev.lat},${myPosForDev.lng}&radius=1500&keyword=yoga&key=${googleAPI}`;
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
        // console.log(mySpots);
      })
      .catch((error) => console.table({ message: error.message, error }));
  }, []);

  if (!mySpots) {
    return <div>Loadings...</div>;
  }

  console.log(mySpots);

  console.log(mySpots[Math.floor(Math.random() * mySpots.length)]);
  let mySpot = mySpots[Math.floor(Math.random() * mySpots.length)];
  //setMySpot(mySpots[Math.floor(Math.random() * mySpots.length)]);

  const maxWidth = 500;
  const maxHeight = 500;

  const photoURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${mySpot.photos[0].photo_reference}&sensor=false&maxheight=${maxHeight}&maxwidth=${maxWidth}&key=${googleAPI}`;
  //const photoURL = `/api/place/photo?photoreference=${spot.photos[0].photo_reference}&sensor=false&maxheight=${maxHeight}&maxwidth=${maxWidth}&key=${googleAPI}`;

  if (!imgURL) {
    axios
      .get(photoURL, {
        responseType: "blob",
      })
      .then((response) => {
        // console.log("detaille de la photo", response);
        //setMyPhotos(response.data);
        // console.log("my response", response.data);
        setImgURL(URL.createObjectURL(response.data));
        console.log("url  ", imgURL);
      })
      .catch((error) => console.table({ message: error.message, error }));
  }

  return (
    <>
    <h3 id="popularP">Popular</h3>
    <div id="popular">
      <div id="left">
        {console.log("test", imgURL)}
        <img src={imgURL} alt="yoga photo"></img>
      </div>
      <div id="right">
        {" "}
        <h4>{mySpot.name}</h4>
        <p>{mySpot.vicinity}</p>
        <p>
          {mySpot.rating}
          <StarIcon color="#F05A22" />
        </p>
      </div>
    </div>
    </>
  );
}

export default Popular;
