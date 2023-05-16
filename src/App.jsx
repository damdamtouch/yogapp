//import { useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UnderContruction from "./pages/UnderContruction";
import SearchPlace from "./components/SearchPlace";
import User from "./components/User";
import Popular from "./components/Popular";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<SearchPlace />} />
        <Route path="user" element={<User />} />
        <Route path="popular" element={<Popular />} />
        <Route path="*" element={<UnderContruction />} />
      </Routes>
    </>
  );
}

export default App;
