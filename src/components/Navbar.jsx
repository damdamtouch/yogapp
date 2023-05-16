// import React from "react";
import { Input, Button } from "@mui/material";

function Navbar() {
  return (
    <div id="navbar">
              <img src="/public/icon.png"></img>
      <p>
Hello Damdam !
      </p>
      <p>Find Your Class</p>
      <form>
        <input placeholder="Search here..."></input>
        <Button>Settings</Button>
      </form>
    </div>
  );
}

export default Navbar;
