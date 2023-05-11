//import { useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UnderContruction from "./pages/UnderContruction";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<UnderContruction />} />
      </Routes>
    </>
  );
}

export default App;
