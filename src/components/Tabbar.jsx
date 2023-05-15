// import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function Tabbar() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#F05A22",
      },
      secondary: {
        main: "#22b9f0",
      },
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#F05A22",
          },
        },
      },
    },
  });

  return (
    <div id="tabbar">
      <ThemeProvider theme={theme}>
        <Link to="/home">
          <HomeIcon />
        </Link>
        <Link to="notifications">
          <NotificationsIcon />
        </Link>
        <Link to="favoris">
          <BookmarkIcon />
        </Link>
        <Link to="/user">
          <PersonIcon />
        </Link>
      </ThemeProvider>
    </div>
  );
}

export default Tabbar;
