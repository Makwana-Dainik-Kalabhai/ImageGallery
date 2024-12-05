import { React, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

function App() {
  let [load, setLoad] = useState(10);

  const changeLoad = (val) => {
    setLoad(val);
  }

  return (
    <>
      <Navbar key="Navbar" load={load} />
      <Hero key="Hero" changeLoad={changeLoad} />
    </>
  );
}

export default App;
