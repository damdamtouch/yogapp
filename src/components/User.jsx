import React from "react";
import { useState } from "react";
import SearchPlace from "./SearchPlace";
import { Input, Button } from "@mui/material";
import axios from "axios";
// import { apiURL } from "../../private/privateVar";
const apiURL = "https://ironrest.fly.dev/api/yogapp/";

function User() {
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("sand", user, event);
    console.log("salut", apiURL);
    axios
      .get(apiURL)
      .then((response) => {
        //console.log("list", response.data);
        setUserList(response.data);
        //console.log("salut", userList);
      })
      .catch((error) => console.table({ message: error.message, error }));

    console.log("the object", userList);
    //console.log(Object.values(userList).indexOf("damdam"));
    userList.forEach((eachUser) => {
      console.log("print user", eachUser.userName);
      console.log("to compare", user);
      console.log(Object.values(eachUser).indexOf(user));
      //   if(eachUser.userName.toLowerCase() === user.toLowerCase()){
      //     console.log("found !")
      //   }
    });
  }

  return (
    <div>
      Search or Creatin User
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter a value"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></Input>
        <Button type="submit" variant="outlined">
          Search
        </Button>
      </form>
      {/* <SearchPlace /> */}
    </div>
  );
}

export default User;
