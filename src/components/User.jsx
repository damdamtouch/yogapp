//import React from "react";
import { useState } from "react";
import SearchPlace from "./SearchPlace";
import { Input, Button } from "@mui/material";
import axios from "axios";

const apiURL = "https://ironrest.fly.dev/api/yogapp/";

function User() {
  const [user, setUser] = useState("");
  const [userWithInfo, setUserWithInfo] = useState(null);
  const [displayCreate, setDisplayCreate] = useState(false);
  const [password, setPassword] = useState("");
  // const [userList, setUserList] = useState([]);

  function handleSubmit(event) {
    let userFound = false;
    event.preventDefault();
    console.log("send", user);

    async function getUser() {
      const userList = await axios.get(apiURL);
      console.log(userList.data);
      if (!userList.data.length) {
        console.log("kikou");
        setDisplayCreate(true);
      }
      userList.data.forEach((eachUser) => {
        console.log("print user", eachUser);
        console.log(Object.values(eachUser).indexOf(user));
        if (Object.values(eachUser).indexOf(user) > -1) {
          setUserWithInfo(eachUser);
          userFound = true;
        }
        if (userFound) {
          console.log("the user exsit", userWithInfo);
          setDisplayCreate(false);
        } else {
          console.log("want to create ?");
          setDisplayCreate(true);
        }
      });
    }
    getUser();
  }

  function handleCreate(event) {
    event.preventDefault();
    console.log("creating the user", user, password);
    axios
      .post(apiURL, { userName: user, password: password, favorites: [] })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h2>Search or Creatin User</h2>
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
      {userWithInfo && <SearchPlace user={userWithInfo} />}
      {displayCreate && (
        <form onSubmit={() => handleCreate(event)}>
          <h3>User not found do you want to create it ?</h3>
          <Input placeholder="user Name" value={user}></Input>
          <Input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button type="submit" variant="outlined">
            Create
          </Button>
        </form>
      )}
    </div>
  );
}

export default User;
