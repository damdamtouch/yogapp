//import React from "react";
import { useState } from "react";
import SearchPlace from "./SearchPlace";
import { Input, Button } from "@mui/material";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const apiURL = "https://ironrest.fly.dev/api/yogapp/";

function User() {
  const [user, setUser] = useState("");
  const [userWithInfo, setUserWithInfo] = useState(null);
  const [displayCreate, setDisplayCreate] = useState(false);
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  let userFound;
  //let connected = false;
  // const [userList, setUserList] = useState([]);

  function handleSubmit(event) {
    userFound = false;
    event.preventDefault();
    // console.log("send", user);
    async function getUser() {
      const userList = await axios.get(apiURL);
      // console.log(userList.data);
      if (!userList.data.length) {
        console.log("kikou");
        setDisplayCreate(true);
      }
      userList.data.forEach((eachUser) => {
        //  console.log("print user", eachUser);
        // console.log(Object.values(eachUser).indexOf(user));
        if (Object.values(eachUser).indexOf(user) > -1) {
          setUserWithInfo(eachUser);
          userFound = true;
          setConnected(true);
        }
        if (userFound) {
          console.log("the user exsit", userWithInfo);
          setDisplayCreate(false);
        } else {
          console.log("want to create ?");
          //console.log(userList);
          setDisplayCreate(true);
        }
      });
    }
    getUser();
  }

  function handleCreate(event) {
    event.preventDefault();

    if (user && password) {
      userFound = false;
      axios.get(apiURL).then((userList) => {
        console.log("hello la response", userList);
        userList.data.forEach((eachUser) => {
          //console.log("print user", eachUser);
          //console.log(Object.values(eachUser).indexOf(user));
          if (Object.values(eachUser).indexOf(user) > -1) {
            console.log("already exist");
            userFound = true;
          }
        });

        if (!userFound) {
          console.log("creating the user", user, password);

          axios
            .post(apiURL, { userName: user, password: password, favorites: [] })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => console.log(error));
        } else {
          alert("user already exist");
        }
      });
    } else {
      alert("un element est vide");
    }
  }

  return (
    <div>
      <Link to="/">
        <h2>
          {" "}
          <HomeIcon></HomeIcon>
        </h2>
      </Link>
      {!displayCreate && !connected && (
        <div id="connection">
          <form onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <p> Username</p>
            <Input
              placeholder="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></Input>
            <p>Password</p>
            <Input placeholder="Password" type="password"></Input>
            <br></br>
            <Button type="submit" variant="outlined">
              Login
            </Button>
            <br></br>
            <Button id="signUpLine" onClick={() => setDisplayCreate(true)}>
              {" "}
              Or sign Up
            </Button>
          </form>
        </div>
      )}
      {userWithInfo && !displayCreate && (
        <SearchPlace user={userWithInfo} setUserWithInfo={setUserWithInfo} />
      )}
      {displayCreate && (
        <form onSubmit={() => handleCreate(event)}>
          <h3>User not found do you want to create it ?</h3>
          <Input
            placeholder="user Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          ></Input>
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button type="submit" variant="outlined">
            Create
          </Button>
          <Button onClick={() => setDisplayCreate(false)} variant="outlined">
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}

export default User;
