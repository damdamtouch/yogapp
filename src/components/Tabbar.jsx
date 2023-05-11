// import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

function Tabbar() {
  return (
    <div id="tabbar">
      <Link to="/home">
        <HomeIcon />
      </Link>
      <NotificationsIcon />
      <BookmarkIcon />
      <PersonIcon />
    </div>
  );
}

export default Tabbar;
