import './App.css'
import MainUi from './dotTop/mainUi'
import {Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainUi />}/>
      </Routes>
    </>
  )
}

export default App
