//import React from "react";
import Navbar from "../components/Navbar";
import Tabbar from "../components/Tabbar";
import Filterring from "../components/Filterring";
import Map from "../components/Map";
import Popular from "../components/Popular";
import "../components/Components.css";

function Home() {
  return (
    <div id="mainDiv">
      <Navbar />
      <Filterring />
      <Map />
      <Popular />
      <Tabbar />
    </div>
  );
}

export default Home;
