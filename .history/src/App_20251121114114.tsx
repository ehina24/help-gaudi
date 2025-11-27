import {Route, Routes } from "react-router-dom"
import TOP from "./top/top";
import Popup from "./components/PopUp";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<TOP />}/>
        <Route path="/popup" element={<Popup />}/>
      </Routes>
    </>
  )
}

export default App
