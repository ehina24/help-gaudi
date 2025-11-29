import './App.css'
import {Route, Routes } from "react-router-dom"
import MainUi from './dotTop/mainUi'
import SignUp from './signUp'
import SignIn from './signIn'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainUi />}/>
        <Route path='/signUp' element={<SignUp />}/>
        <Route path='/signIn' element={<SignIn />}/>
      </Routes>
    </>
  )
}

export default App
