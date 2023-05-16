// import React from "react";
import SearchIcon from "@mui/icons-material/Search";
//import TuneIcon from "@mui/icons-material/Tune";
import { Input } from "@mui/material";
import { InputAdornment } from "@mui/material";

function Navbar() {
  return (
    <div id="navbar">
      <img src="/public/icon.png"></img>
      <p>
        Hello <b>Damdam</b> !
      </p>
      <h2>Find Your Class</h2>
      <form>
        <Input
          placeholder="Search here..."
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          }
        ></Input>

        {/* <TuneIcon></TuneIcon> */}
      </form>
    </div>
  );
}

export default Navbar;
